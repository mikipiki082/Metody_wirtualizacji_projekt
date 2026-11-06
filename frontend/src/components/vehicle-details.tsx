"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";
import { ColorSwatches } from "@/components/color-swatches";
import { DateRangeField } from "@/components/date-range-field";
import { Fog } from "@/components/fog";
import { Field } from "@/components/form-field";
import { RatingBars } from "@/components/rating-bars";
import { RentalCost } from "@/components/rental-cost";
import { VehicleStage } from "@/components/vehicle-stage";
import { VehicleThumb } from "@/components/vehicle-thumb";
import { formatPrice, getVehicle, getVehicles } from "@/lib/api";
import { highlightSpecs, vehicleHref, vehiclePages } from "@/lib/vehicles";
import type { Spec, Vehicle, VehicleType } from "@/types/vehicle";

type Props = {
  id: number;
  type: VehicleType;
};

const others: Record<VehicleType, string> = {
  car: "Inne samochody",
  bike: "Inne rowery",
};

export function VehicleDetails({ id, type }: Props) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similar, setSimilar] = useState<Vehicle[]>([]);
  const [color, setColor] = useState(0);
  const [dates, setDates] = useState({ from: "", to: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicle(id)
      .then((data) => {
        if (data.type === type) {
          setVehicle(data);
        } else {
          setError("Nie ma takiego pojazdu");
        }
      })
      .catch((err: Error) => setError(err.message));
    getVehicles(type)
      .then((list) => setSimilar(list.filter((item) => item.id !== id)))
      .catch(() => setSimilar([]));
  }, [id, type]);

  if (error) {
    return (
      <p className="flex flex-1 items-center justify-center gap-2 p-10 text-redline-bright">
        <TriangleAlert className="size-5" />
        {error}
      </p>
    );
  }

  if (!vehicle) {
    return (
      <p className="flex flex-1 items-center justify-center gap-2 p-10 text-steel">
        <LoaderCircle className="size-5 animate-spin" />
        Wczytywanie...
      </p>
    );
  }

  const list = vehiclePages[type];
  const highlights = highlightSpecs(vehicle);
  const booking = new URLSearchParams({ pojazd: String(vehicle.id) });
  if (dates.from) {
    booking.set("od", dates.from);
  }
  if (dates.to) {
    booking.set("do", dates.to);
  }

  return (
    <>
      <section className="relative isolate overflow-clip px-4 py-10 sm:px-8 lg:px-12 lg:py-14 2xl:px-20">
        <div className="absolute inset-0 -z-10 bg-[url(/hero-mgla.webp)] bg-cover bg-top opacity-25 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)]" />
        <Fog className="-z-10" />

        <Link
          href={list.href}
          className="flex w-fit items-center gap-2 font-sans text-sm font-semibold tracking-[0.18em] uppercase transition-colors hover:text-redline"
        >
          <ArrowLeft className="size-4" />
          {list.title}
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_minmax(20rem,26rem)] xl:gap-16">
          <div className="@container flex min-w-0 flex-col gap-8">
            <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
              <div>
                <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
                  {vehicle.brand}
                </p>
                <h1 className="font-display text-[length:clamp(1.875rem,8cqi,4.5rem)] leading-none uppercase">
                  {vehicle.model}
                </h1>
                <p className="mt-3 text-steel">
                  {vehicle.category} · {vehicle.year}
                </p>
              </div>
              {highlights.length > 0 && (
                <dl className="flex flex-wrap gap-x-10 gap-y-4">
                  {highlights.map((spec) => (
                    <div key={spec.label} className="flex flex-col-reverse">
                      <dt className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                        {spec.label}
                      </dt>
                      <dd className="font-display text-3xl uppercase">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <VehicleStage
              type={vehicle.type}
              imageUrl={vehicle.colors[color]?.imageUrl ?? vehicle.imageUrl}
              geometry={vehicle.colors[color]?.geometry ?? null}
              alt={`${vehicle.brand} ${vehicle.model}`}
              scene
            />

            <div className="-mt-4 flex justify-center">
              <ColorSwatches
                colors={vehicle.colors}
                selected={color}
                onSelect={setColor}
              />
            </div>

            <div className="grid gap-10 border-t border-border pt-10 @2xl:grid-cols-2">
              <div>
                <h2 className="mb-5 font-display text-2xl uppercase">
                  Specyfikacja
                </h2>
                <SpecTable specs={vehicle.specs} />
              </div>
              <div>
                <h2 className="mb-5 font-display text-2xl uppercase">
                  Charakter
                </h2>
                <RatingBars ratings={vehicle.ratings} />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-6 border border-border bg-card/85 p-6 backdrop-blur-sm sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-display text-5xl text-redline">
                    {formatPrice(vehicle.pricePerDay)} zł
                  </p>
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                    za dobę
                  </p>
                </div>
                <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
                  {vehicle.available
                    ? "● Dostępny od ręki"
                    : "○ Obecnie wypożyczony"}
                </p>
              </div>
              <p className="leading-relaxed text-steel">
                {vehicle.description}
              </p>
              <Field id="termin" label="Termin">
                <DateRangeField
                  id="termin"
                  from={dates.from}
                  to={dates.to}
                  onChange={(from, to) => setDates({ from, to })}
                />
              </Field>
              <div className="flex flex-col gap-2">
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                  Szacunkowy koszt
                </p>
                <RentalCost
                  price={vehicle.pricePerDay}
                  from={dates.from}
                  to={dates.to}
                />
              </div>
              <Link
                href={`/kontakt?${booking}`}
                className="chamfer-sm flex items-center justify-center gap-2 bg-redline px-5 py-4 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright"
              >
                Zarezerwuj
                <ArrowRight className="size-4" />
              </Link>
              <p className="text-sm text-steel">
                Potwierdzimy dostępność i prześlemy umowę do podpisu online.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="px-4 pt-6 pb-16 sm:px-8 lg:px-12 2xl:px-20">
          <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
            Zobacz też
          </p>
          <h2 className="font-display text-3xl uppercase sm:text-4xl">
            {others[type]}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {similar.map((item) => (
              <SimilarVehicle key={item.id} vehicle={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {specs.map((spec) => (
        <div key={spec.label} className="flex justify-between gap-6 py-3">
          <dt className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
            {spec.label}
          </dt>
          <dd className="text-right font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function SimilarVehicle({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link
      href={vehicleHref(vehicle)}
      className="group flex flex-col gap-4 border border-border bg-card p-5 transition-colors hover:border-redline/60"
    >
      <span className="flex h-28 items-end justify-center">
        <VehicleThumb
          vehicle={vehicle}
          className="transition-[opacity,scale] duration-300 group-hover:scale-105"
        />
      </span>
      <span>
        <span className="block font-sans text-[0.625rem] font-bold tracking-[0.18em] text-redline uppercase">
          {vehicle.brand}
        </span>
        <span className="block truncate font-semibold">{vehicle.model}</span>
        <span className="text-sm text-steel">
          od {formatPrice(vehicle.pricePerDay)} zł za dobę
        </span>
      </span>
    </Link>
  );
}
