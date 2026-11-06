"use client";

import { useEffect, useRef, useState } from "react";
import {
  ImageOff,
  ImageUp,
  LoaderCircle,
  Pencil,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { AvailabilitySwitch } from "@/components/admin/availability-switch";
import { Note } from "@/components/admin/status";
import { typeIcons, typeLabels } from "@/components/admin/vehicle-type";
import { VehicleThumb } from "@/components/vehicle-thumb";
import {
  deleteVehicle,
  UnauthorizedError,
  updateVehicle,
  uploadVehicleImage,
} from "@/lib/admin";
import { formatPrice } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

export const rowGrid =
  "xl:grid-cols-[6rem_minmax(0,1fr)_6.5rem_8rem_9.5rem_8.5rem]";

type Action = "available" | "image" | "delete";

type Message = {
  tone: "error" | "success";
  text: string;
};

type Props = {
  token: string;
  vehicle: Vehicle;
  highlighted: boolean;
  onEdit: (vehicle: Vehicle) => void;
  onChange: (vehicle: Vehicle) => void;
  onDelete: (id: number) => void;
  onUnauthorized: () => void;
};

export function VehicleRow({
  token,
  vehicle,
  highlighted,
  onEdit,
  onChange,
  onDelete,
  onUnauthorized,
}: Props) {
  const row = useRef<HTMLLIElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState<Action | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (highlighted) {
      row.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlighted]);

  function fail(err: unknown) {
    if (err instanceof UnauthorizedError) {
      onUnauthorized();
    } else {
      setMessage({ tone: "error", text: (err as Error).message });
    }
  }

  async function toggleAvailable(available: boolean) {
    setBusy("available");
    setMessage(null);
    try {
      onChange(await updateVehicle(token, vehicle.id, { available }));
    } catch (err) {
      fail(err);
    }
    setBusy(null);
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setBusy("image");
    setMessage(null);
    try {
      onChange(await uploadVehicleImage(token, vehicle.id, file));
      setMessage({
        tone: "success",
        text:
          vehicle.colors.length > 0
            ? "Zdjęcie zapisane. Ten pojazd ma warianty kolorów, więc na stronie nadal widać zdjęcia kolorów."
            : "Zdjęcie zapisane.",
      });
    } catch (err) {
      fail(err);
    }
    setBusy(null);
  }

  async function handleDelete() {
    setBusy("delete");
    setMessage(null);
    try {
      await deleteVehicle(token, vehicle.id);
      onDelete(vehicle.id);
    } catch (err) {
      fail(err);
      setBusy(null);
    }
  }

  const TypeIcon = typeIcons[vehicle.type];
  const hasImage = Boolean(vehicle.colors[0]?.imageUrl ?? vehicle.imageUrl);
  const switchId = `dostepny-${vehicle.id}`;

  return (
    <li
      ref={row}
      className={cn(
        "border bg-card/85 backdrop-blur-sm transition-colors",
        highlighted ? "border-redline/70" : "border-border",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-4 p-4 sm:grid-cols-[7rem_minmax(0,1fr)] xl:gap-5",
          rowGrid,
        )}
      >
        <div className="flex h-14 items-center justify-center sm:h-16">
          {hasImage ? (
            <VehicleThumb vehicle={vehicle} />
          ) : (
            <span className="flex size-full items-center justify-center border border-dashed border-border text-steel/50">
              <ImageOff className="size-5" />
            </span>
          )}
        </div>

        <div className="min-w-0">
          <p className="font-sans text-[0.625rem] font-bold tracking-[0.18em] text-redline uppercase sm:text-xs">
            {vehicle.brand}
          </p>
          <p className="truncate font-semibold sm:text-lg">{vehicle.model}</p>
          <p className="truncate text-sm text-steel">
            <span className="xl:hidden">{typeLabels[vehicle.type]} · </span>
            {vehicle.category} · {vehicle.year}
          </p>
        </div>

        <p className="hidden items-center gap-2 text-sm text-steel xl:flex">
          <TypeIcon className="size-4 flex-none" />
          {typeLabels[vehicle.type]}
        </p>

        <div className="col-span-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-border/60 pt-4 xl:contents">
          <p className="whitespace-nowrap">
            <span className="font-semibold">
              {formatPrice(vehicle.pricePerDay)} zł
            </span>
            <span className="text-sm text-steel"> / doba</span>
          </p>

          <div className="flex items-center gap-3">
            <AvailabilitySwitch
              id={switchId}
              checked={vehicle.available}
              disabled={busy !== null}
              onChange={toggleAvailable}
            />
            <label htmlFor={switchId} className="text-sm">
              {vehicle.available ? "Dostępny" : "Wypożyczony"}
            </label>
          </div>

          <div className="flex w-full gap-2 sm:w-auto xl:justify-end">
            <ActionButton
              icon={Pencil}
              label="Edytuj"
              disabled={busy !== null}
              onClick={() => onEdit(vehicle)}
            />
            <ActionButton
              icon={busy === "image" ? LoaderCircle : ImageUp}
              label="Zdjęcie"
              spinning={busy === "image"}
              disabled={busy !== null}
              onClick={() => fileInput.current?.click()}
            />
            <ActionButton
              icon={Trash2}
              label="Usuń"
              danger
              active={confirming}
              disabled={busy !== null}
              onClick={() => setConfirming(true)}
            />
          </div>
        </div>

        <input
          ref={fileInput}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {confirming && (
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-redline/40 bg-redline/10 px-4 py-3">
          <p className="text-sm">
            Na pewno usunąć{" "}
            <span className="font-semibold">
              {vehicle.brand} {vehicle.model}
            </span>
            ? Tej operacji nie można cofnąć.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy === "delete"}
              className="chamfer-sm flex items-center gap-2 bg-redline px-4 py-2.5 font-sans text-xs font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright disabled:opacity-60"
            >
              {busy === "delete" ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              Tak, usuń
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={busy === "delete"}
              className="px-4 py-2.5 font-sans text-xs font-semibold tracking-[0.18em] text-steel uppercase transition-colors hover:text-foreground"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {message && (
        <Note tone={message.tone} className="border-x-0 border-b-0">
          {message.text}
        </Note>
      )}
    </li>
  );
}

type ActionProps = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  spinning?: boolean;
  danger?: boolean;
  active?: boolean;
};

function ActionButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  spinning,
  danger,
  active,
}: ActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className={cn(
        "flex h-10 flex-1 items-center justify-center gap-1.5 border px-2 font-sans text-xs font-semibold tracking-[0.12em] uppercase transition-colors disabled:opacity-50 sm:flex-none sm:gap-2 sm:px-3 sm:tracking-[0.16em] xl:w-10 xl:px-0",
        active ? "border-redline text-redline-bright" : "border-border",
        danger
          ? "hover:border-redline/60 hover:text-redline-bright"
          : "hover:border-steel/40 hover:bg-white/[0.04]",
      )}
    >
      <Icon className={cn("size-4 flex-none", spinning && "animate-spin")} />
      <span className="xl:sr-only">{label}</span>
    </button>
  );
}
