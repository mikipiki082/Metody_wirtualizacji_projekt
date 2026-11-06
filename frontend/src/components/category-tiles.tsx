import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { VehicleStage } from "@/components/vehicle-stage";
import { formatPrice } from "@/lib/api";
import { plural, vehiclePages } from "@/lib/vehicles";
import type { Vehicle, VehicleType } from "@/types/vehicle";

const descriptions: Record<VehicleType, string> = {
  car: "Supersamochody, sportowe coupé i legendy JDM po tuningu.",
  bike: "Szosa, enduro i elektryczny rower górski z najwyższej półki.",
};

function countLabel(type: VehicleType, count: number) {
  return type === "car"
    ? `${count} ${plural(count, "samochód", "samochody", "samochodów")}`
    : `${count} ${plural(count, "rower", "rowery", "rowerów")}`;
}

export function CategoryTiles({ vehicles }: { vehicles: Vehicle[] }) {
  const types: VehicleType[] = ["car", "bike"];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {types.map((type) => {
        const items = vehicles.filter((vehicle) => vehicle.type === type);
        const cover = items[0];
        const minPrice = Math.min(
          ...items.map((vehicle) => vehicle.pricePerDay),
        );

        return (
          <Link
            key={type}
            href={vehiclePages[type].href}
            className="group relative isolate flex flex-col gap-6 overflow-hidden border border-border bg-card p-6 transition-colors hover:border-redline/60 sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
                  {countLabel(type, items.length)}
                </p>
                <h3 className="font-display text-[1.75rem] font-extrabold uppercase sm:text-5xl">
                  {vehiclePages[type].title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-steel">
                  {descriptions[type]}
                </p>
              </div>
              <ArrowRight className="size-7 flex-none text-redline transition-transform group-hover:translate-x-1" />
            </div>
            {cover && (
              <VehicleStage
                type={cover.type}
                imageUrl={cover.colors[0]?.imageUrl ?? cover.imageUrl}
                geometry={cover.colors[0]?.geometry ?? null}
                alt={`${cover.brand} ${cover.model}`}
                scene
                className="mt-auto"
              />
            )}
            <p className="font-sans text-sm font-semibold tracking-[0.18em] uppercase">
              od {formatPrice(minPrice)} zł za dobę
            </p>
          </Link>
        );
      })}
    </div>
  );
}
