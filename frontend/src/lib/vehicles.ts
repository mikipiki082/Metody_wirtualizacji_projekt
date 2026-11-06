import type { Vehicle, VehicleType } from "@/types/vehicle";

export const vehiclePages: Record<
  VehicleType,
  { href: string; title: string }
> = {
  car: { href: "/samochody", title: "Samochody" },
  bike: { href: "/rowery", title: "Rowery" },
};

export function vehicleHref(vehicle: Vehicle) {
  return `${vehiclePages[vehicle.type].href}/${vehicle.id}`;
}

export function plural(count: number, one: string, few: string, many: string) {
  if (count === 1) {
    return one;
  }
  const lastDigit = count % 10;
  const lastTwo = count % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    return few;
  }
  return many;
}

const highlightLabels: Record<VehicleType, string[]> = {
  car: ["Moc", "0-100 km/h", "Prędkość maks."],
  bike: ["Waga", "Skok", "Koła"],
};

export function highlightSpecs(vehicle: Vehicle) {
  return highlightLabels[vehicle.type]
    .map((label) => vehicle.specs.find((spec) => spec.label === label))
    .filter((spec) => spec !== undefined);
}
