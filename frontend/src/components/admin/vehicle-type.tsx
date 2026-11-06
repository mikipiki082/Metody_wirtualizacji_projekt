import { Bike, CarFront, type LucideIcon } from "lucide-react";
import type { VehicleType } from "@/types/vehicle";

export const vehicleTypes: VehicleType[] = ["car", "bike"];

export const typeLabels: Record<VehicleType, string> = {
  car: "Samochód",
  bike: "Rower",
};

export const typeIcons: Record<VehicleType, LucideIcon> = {
  car: CarFront,
  bike: Bike,
};
