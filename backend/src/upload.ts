import { rm } from "node:fs/promises";
import path from "node:path";
import multer from "multer";
import { config } from "./config.js";

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: config.uploadsDir,
    filename: (req, file, cb) => {
      const ext = allowedTypes[file.mimetype];
      cb(null, `vehicle-${req.params.id}-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype in allowedTypes);
  },
});

export function publicUrl(filename: string) {
  return `/uploads/${path.basename(filename)}`;
}

export async function deleteImageFiles(urls: (string | null)[]) {
  const files = new Set(
    urls
      .filter((url) => url !== null)
      .map((url) => path.join(config.uploadsDir, path.basename(url))),
  );
  await Promise.all([...files].map((file) => rm(file, { force: true })));
}
