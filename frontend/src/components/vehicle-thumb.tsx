"use client";

import { useState } from "react";
import { imageSrc } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

type Props = {
  vehicle: Vehicle;
  className?: string;
};

export function VehicleThumb({ vehicle, className }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = imageSrc(vehicle.colors[0]?.imageUrl ?? vehicle.imageUrl);

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt=""
      onLoad={() => setLoaded(true)}
      className={cn(
        "max-h-full max-w-full object-contain transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
