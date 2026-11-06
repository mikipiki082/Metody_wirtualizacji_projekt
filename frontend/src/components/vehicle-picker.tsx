"use client";

import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { VehicleThumb } from "@/components/vehicle-thumb";
import type { Vehicle } from "@/types/vehicle";

type Props = {
  vehicles: Vehicle[];
  selected: number;
  onSelect: (index: number) => void;
};

export function VehiclePicker({ vehicles, selected, onSelect }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!list || !item) {
      return;
    }
    const start = item.offsetLeft;
    const end = start + item.offsetWidth;
    if (start < list.scrollLeft || end > list.scrollLeft + list.clientWidth) {
      list.scrollTo({ left: start - 32, behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div className="border-t border-border/60 bg-background/40 backdrop-blur-sm">
      <div
        ref={listRef}
        className="relative flex overflow-x-auto px-4 [mask-image:linear-gradient(to_right,transparent,#000_1rem,#000_calc(100%-1rem),transparent)] [scrollbar-width:none] sm:px-8 lg:px-12 2xl:px-20"
      >
        {vehicles.map((vehicle, index) => (
          <Fragment key={vehicle.id}>
            {index > 0 && vehicle.type !== vehicles[index - 1].type && (
              <span className="mx-3 my-4 w-px flex-none bg-border" />
            )}
            <PickerItem
              vehicle={vehicle}
              active={index === selected}
              onClick={() => onSelect(index)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

type ItemProps = {
  vehicle: Vehicle;
  active: boolean;
  onClick: () => void;
};

function PickerItem({ vehicle, active, onClick }: ItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex min-w-32 flex-1 flex-col gap-2.5 border-t-2 px-2.5 pt-4 pb-3.5 text-left transition",
        active
          ? "border-redline"
          : "border-transparent opacity-45 grayscale-[60%] hover:opacity-80 hover:grayscale-0",
      )}
    >
      <span className="flex h-14 items-end justify-center">
        <VehicleThumb vehicle={vehicle} />
      </span>
      <span>
        <span className="block font-sans text-[0.625rem] font-bold tracking-[0.18em] text-redline uppercase">
          {vehicle.brand}
        </span>
        <span className="block truncate text-sm font-semibold">
          {vehicle.model}
        </span>
      </span>
    </button>
  );
}
