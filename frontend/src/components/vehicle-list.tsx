"use client";

import { useEffect, useState } from "react";
import { Bike, Car, LoaderCircle, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getVehicles, type Vehicle } from "@/lib/api";

const TYPE_LABEL: Record<Vehicle["type"], string> = {
  bike: "Rower",
  car: "Samochód",
};

export function VehicleList() {
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return (
      <p className="flex items-center gap-2 text-destructive">
        <TriangleAlert className="size-4" />
        Nie udało się pobrać pojazdów: {error}
      </p>
    );
  }

  if (!vehicles) {
    return (
      <p className="flex items-center gap-2 text-muted-foreground">
        <LoaderCircle className="size-4 animate-spin" />
        Wczytywanie pojazdów...
      </p>
    );
  }

  if (vehicles.length === 0) {
    return <p className="text-muted-foreground">Brak pojazdów w bazie.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vehicles.map((vehicle) => {
        const Icon = vehicle.type === "bike" ? Bike : Car;
        return (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-5" />
                <CardDescription>{TYPE_LABEL[vehicle.type]}</CardDescription>
              </div>
              <CardTitle>{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                {vehicle.pricePerDay} zł / dzień
              </span>
              {vehicle.available ? (
                <Badge>Dostępny</Badge>
              ) : (
                <Badge variant="outline">Wypożyczony</Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
