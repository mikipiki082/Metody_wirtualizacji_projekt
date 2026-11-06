"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Fog } from "@/components/fog";
import { VehiclePicker } from "@/components/vehicle-picker";
import { VehicleStage } from "@/components/vehicle-stage";
import { formatPrice, imageSrc } from "@/lib/api";
import { preloadImage } from "@/lib/preload";
import { vehicleHref } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

type Props = {
  vehicles: Vehicle[];
};

export function Hero({ vehicles }: Props) {
  const fleet = [
    ...vehicles.filter((vehicle) => vehicle.type === "car"),
    ...vehicles.filter((vehicle) => vehicle.type === "bike"),
  ];
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || paused || fleet.length < 2) {
      return;
    }
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % fleet.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay, paused, fleet.length]);

  const current = fleet[index];
  const next = fleet[(index + 1) % fleet.length];
  const nextSrc = next
    ? imageSrc(next.colors[0]?.imageUrl ?? next.imageUrl)
    : null;

  useEffect(() => {
    preloadImage(nextSrc);
  }, [nextSrc]);

  const minPrice = Math.min(...vehicles.map((vehicle) => vehicle.pricePerDay));

  function select(position: number) {
    setIndex(position);
    setAutoplay(false);
  }

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-[url(/hero-mgla.webp)] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-background to-transparent" />
      <Fog className="-z-10" />

      <div className="grid items-center gap-10 px-4 pt-14 pb-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:pt-20 2xl:px-20">
        <div className="@container flex flex-col gap-7">
          <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
            Wynajem sportowych aut i rowerów
          </p>
          <h1 className="font-display text-[length:min(14.5cqi,6rem)] leading-[0.95] uppercase">
            Daj się{" "}
            <span className="mt-[0.2em] block text-redline">ponieść.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-steel sm:text-lg">
            Wynajmij sportowe auto lub rower klasy premium na dobę, weekend albo
            dłużej. Ubezpieczenie i assistance masz w cenie.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/samochody"
              className="chamfer flex items-center gap-3 bg-redline px-7 py-4 font-sans text-base font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright"
            >
              Zobacz samochody
              <ArrowRight className="size-5" />
            </Link>
            <div>
              <p className="font-display text-3xl">
                od {formatPrice(minPrice)} zł
              </p>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
                za dobę
              </p>
            </div>
          </div>
        </div>

        {current && (
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <VehicleStage
              key={current.id}
              type={current.type}
              imageUrl={current.colors[0]?.imageUrl ?? current.imageUrl}
              geometry={current.colors[0]?.geometry ?? null}
              alt={`${current.brand} ${current.model}`}
            />

            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
                  {current.brand}
                </p>
                <p className="font-display text-3xl uppercase sm:text-4xl">
                  {current.model}
                </p>
                <p className="text-sm text-steel">
                  od {formatPrice(current.pricePerDay)} zł za dobę
                </p>
              </div>
              <Link
                href={vehicleHref(current)}
                className="flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.18em] uppercase transition-colors hover:text-redline"
              >
                Szczegóły
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <VehiclePicker vehicles={fleet} selected={index} onSelect={select} />
    </section>
  );
}
