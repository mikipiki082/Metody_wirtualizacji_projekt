import { Router } from "express";
import { pool } from "../db.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT version()");
    res.json({
      status: "ok",
      database: { connected: true, version: result.rows[0].version },
    });
  } catch (err) {
    console.error(err);
    res.status(503).json({ status: "error", database: { connected: false } });
  }
});
