import { Router } from "express";
import { pool } from "../db.js";

export const vehiclesRouter = Router();

vehiclesRouter.get("/", async (_req, res) => {
  const result = await pool.query(
    `SELECT id, type, name, price_per_day AS "pricePerDay", available
     FROM vehicles
     ORDER BY id`,
  );
  res.json(result.rows);
});
