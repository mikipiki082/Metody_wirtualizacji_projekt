"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Plus, RefreshCw } from "lucide-react";
import { AdminNav, type Section } from "@/components/admin/admin-nav";
import { InquiryList } from "@/components/admin/inquiry-list";
import { SectionHeader } from "@/components/admin/section-header";
import { Loading, Note } from "@/components/admin/status";
import { VehicleForm } from "@/components/admin/vehicle-form";
import { VehicleList } from "@/components/admin/vehicle-list";
import { getInquiries, UnauthorizedError, type Inquiry } from "@/lib/admin";
import { getVehicles } from "@/lib/api";
import { cn } from "@/lib/utils";
import { plural } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

const expiredNotice = "Sesja wygasła. Zaloguj się ponownie.";

const buttonClass =
  "flex items-center gap-2 px-5 py-3 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors disabled:opacity-60";

type Saved = {
  id: number;
  text: string;
};

type Props = {
  token: string;
  onLogout: (notice: string | null) => void;
};

export function AdminDashboard({ token, onLogout }: Props) {
  const [section, setSection] = useState<Section>("vehicles");
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[] | null>(null);
  const [vehiclesError, setVehiclesError] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[] | null>(null);
  const [inquiriesError, setInquiriesError] = useState<string | null>(null);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    getVehicles()
      .then(setVehicles)
      .catch((err: Error) => setVehiclesError(err.message));
  }, []);

  useEffect(() => {
    getInquiries(token).catch((err) => {
      if (err instanceof UnauthorizedError) {
        onLogout(expiredNotice);
      }
    });
  }, [token, onLogout]);

  function expire() {
    onLogout(expiredNotice);
  }

  function open(next: Section) {
    setSection(next);
    setEditing(null);
    setSaved(null);
    window.scrollTo({ top: 0 });
    if (next === "inquiries") {
      loadInquiries();
    }
  }

  async function loadInquiries() {
    setLoadingInquiries(true);
    setInquiriesError(null);
    try {
      setInquiries(await getInquiries(token));
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        expire();
        return;
      }
      setInquiriesError((err as Error).message);
    }
    setLoadingInquiries(false);
  }

  function edit(vehicle: Vehicle) {
    setEditing(vehicle);
    setSaved(null);
    window.scrollTo({ top: 0 });
  }

  function replace(vehicle: Vehicle) {
    setVehicles((list) =>
      (list ?? []).map((item) => (item.id === vehicle.id ? vehicle : item)),
    );
  }

  function remove(id: number) {
    setVehicles((list) => (list ?? []).filter((item) => item.id !== id));
    setSaved(null);
  }

  function handleSaved(vehicle: Vehicle) {
    const name = `${vehicle.brand} ${vehicle.model}`;
    if (editing) {
      replace(vehicle);
      setSaved({ id: vehicle.id, text: `Zapisano zmiany: ${name}.` });
    } else {
      setVehicles((list) => [...(list ?? []), vehicle]);
      setSaved({ id: vehicle.id, text: `Dodano pojazd ${name}.` });
    }
    setEditing(null);
    setSection("vehicles");
  }

  function cancelForm() {
    setEditing(null);
    setSection("vehicles");
  }

  function renderVehicles() {
    if (vehiclesError) {
      return (
        <Note tone="error">Nie udało się pobrać pojazdów: {vehiclesError}</Note>
      );
    }
    if (!vehicles) {
      return <Loading />;
    }
    return (
      <VehicleList
        token={token}
        vehicles={vehicles}
        highlightId={saved?.id ?? null}
        onEdit={edit}
        onChange={replace}
        onDelete={remove}
        onUnauthorized={expire}
      />
    );
  }

  function renderInquiries() {
    if (inquiriesError) {
      return (
        <Note tone="error">Nie udało się pobrać zapytań: {inquiriesError}</Note>
      );
    }
    if (!inquiries) {
      return <Loading />;
    }
    return <InquiryList inquiries={inquiries} vehicles={vehicles ?? []} />;
  }

  function renderContent() {
    if (editing) {
      return (
        <>
          <SectionHeader
            title="Edytuj pojazd"
            lead={`${editing.brand} ${editing.model}. Zmiany od razu trafią na stronę wypożyczalni.`}
          />
          <VehicleForm
            key={editing.id}
            token={token}
            vehicle={editing}
            onSaved={handleSaved}
            onCancel={cancelForm}
            onUnauthorized={expire}
          />
        </>
      );
    }

    if (section === "add") {
      return (
        <>
          <SectionHeader
            title="Dodaj pojazd"
            lead="Uzupełnij dane, a zdjęcie wgrasz z listy pojazdów zaraz po dodaniu."
          />
          <VehicleForm
            key="new"
            token={token}
            vehicle={null}
            onSaved={handleSaved}
            onCancel={cancelForm}
            onUnauthorized={expire}
          />
        </>
      );
    }

    if (section === "inquiries") {
      const count = inquiries?.length ?? 0;
      return (
        <>
          <SectionHeader
            title="Zapytania"
            lead={
              count > 0
                ? `${count} ${plural(count, "zapytanie", "zapytania", "zapytań")} od klientów, od najnowszych.`
                : "Wiadomości wysłane przez formularz kontaktowy."
            }
          >
            <button
              type="button"
              onClick={loadInquiries}
              disabled={loadingInquiries}
              className={cn(
                buttonClass,
                "border border-border hover:border-steel/40 hover:bg-white/[0.04]",
              )}
            >
              {loadingInquiries ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <RefreshCw className="size-4" />
              )}
              Odśwież
            </button>
          </SectionHeader>
          {renderInquiries()}
        </>
      );
    }

    return (
      <>
        <SectionHeader
          title="Pojazdy"
          lead="Cała flota w jednym miejscu: dostępność, zdjęcia i dane pojazdów."
        >
          <button
            type="button"
            onClick={() => open("add")}
            className={cn(
              buttonClass,
              "chamfer-sm hidden bg-redline hover:bg-redline-bright sm:flex",
            )}
          >
            <Plus className="size-4" />
            Dodaj pojazd
          </button>
        </SectionHeader>
        {saved && <Note tone="success">{saved.text}</Note>}
        {renderVehicles()}
      </>
    );
  }

  return (
    <div className="grid gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:px-12 lg:py-12 2xl:px-20">
      <AdminNav
        active={editing ? "vehicles" : section}
        onSelect={open}
        onLogout={() => onLogout(null)}
      />
      <div className="flex min-w-0 flex-col gap-6">{renderContent()}</div>
    </div>
  );
}
