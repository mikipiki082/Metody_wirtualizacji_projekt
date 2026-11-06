import { timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { config } from "./config.js";

const expected = Buffer.from(`Bearer ${config.adminToken}`);

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const given = Buffer.from(req.get("Authorization") ?? "");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    res.status(401).json({ error: "Brak dostępu" });
    return;
  }
  next();
}
