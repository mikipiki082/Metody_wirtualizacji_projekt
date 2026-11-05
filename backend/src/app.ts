import express, { NextFunction, Request, Response } from "express";
import { healthRouter } from "./routes/health.js";
import { vehiclesRouter } from "./routes/vehicles.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/vehicles", vehiclesRouter);

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Nie znaleziono" });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  });

  return app;
}
