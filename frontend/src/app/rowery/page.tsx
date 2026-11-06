import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { VehicleCatalog } from "@/components/vehicle-catalog";

export const metadata: Metadata = {
  title: "Rowery - Redline Rent",
};

export default function BikesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wynajem rowerów"
        title="Rowery"
        lead="Rowery, na których ścigają się zawodowcy: szosa z karbonu, enduro na górskie zjazdy i elektryczny rower górski. Kask i zapięcie dostajesz w cenie."
      />
      <VehicleCatalog type="bike" />
    </>
  );
}
