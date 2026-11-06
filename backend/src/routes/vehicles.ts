import { NextFunction, Request, Response, Router } from "express";
import { requireAdmin } from "../auth.js";
import { pool } from "../db.js";
import { deleteImageFiles, publicUrl, upload } from "../upload.js";
import { toColumns, validateVehicle } from "../vehicle-input.js";
import type { Vehicle } from "../types/vehicle.js";

export const vehiclesRouter = Router();

const selectVehicles = `
  SELECT
    v.id, v.type, v.brand, v.model, v.category, v.year, v.description,
    v.price_per_day AS "pricePerDay", v.available, v.image_url AS "imageUrl",
    v.specs, v.ratings,
    COALESCE(
      (SELECT json_agg(
                json_build_object('name', c.name, 'hex', c.hex, 'imageUrl', c.image_url, 'geometry', c.geometry)
                ORDER BY c.position)
         FROM vehicle_colors c
        WHERE c.vehicle_id = v.id),
      '[]'
    ) AS colors
  FROM vehicles v
`;

async function getVehicle(id: number) {
  const result = await pool.query<Vehicle>(
    `${selectVehicles} WHERE v.id = $1`,
    [id],
  );
  return result.rows[0];
}

async function findVehicle(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Nieprawidłowe id" });
    return;
  }

  const vehicle = await getVehicle(id);
  if (!vehicle) {
    res.status(404).json({ error: "Nie ma takiego pojazdu" });
    return;
  }

  res.locals.vehicle = vehicle;
  next();
}

function invalid(res: Response, fields: Record<string, string>) {
  res.status(400).json({ error: "Popraw zaznaczone pola", fields });
}

vehiclesRouter.get("/", async (req, res) => {
  const { type } = req.query;
  if (type !== undefined && type !== "car" && type !== "bike") {
    res
      .status(400)
      .json({ error: "Parametr type musi mieć wartość car albo bike" });
    return;
  }

  const result = type
    ? await pool.query<Vehicle>(
        `${selectVehicles} WHERE v.type = $1 ORDER BY v.id`,
        [type],
      )
    : await pool.query<Vehicle>(`${selectVehicles} ORDER BY v.id`);
  res.json(result.rows);
});

vehiclesRouter.get("/:id", findVehicle, (_req, res) => {
  res.json(res.locals.vehicle);
});

vehiclesRouter.post("/", requireAdmin, async (req, res) => {
  const { input, errors } = validateVehicle(req.body ?? {});
  if (Object.keys(errors).length > 0) {
    invalid(res, errors);
    return;
  }

  const { names, values } = toColumns(input);
  const placeholders = names.map((_, i) => `$${i + 1}`).join(", ");
  const result = await pool.query<{ id: number }>(
    `INSERT INTO vehicles (${names.join(", ")}) VALUES (${placeholders}) RETURNING id`,
    values,
  );
  res.status(201).json(await getVehicle(result.rows[0].id));
});

vehiclesRouter.patch("/:id", requireAdmin, findVehicle, async (req, res) => {
  const { input, errors } = validateVehicle(req.body ?? {}, true);
  if (Object.keys(errors).length > 0) {
    invalid(res, errors);
    return;
  }

  const { names, values } = toColumns(input);
  if (names.length === 0) {
    res.status(400).json({ error: "Brak pól do zmiany" });
    return;
  }

  const id = res.locals.vehicle.id;
  const assignments = names.map((name, i) => `${name} = $${i + 1}`).join(", ");
  await pool.query(
    `UPDATE vehicles SET ${assignments} WHERE id = $${names.length + 1}`,
    [...values, id],
  );
  res.json(await getVehicle(id));
});

vehiclesRouter.delete("/:id", requireAdmin, findVehicle, async (_req, res) => {
  const vehicle: Vehicle = res.locals.vehicle;
  await pool.query("DELETE FROM vehicles WHERE id = $1", [vehicle.id]);
  await deleteImageFiles([
    vehicle.imageUrl,
    ...vehicle.colors.map((color) => color.imageUrl),
  ]);
  res.status(204).end();
});

vehiclesRouter.post(
  "/:id/image",
  requireAdmin,
  findVehicle,
  upload.single("image"),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Wyślij zdjęcie JPG, PNG lub WEBP" });
      return;
    }

    const id = res.locals.vehicle.id;
    await pool.query("UPDATE vehicles SET image_url = $1 WHERE id = $2", [
      publicUrl(req.file.filename),
      id,
    ]);
    res.json(await getVehicle(id));
  },
);
