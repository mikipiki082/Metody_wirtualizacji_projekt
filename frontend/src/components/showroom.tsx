"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle, TriangleAlert } from "lucide-react";
import { CategoryTiles } from "@/components/category-tiles";
import { Hero } from "@/components/hero";
import { RentalSteps } from "@/components/rental-steps";
import { getVehicles } from "@/lib/api";
import type { Vehicle } from "@/types/vehicle";

export function Showroom() {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <p className="flex flex-1 items-center justify-center gap-2 p-10 text-redline-bright">
        <TriangleAlert className="size-5" />
        Nie udało się pobrać pojazdów: {error}
      </p>
    );
  }

  if (!vehicles) {
    return (
      <p className="flex flex-1 items-center justify-center gap-2 p-10 text-steel">
        <LoaderCircle className="size-5 animate-spin" />
        Wczytywanie...
      </p>
    );
  }

  return (
    <>
      <Hero vehicles={vehicles} />

      <section className="flex flex-col gap-8 px-4 py-16 sm:px-8 lg:px-12 lg:py-24 2xl:px-20">
        <div>
          <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
            Nasze pojazdy
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
            Cztery koła czy dwa?
          </h2>
        </div>
        <CategoryTiles vehicles={vehicles} />
      </section>

      <section className="flex flex-col gap-8 px-4 pb-16 sm:px-8 lg:px-12 lg:pb-24 2xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
              Bez zbędnych formalności
            </p>
            <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
              Jak to działa
            </h2>
          </div>
          <Link
            href="/jak-wynajac"
            className="flex items-center gap-2 font-sans text-sm font-semibold tracking-[0.18em] uppercase transition-colors hover:text-redline"
          >
            Warunki najmu
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <RentalSteps />
      </section>
    </>
  );
}
