import { CarFront } from "lucide-react";
import { EmptyState } from "@/components/admin/status";
import { rowGrid, VehicleRow } from "@/components/admin/vehicle-row";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

type Props = {
  token: string;
  vehicles: Vehicle[];
  highlightId: number | null;
  onEdit: (vehicle: Vehicle) => void;
  onChange: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
  onUnauthorized: () => void;
};

export function VehicleList({
  token,
  vehicles,
  highlightId,
  onEdit,
  onChange,
  onDelete,
  onUnauthorized,
}: Props) {
  if (vehicles.length === 0) {
    return (
      <EmptyState
        icon={CarFront}
        title="Flota jest pusta"
        text="Dodaj pierwszy pojazd, a pojawi się tutaj i na stronie wypożyczalni."
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FleetSummary vehicles={vehicles} />

      <div>
        <div
          className={cn(
            "hidden gap-5 border-x border-transparent px-4 pb-3 font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase xl:grid",
            rowGrid,
          )}
        >
          <span className="col-span-2">Pojazd</span>
          <span>Typ</span>
          <span>Cena za dobę</span>
          <span>Dostępność</span>
          <span className="text-right">Akcje</span>
        </div>

        <ul className="flex flex-col gap-3">
          {vehicles.map((vehicle) => (
            <VehicleRow
              key={vehicle.id}
              token={token}
              vehicle={vehicle}
              highlighted={vehicle.id === highlightId}
              onEdit={onEdit}
              onChange={onChange}
              onDelete={onDelete}
              onUnauthorized={onUnauthorized}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function FleetSummary({ vehicles }: { vehicles: Vehicle[] }) {
  const stats = [
    { label: "Wszystkie", value: vehicles.length },
    {
      label: "Samochody",
      value: vehicles.filter((vehicle) => vehicle.type === "car").length,
    },
    {
      label: "Rowery",
      value: vehicles.filter((vehicle) => vehicle.type === "bike").length,
    },
    {
      label: "Dostępne",
      value: vehicles.filter((vehicle) => vehicle.available).length,
    },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse gap-1 bg-card px-5 py-4"
        >
          <dt className="font-sans text-[0.625rem] font-semibold tracking-[0.2em] text-steel uppercase sm:text-xs">
            {stat.label}
          </dt>
          <dd className="font-display text-4xl">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
