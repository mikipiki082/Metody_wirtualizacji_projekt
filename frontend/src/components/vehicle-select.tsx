"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { fieldClass } from "@/components/form-field";
import { VehicleThumb } from "@/components/vehicle-thumb";
import { formatPrice } from "@/lib/api";
import { cn } from "@/lib/utils";
import { vehiclePages } from "@/lib/vehicles";
import type { Vehicle, VehicleType } from "@/types/vehicle";

type Props = {
  id: string;
  vehicles: Vehicle[];
  value: string;
  onChange: (value: string) => void;
};

const types: VehicleType[] = ["car", "bike"];

const itemClass =
  "flex cursor-default items-center gap-3 border-l-2 border-transparent py-2 pr-4 pl-3.5 outline-none select-none data-highlighted:bg-white/5 data-selected:border-redline";

export function VehicleSelect({ id, vehicles, value, onChange }: Props) {
  const byId = new Map(
    vehicles.map((vehicle) => [String(vehicle.id), vehicle]),
  );

  return (
    <Select.Root value={value} onValueChange={(next) => onChange(next ?? "")}>
      <Select.Trigger
        id={id}
        className={cn(fieldClass, "flex h-14 items-center gap-3 text-left")}
      >
        <Select.Value>
          {(current: string) => {
            const vehicle = byId.get(current);
            return vehicle ? (
              <VehicleOption vehicle={vehicle}>{vehicle.model}</VehicleOption>
            ) : (
              <span className="text-steel">Jeszcze nie wiem</span>
            );
          }}
        </Select.Value>
        <Select.Icon className="ml-auto text-steel">
          <ChevronDown className="size-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          sideOffset={6}
          alignItemWithTrigger={false}
          className="z-50 outline-none"
        >
          <Select.Popup className="w-(--anchor-width) origin-(--transform-origin) border border-border bg-card shadow-2xl shadow-black/60 outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0">
            <Select.List className="max-h-[min(26rem,var(--available-height))] overflow-y-auto py-2 [scrollbar-color:var(--color-border)_transparent] [scrollbar-width:thin]">
              <Select.Item value="" className={itemClass}>
                <Select.ItemText className="py-1.5 text-steel">
                  Jeszcze nie wiem
                </Select.ItemText>
              </Select.Item>
              {types.map((type) => (
                <Select.Group key={type}>
                  <Select.GroupLabel className="px-4 pt-4 pb-2 font-sans text-[0.625rem] font-bold tracking-[0.2em] text-steel uppercase">
                    {vehiclePages[type].title}
                  </Select.GroupLabel>
                  {vehicles
                    .filter((vehicle) => vehicle.type === type)
                    .map((vehicle) => (
                      <Select.Item
                        key={vehicle.id}
                        value={String(vehicle.id)}
                        className={itemClass}
                      >
                        <VehicleOption vehicle={vehicle}>
                          <Select.ItemText>{vehicle.model}</Select.ItemText>
                        </VehicleOption>
                        <span className="ml-auto text-sm whitespace-nowrap text-steel">
                          {formatPrice(vehicle.pricePerDay)} zł
                        </span>
                        <Select.ItemIndicator className="text-redline">
                          <Check className="size-4" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                </Select.Group>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

type OptionProps = {
  vehicle: Vehicle;
  children: React.ReactNode;
};

function VehicleOption({ vehicle, children }: OptionProps) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="flex h-9 w-16 flex-none items-end justify-center">
        <VehicleThumb vehicle={vehicle} />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-[0.625rem] font-bold tracking-[0.18em] text-redline uppercase">
          {vehicle.brand}
        </span>
        <span className="block truncate text-sm">{children}</span>
      </span>
    </span>
  );
}
