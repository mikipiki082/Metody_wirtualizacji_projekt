import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { pool } from "../db.js";
import type { InquiryInput } from "../types/inquiry.js";

export const inquiriesRouter = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{6,19}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optional(value: unknown) {
  return text(value) || null;
}

function validate(body: Record<string, unknown>) {
  const input: InquiryInput = {
    name: text(body.name),
    email: text(body.email),
    phone: optional(body.phone),
    vehicleId: body.vehicleId ? Number(body.vehicleId) : null,
    dateFrom: optional(body.dateFrom),
    dateTo: optional(body.dateTo),
    message: text(body.message),
  };
  const errors: Record<string, string> = {};

  if (input.name.length < 2 || input.name.length > 100) {
    errors.name = "Podaj imię i nazwisko";
  }
  if (!emailPattern.test(input.email) || input.email.length > 200) {
    errors.email = "Podaj poprawny adres e-mail";
  }
  if (input.phone && !phonePattern.test(input.phone)) {
    errors.phone = "Podaj poprawny numer telefonu";
  }
  if (input.vehicleId !== null && !Number.isInteger(input.vehicleId)) {
    errors.vehicleId = "Nieprawidłowy pojazd";
  }
  if (input.dateFrom && !datePattern.test(input.dateFrom)) {
    errors.dateFrom = "Nieprawidłowa data";
  }
  if (input.dateTo && !datePattern.test(input.dateTo)) {
    errors.dateTo = "Nieprawidłowa data";
  }
  if (input.dateFrom && input.dateTo && input.dateTo < input.dateFrom) {
    errors.dateTo = "Data zwrotu nie może być wcześniejsza niż odbioru";
  }
  if (input.message.length < 10 || input.message.length > 2000) {
    errors.message = "Wiadomość musi mieć od 10 do 2000 znaków";
  }

  return { input, errors };
}

inquiriesRouter.get("/", requireAdmin, async (_req, res) => {
  const result = await pool.query(
    `SELECT
       i.id, i.name, i.email, i.phone,
       to_char(i.date_from, 'YYYY-MM-DD') AS "dateFrom",
       to_char(i.date_to, 'YYYY-MM-DD') AS "dateTo",
       i.message, i.created_at AS "createdAt",
       CASE WHEN v.id IS NULL THEN NULL
            ELSE json_build_object('id', v.id, 'brand', v.brand, 'model', v.model)
       END AS vehicle
     FROM inquiries i
     LEFT JOIN vehicles v ON v.id = i.vehicle_id
     ORDER BY i.created_at DESC`,
  );
  res.json(result.rows);
});

inquiriesRouter.post("/", async (req, res) => {
  const { input, errors } = validate(req.body ?? {});
  if (Object.keys(errors).length > 0) {
    res.status(400).json({ error: "Popraw zaznaczone pola", fields: errors });
    return;
  }

  if (input.vehicleId !== null) {
    const vehicle = await pool.query("SELECT 1 FROM vehicles WHERE id = $1", [
      input.vehicleId,
    ]);
    if (vehicle.rowCount === 0) {
      res.status(400).json({
        error: "Popraw zaznaczone pola",
        fields: { vehicleId: "Nie ma takiego pojazdu" },
      });
      return;
    }
  }

  const result = await pool.query<{ id: number }>(
    `INSERT INTO inquiries (vehicle_id, name, email, phone, date_from, date_to, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      input.vehicleId,
      input.name,
      input.email,
      input.phone,
      input.dateFrom,
      input.dateTo,
      input.message,
    ],
  );
  res.status(201).json({ id: result.rows[0].id });
});
