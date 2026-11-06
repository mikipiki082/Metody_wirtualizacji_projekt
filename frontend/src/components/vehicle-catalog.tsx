"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, TriangleAlert } from "lucide-react";
import { VehicleCard } from "@/components/vehicle-card";
import { getVehicles } from "@/lib/api";
import type { Vehicle, VehicleType } from "@/types/vehicle";

export function VehicleCatalog({ type }: { type: VehicleType }) {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicles(type)
      .then(setVehicles)
      .catch((err: Error) => setError(err.message));
  }, [type]);

  if (error) {
    return (
      <p className="flex items-center justify-center gap-2 p-10 text-redline-bright">
        <TriangleAlert className="size-5" />
        Nie udało się pobrać pojazdów: {error}
      </p>
    );
  }

  if (!vehicles) {
    return (
      <p className="flex items-center justify-center gap-2 p-10 text-steel">
        <LoaderCircle className="size-5 animate-spin" />
        Wczytywanie...
      </p>
    );
  }

  return (
    <section className="grid gap-6 px-4 py-12 sm:px-8 lg:px-12 lg:py-16 2xl:px-20 min-[1700px]:grid-cols-2">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </section>
  );
}
