export type Vehicle = {
  id: number;
  type: "bike" | "car";
  name: string;
  pricePerDay: number;
  available: boolean;
};

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Błąd ${res.status}`);
  }
  return res.json();
}

export const getVehicles = () => getJson<Vehicle[]>("/vehicles");
