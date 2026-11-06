import type { Vehicle, VehicleType } from "@/types/vehicle";

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error ?? `Błąd ${res.status}`);
  }
  return data;
}

export function getVehicles(type?: VehicleType) {
  return getJson<Vehicle[]>(type ? `/vehicles?type=${type}` : "/vehicles");
}

export const getVehicle = (id: number) => getJson<Vehicle>(`/vehicles/${id}`);

export function imageSrc(url: string | null) {
  return url ? `/api${url}` : null;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pl-PL").format(value);
}

export type InquiryForm = {
  name: string;
  email: string;
  phone: string;
  vehicleId: string;
  dateFrom: string;
  dateTo: string;
  message: string;
};

export class FormError extends Error {
  constructor(
    message: string,
    public fields: Record<string, string>,
  ) {
    super(message);
  }
}

export async function sendInquiry(form: InquiryForm) {
  const res = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new FormError(data.error ?? `Błąd ${res.status}`, data.fields ?? {});
  }
  return data as { id: number };
}
