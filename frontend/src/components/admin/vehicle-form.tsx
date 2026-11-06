"use client";

import { useState } from "react";
import { LoaderCircle, Plus, Save } from "lucide-react";
import { AvailabilitySwitch } from "@/components/admin/availability-switch";
import {
  typeIcons,
  typeLabels,
  vehicleTypes,
} from "@/components/admin/vehicle-type";
import { Field, fieldClass } from "@/components/form-field";
import {
  createVehicle,
  UnauthorizedError,
  updateVehicle,
  type VehicleInput,
} from "@/lib/admin";
import { FormError } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Vehicle, VehicleType } from "@/types/vehicle";

type FormState = {
  type: VehicleType;
  brand: string;
  model: string;
  category: string;
  year: string;
  pricePerDay: string;
  description: string;
  available: boolean;
};

const empty: FormState = {
  type: "car",
  brand: "",
  model: "",
  category: "",
  year: "",
  pricePerDay: "",
  description: "",
  available: true,
};

const placeholders: Record<
  VehicleType,
  { brand: string; model: string; category: string }
> = {
  car: { brand: "np. Porsche", model: "np. 911 GT3 RS", category: "np. Coupé" },
  bike: {
    brand: "np. Specialized",
    model: "np. Turbo Levo",
    category: "np. Rower elektryczny",
  },
};

function toForm(vehicle: Vehicle): FormState {
  return {
    type: vehicle.type,
    brand: vehicle.brand,
    model: vehicle.model,
    category: vehicle.category,
    year: String(vehicle.year),
    pricePerDay: String(vehicle.pricePerDay),
    description: vehicle.description,
    available: vehicle.available,
  };
}

function toInput(form: FormState): VehicleInput {
  return {
    ...form,
    year: Number(form.year),
    pricePerDay: Number(form.pricePerDay),
  };
}

type Props = {
  token: string;
  vehicle: Vehicle | null;
  onSaved: (vehicle: Vehicle) => void;
  onCancel: () => void;
  onUnauthorized: () => void;
};

export function VehicleForm({
  token,
  vehicle,
  onSaved,
  onCancel,
  onUnauthorized,
}: Props) {
  const [form, setForm] = useState(vehicle ? toForm(vehicle) : empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function update(fields: Partial<FormState>) {
    setForm({ ...form, ...fields });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setErrors({});
    setMessage(null);
    try {
      const input = toInput(form);
      const saved = vehicle
        ? await updateVehicle(token, vehicle.id, input)
        : await createVehicle(token, input);
      onSaved(saved);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        onUnauthorized();
        return;
      }
      setSaving(false);
      setMessage((err as Error).message);
      if (err instanceof FormError) {
        setErrors(err.fields);
      }
    }
  }

  const hints = placeholders[form.type];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5 border border-border bg-card/85 p-6 backdrop-blur-sm sm:grid-cols-2 sm:p-8"
    >
      <TypePicker
        value={form.type}
        error={errors.type}
        onChange={(type) => update({ type })}
      />
      <Field id="kategoria" label="Kategoria" error={errors.category}>
        <input
          id="kategoria"
          className={cn(fieldClass, "h-14")}
          value={form.category}
          onChange={(e) => update({ category: e.target.value })}
          placeholder={hints.category}
          maxLength={60}
        />
      </Field>
      <Field id="marka" label="Marka" error={errors.brand}>
        <input
          id="marka"
          className={cn(fieldClass, "h-14")}
          value={form.brand}
          onChange={(e) => update({ brand: e.target.value })}
          placeholder={hints.brand}
          maxLength={60}
        />
      </Field>
      <Field id="model" label="Model" error={errors.model}>
        <input
          id="model"
          className={cn(fieldClass, "h-14")}
          value={form.model}
          onChange={(e) => update({ model: e.target.value })}
          placeholder={hints.model}
          maxLength={80}
        />
      </Field>
      <Field id="rok" label="Rok produkcji" error={errors.year}>
        <input
          id="rok"
          className={cn(fieldClass, "h-14")}
          inputMode="numeric"
          value={form.year}
          onChange={(e) => update({ year: e.target.value })}
          placeholder="np. 2024"
          maxLength={4}
        />
      </Field>
      <Field id="cena" label="Cena za dobę" error={errors.pricePerDay}>
        <div className="relative">
          <input
            id="cena"
            className={cn(fieldClass, "h-14 pr-24")}
            inputMode="numeric"
            value={form.pricePerDay}
            onChange={(e) => update({ pricePerDay: e.target.value })}
            placeholder="np. 1200"
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-steel">
            zł / doba
          </span>
        </div>
      </Field>
      <Field
        id="opis"
        label="Opis"
        error={errors.description}
        className="sm:col-span-2"
      >
        <textarea
          id="opis"
          className={cn(fieldClass, "min-h-36 resize-y py-3")}
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Kilka zdań o charakterze pojazdu, które zobaczy klient."
          maxLength={1000}
        />
        <p className="text-right text-xs text-steel">
          {form.description.length} / 1000
        </p>
      </Field>

      <div className="flex items-center justify-between gap-6 border border-border bg-background/40 p-4 sm:col-span-2">
        <div>
          <label htmlFor="dostepny" className="font-semibold">
            Dostępny od ręki
          </label>
          <p className="text-sm text-steel">
            Wyłącz, gdy pojazd jest wypożyczony albo w serwisie.
          </p>
          {errors.available && (
            <p className="text-sm text-redline-bright">{errors.available}</p>
          )}
        </div>
        <AvailabilitySwitch
          id="dostepny"
          checked={form.available}
          onChange={(available) => update({ available })}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="chamfer-sm flex items-center gap-3 bg-redline px-7 py-4 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright disabled:opacity-60"
        >
          {saving ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : vehicle ? (
            <Save className="size-5" />
          ) : (
            <Plus className="size-5" />
          )}
          {vehicle ? "Zapisz zmiany" : "Dodaj pojazd"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="py-4 font-sans text-sm font-semibold tracking-[0.18em] text-steel uppercase transition-colors hover:text-foreground"
        >
          Anuluj
        </button>
        {message && <p className="text-sm text-redline-bright">{message}</p>}
      </div>
    </form>
  );
}

type TypePickerProps = {
  value: VehicleType;
  error?: string;
  onChange: (type: VehicleType) => void;
};

function TypePicker({ value, error, onChange }: TypePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <p
        id="typ"
        className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase"
      >
        Typ pojazdu
      </p>
      <div
        role="group"
        aria-labelledby="typ"
        className="grid h-14 grid-cols-2 gap-1 border border-border bg-background/60 p-1"
      >
        {vehicleTypes.map((type) => {
          const Icon = typeIcons[type];
          const selected = type === value;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(type)}
              className={cn(
                "flex items-center justify-center gap-2 font-sans text-xs font-semibold tracking-[0.16em] uppercase transition-colors",
                selected
                  ? "bg-white/[0.07] text-foreground shadow-[inset_0_-2px_0_var(--color-redline)]"
                  : "text-steel hover:bg-white/[0.03] hover:text-foreground",
              )}
            >
              <Icon className={cn("size-4", selected && "text-redline")} />
              {typeLabels[type]}
            </button>
          );
        })}
      </div>
      {error && <p className="text-sm text-redline-bright">{error}</p>}
    </div>
  );
}
