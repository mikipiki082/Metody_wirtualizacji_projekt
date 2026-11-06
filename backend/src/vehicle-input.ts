import type { VehicleInput } from "./types/vehicle.js";

type Field = keyof VehicleInput;

const columns: Record<Field, string> = {
  type: "type",
  brand: "brand",
  model: "model",
  category: "category",
  year: "year",
  description: "description",
  pricePerDay: "price_per_day",
  available: "available",
};

const textLimits = { brand: 60, model: 80, category: 60 } as const;
const maxYear = new Date().getFullYear() + 1;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function integer(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) ? value : NaN;
}

export function validateVehicle(
  body: Record<string, unknown>,
  partial = false,
) {
  const input: Partial<VehicleInput> = {};
  const errors: Record<string, string> = {};
  const given = (field: Field) => !partial || body[field] !== undefined;

  if (given("type")) {
    if (body.type === "car" || body.type === "bike") {
      input.type = body.type;
    } else {
      errors.type = "Typ musi mieć wartość car albo bike";
    }
  }

  for (const field of ["brand", "model", "category"] as const) {
    if (!given(field)) {
      continue;
    }
    const value = text(body[field]);
    const max = textLimits[field];
    if (value.length === 0 || value.length > max) {
      errors[field] = `Podaj od 1 do ${max} znaków`;
    } else {
      input[field] = value;
    }
  }

  if (given("year")) {
    const year = integer(body.year);
    if (!(year >= 1950 && year <= maxYear)) {
      errors.year = `Rok musi być liczbą od 1950 do ${maxYear}`;
    } else {
      input.year = year;
    }
  }

  if (given("pricePerDay")) {
    const price = integer(body.pricePerDay);
    if (!(price >= 1 && price <= 100000)) {
      errors.pricePerDay = "Cena musi być liczbą całkowitą od 1 do 100000";
    } else {
      input.pricePerDay = price;
    }
  }

  if (body.description !== undefined) {
    const description = text(body.description);
    if (description.length > 1000) {
      errors.description = "Opis może mieć najwyżej 1000 znaków";
    } else {
      input.description = description;
    }
  }

  if (body.available !== undefined) {
    if (typeof body.available === "boolean") {
      input.available = body.available;
    } else {
      errors.available = "Pole available musi mieć wartość true albo false";
    }
  }

  return { input, errors };
}

export function toColumns(input: Partial<VehicleInput>) {
  const fields = Object.keys(input) as Field[];
  return {
    names: fields.map((field) => columns[field]),
    values: fields.map((field) => input[field]),
  };
}
