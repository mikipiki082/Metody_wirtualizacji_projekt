import { FormError } from "@/lib/api";
import type { Vehicle, VehicleType } from "@/types/vehicle";

export type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  message: string;
  createdAt: string;
  vehicle: { id: number; brand: string; model: string } | null;
};

export type VehicleInput = {
  type: VehicleType;
  brand: string;
  model: string;
  category: string;
  year: number;
  pricePerDay: number;
  description: string;
  available: boolean;
};

export class UnauthorizedError extends Error {}

const tokenKey = "redline-admin";
const listeners = new Set<() => void>();

export function subscribeToken(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getToken() {
  return sessionStorage.getItem(tokenKey);
}

export function saveToken(token: string | null) {
  if (token) {
    sessionStorage.setItem(tokenKey, token);
  } else {
    sessionStorage.removeItem(tokenKey);
  }
  listeners.forEach((listener) => listener());
}

async function adminFetch(token: string, path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`/api${path}`, {
    ...init,
    headers,
    cache: "no-store",
  }).catch(() => {
    throw new Error("Brak połączenia z serwerem");
  });

  if (res.status === 401) {
    throw new UnauthorizedError("Sesja wygasła. Zaloguj się ponownie.");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const message = data.error ?? `Błąd serwera (${res.status})`;
    if (res.status === 400) {
      throw new FormError(message, data.fields ?? {});
    }
    throw new Error(message);
  }
  return res;
}

function json(method: string, body: unknown): RequestInit {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export async function getInquiries(token: string) {
  const res = await adminFetch(token, "/inquiries");
  return (await res.json()) as Inquiry[];
}

export async function createVehicle(token: string, input: VehicleInput) {
  const res = await adminFetch(token, "/vehicles", json("POST", input));
  return (await res.json()) as Vehicle;
}

export async function updateVehicle(
  token: string,
  id: number,
  input: Partial<VehicleInput>,
) {
  const res = await adminFetch(token, `/vehicles/${id}`, json("PATCH", input));
  return (await res.json()) as Vehicle;
}

export async function deleteVehicle(token: string, id: number) {
  await adminFetch(token, `/vehicles/${id}`, { method: "DELETE" });
}

export async function uploadVehicleImage(
  token: string,
  id: number,
  file: File,
) {
  const body = new FormData();
  body.append("image", file);
  const res = await adminFetch(token, `/vehicles/${id}/image`, {
    method: "POST",
    body,
  });
  return (await res.json()) as Vehicle;
}
