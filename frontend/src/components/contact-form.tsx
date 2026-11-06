"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { DateRangeField } from "@/components/date-range-field";
import { Field, fieldClass } from "@/components/form-field";
import { RentalCost } from "@/components/rental-cost";
import { VehicleSelect } from "@/components/vehicle-select";
import { cn } from "@/lib/utils";
import {
  FormError,
  getVehicles,
  sendInquiry,
  type InquiryForm,
} from "@/lib/api";
import { parseIsoDate } from "@/lib/rental";
import type { Vehicle } from "@/types/vehicle";

const empty: InquiryForm = {
  name: "",
  email: "",
  phone: "",
  vehicleId: "",
  dateFrom: "",
  dateTo: "",
  message: "",
};

function dateParam(value: string | null) {
  return value && parseIsoDate(value) ? value : "";
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<InquiryForm>({
    ...empty,
    vehicleId: searchParams.get("pojazd") ?? "",
    dateFrom: dateParam(searchParams.get("od")),
    dateTo: dateParam(searchParams.get("do")),
  });
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch(() => setVehicles([]));
  }, []);

  function update(fields: Partial<InquiryForm>) {
    setForm({ ...form, ...fields });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    setMessage(null);
    try {
      await sendInquiry(form);
      setStatus("sent");
      setForm(empty);
    } catch (err) {
      setStatus("idle");
      setMessage((err as Error).message);
      if (err instanceof FormError) {
        setErrors(err.fields);
      }
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 border border-border bg-card p-8">
        <CircleCheck className="size-10 text-redline" />
        <h2 className="font-display text-3xl uppercase">Dziękujemy!</h2>
        <p className="text-steel">
          Zapytanie trafiło do nas. Odpowiemy na podany adres e-mail
          najszybciej, jak to możliwe.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold tracking-[0.2em] uppercase underline-offset-8 hover:underline"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  const vehicle = vehicles.find((item) => String(item.id) === form.vehicleId);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
    >
      <Field id="imie" label="Imię i nazwisko" error={errors.name}>
        <input
          id="imie"
          className={cn(fieldClass, "h-14")}
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          autoComplete="name"
          required
        />
      </Field>
      <Field id="email" label="E-mail" error={errors.email}>
        <input
          id="email"
          className={cn(fieldClass, "h-14")}
          type="email"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          autoComplete="email"
          required
        />
      </Field>
      <Field id="telefon" label="Telefon (opcjonalnie)" error={errors.phone}>
        <input
          id="telefon"
          className={cn(fieldClass, "h-14")}
          type="tel"
          value={form.phone}
          onChange={(e) => update({ phone: e.target.value })}
          autoComplete="tel"
        />
      </Field>
      <Field id="pojazd" label="Pojazd" error={errors.vehicleId}>
        <VehicleSelect
          id="pojazd"
          vehicles={vehicles}
          value={form.vehicleId}
          onChange={(vehicleId) => update({ vehicleId })}
        />
      </Field>
      <Field
        id="termin"
        label="Termin"
        error={errors.dateFrom ?? errors.dateTo}
      >
        <DateRangeField
          id="termin"
          from={form.dateFrom}
          to={form.dateTo}
          onChange={(dateFrom, dateTo) => update({ dateFrom, dateTo })}
        />
      </Field>
      <div className="flex flex-col gap-2">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
          Szacunkowy koszt
        </p>
        <RentalCost
          price={vehicle?.pricePerDay ?? null}
          from={form.dateFrom}
          to={form.dateTo}
        />
      </div>
      <Field
        id="wiadomosc"
        label="Wiadomość"
        error={errors.message}
        className="sm:col-span-2"
      >
        <textarea
          id="wiadomosc"
          className={cn(fieldClass, "min-h-36 resize-y py-3")}
          value={form.message}
          onChange={(e) => update({ message: e.target.value })}
          placeholder="Napisz, skąd chcesz odebrać pojazd albo o co chcesz zapytać."
          required
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="chamfer-sm flex items-center gap-3 bg-redline px-7 py-4 font-sans text-base font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright disabled:opacity-60"
        >
          {status === "sending" ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <Send className="size-5" />
          )}
          Wyślij zapytanie
        </button>
        {message && <p className="text-sm text-redline-bright">{message}</p>}
      </div>
    </form>
  );
}
