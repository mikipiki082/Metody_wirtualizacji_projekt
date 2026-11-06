import express, { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { config } from "./config.js";
import { healthRouter } from "./routes/health.js";
import { inquiriesRouter } from "./routes/inquiries.js";
import { vehiclesRouter } from "./routes/vehicles.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/vehicles", vehiclesRouter);
  app.use("/inquiries", inquiriesRouter);
  app.use("/uploads", express.static(config.uploadsDir, { maxAge: "7d" }));

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Nie znaleziono" });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      res.status(400).json({ error: "Nieprawidłowy JSON" });
      return;
    }
    if (err instanceof MulterError) {
      const tooBig = err.code === "LIMIT_FILE_SIZE";
      res.status(400).json({
        error: tooBig ? "Plik jest za duży (max 5 MB)" : "Nieprawidłowy plik",
      });
      return;
    }
    console.error(err);
    res.status(500).json({ error: "Błąd serwera" });
  });

  return app;
}
