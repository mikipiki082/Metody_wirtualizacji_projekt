import type { Metadata } from "next";
import { Bike, Car, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { RentalSteps } from "@/components/rental-steps";

export const metadata: Metadata = {
  title: "Jak wynająć - Redline Rent",
};

const requirements = [
  {
    icon: Car,
    title: "Samochody",
    items: [
      "Ukończone 25 lat",
      "Prawo jazdy kategorii B od co najmniej 3 lat",
      "Dowód osobisty lub paszport",
      "Zwrotna kaucja, której wysokość zależy od auta",
    ],
  },
  {
    icon: Bike,
    title: "Rowery",
    items: [
      "Ukończone 18 lat",
      "Dowód osobisty lub paszport",
      "Zwrotna kaucja",
      "Kask i zapięcie w cenie",
    ],
  },
];

const included = [
  "Ubezpieczenie OC i AC",
  "Assistance 24/7 w Polsce i za granicą",
  "Dostawa pod wskazany adres w Poznaniu",
  "Pojazd umyty i gotowy do jazdy",
];

export default function HowToRentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Jak wynająć"
        title="Prosto i bez niespodzianek"
        lead="Rezerwacja zajmuje kilka minut. Poniżej znajdziesz kolejne kroki, wymagania i wszystko, co dostajesz w cenie."
      />

      <div className="flex flex-col gap-16 px-4 py-12 sm:px-8 lg:px-12 lg:py-16 2xl:px-20">
        <RentalSteps />

        <section className="grid gap-6 lg:grid-cols-3">
          {requirements.map((group) => (
            <div
              key={group.title}
              className="border border-border bg-card p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-3 font-display text-2xl font-extrabold uppercase">
                <group.icon className="size-6 text-redline" />
                {group.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-steel">
                    <Check className="mt-0.5 size-4 flex-none text-redline" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="border border-redline/40 bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold uppercase">
              W cenie najmu
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-steel">
                  <Check className="mt-0.5 size-4 flex-none text-redline" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
