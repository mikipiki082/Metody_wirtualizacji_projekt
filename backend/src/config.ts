function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Brak zmiennej środowiskowej ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),
  uploadsDir: process.env.UPLOADS_DIR ?? "uploads",
  db: {
    host: required("DB_HOST"),
    port: Number(process.env.DB_PORT ?? 5432),
    database: required("DB_NAME"),
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
  },
};
