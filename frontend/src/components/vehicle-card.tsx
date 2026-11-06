"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ColorSwatches } from "@/components/color-swatches";
import { RatingBars } from "@/components/rating-bars";
import { SpecList } from "@/components/spec-list";
import { VehicleStage } from "@/components/vehicle-stage";
import { formatPrice } from "@/lib/api";
import { vehicleHref } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [color, setColor] = useState(0);
  const selected = vehicle.colors[color];

  return (
    <div className="@container h-full">
      <article className="group relative isolate grid h-full content-start overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-redline/50 @2xl:grid-cols-2 @6xl:grid-cols-[1fr_1.3fr_0.8fr]">
        <div className="@container order-2 flex flex-col gap-5 p-6 sm:p-8 @6xl:order-1">
          <div>
            <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
              {vehicle.brand}
            </p>
            <h3 className="font-display text-[length:min(8.5cqi,2.25rem)] leading-none uppercase">
              {vehicle.model}
            </h3>
            <p className="mt-2 text-sm text-steel">
              {vehicle.category} · {vehicle.year}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-steel">
            {vehicle.description}
          </p>
          <SpecList specs={vehicle.specs} />
          <ColorSwatches
            colors={vehicle.colors}
            selected={color}
            onSelect={setColor}
          />
        </div>

        <div className="order-1 self-center @2xl:col-span-2 @6xl:order-2 @6xl:col-span-1">
          <VehicleStage
            type={vehicle.type}
            imageUrl={selected?.imageUrl ?? vehicle.imageUrl}
            geometry={selected?.geometry ?? null}
            alt={`${vehicle.brand} ${vehicle.model}`}
            scene
          />
        </div>

        <div className="order-3 flex flex-col gap-6 border-t border-border p-6 sm:p-8 @2xl:border-t-0 @2xl:border-l">
          <div>
            <p className="font-display text-4xl font-extrabold text-redline">
              {formatPrice(vehicle.pricePerDay)} zł
            </p>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
              za dobę
            </p>
          </div>

          <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
            {vehicle.available ? "● Dostępny od ręki" : "○ Obecnie wypożyczony"}
          </p>

          <Link
            href={vehicleHref(vehicle)}
            className="chamfer-sm flex items-center justify-center gap-2 bg-redline px-5 py-3 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright"
          >
            Szczegóły
            <ArrowRight className="size-4" />
          </Link>

          <RatingBars ratings={vehicle.ratings} />
        </div>
      </article>
    </div>
  );
}
