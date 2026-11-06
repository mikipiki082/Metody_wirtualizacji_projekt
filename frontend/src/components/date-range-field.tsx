"use client";

import { useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { pl } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { fieldClass } from "@/components/form-field";
import { cn } from "@/lib/utils";
import {
  formatDays,
  formatRange,
  parseIsoDate,
  rentalDays,
  toIsoDate,
} from "@/lib/rental";

type Props = {
  id: string;
  from: string;
  to: string;
  onChange: (from: string, to: string) => void;
};

export function DateRangeField({ id, from, to, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  const days = rentalDays(from, to);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function pick(day: Date) {
    if (!start || end || day < start) {
      onChange(toIsoDate(day), "");
      return;
    }
    onChange(from, toIsoDate(day));
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        id={id}
        className={cn(fieldClass, "flex h-14 items-center gap-3 text-left")}
      >
        <CalendarDays className="size-5 flex-none text-redline" />
        {start ? (
          <span className="truncate">
            {formatRange(from, to)}
            {days > 0 && (
              <span className="text-steel"> · {formatDays(days)}</span>
            )}
          </span>
        ) : (
          <span className="text-steel">Wybierz odbiór i zwrot</span>
        )}
        <ChevronDown className="ml-auto size-4 flex-none text-steel" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={6} align="start" className="z-50">
          <Popover.Popup className="origin-(--transform-origin) border border-border bg-card p-4 shadow-2xl shadow-black/60 outline-none transition-[opacity,scale] duration-150 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 sm:p-5">
            <p className="mb-3 font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
              {start && !end ? "Wybierz dzień zwrotu" : "Wybierz dzień odbioru"}
            </p>
            <DayPicker
              mode="range"
              locale={pl}
              numberOfMonths={2}
              selected={{ from: start, to: end }}
              onSelect={(_, day) => pick(day)}
              defaultMonth={start ?? today}
              disabled={{ before: today }}
              className="calendar"
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
