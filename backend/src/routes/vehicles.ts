import { NextFunction, Request, Response, Router } from "express";
import { pool } from "../db.js";
import { publicUrl, upload } from "../upload.js";
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

async function findVehicle(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Nieprawidłowe id" });
    return;
  }

  const result = await pool.query<Vehicle>(
    `${selectVehicles} WHERE v.id = $1`,
    [id],
  );
  if (result.rowCount === 0) {
    res.status(404).json({ error: "Nie ma takiego pojazdu" });
    return;
  }

  res.locals.vehicle = result.rows[0];
  next();
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

vehiclesRouter.post(
  "/:id/image",
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
    const result = await pool.query<Vehicle>(
      `${selectVehicles} WHERE v.id = $1`,
      [id],
    );
    res.json(result.rows[0]);
  },
);
