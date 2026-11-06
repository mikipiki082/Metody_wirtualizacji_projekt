import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { VehicleCatalog } from "@/components/vehicle-catalog";

export const metadata: Metadata = {
  title: "Samochody - Redline Rent",
};

export default function CarsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Wynajem samochodów"
        title="Samochody"
        lead="Supersamochody, sportowe coupé i legendy JDM po tuningu. Każde auto jest ubezpieczone i gotowe do jazdy od ręki."
      />
      <VehicleCatalog type="car" />
    </>
  );
}
