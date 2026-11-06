import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Kontakt - Redline Rent",
};

const info = [
  {
    icon: MapPin,
    title: "Odbiór",
    text: "W Poznaniu albo z dostawą pod wskazany adres.",
  },
  { icon: Clock, title: "Godziny", text: "Codziennie od 8:00 do 22:00." },
  {
    icon: ShieldCheck,
    title: "W cenie",
    text: "Ubezpieczenie OC i AC oraz assistance 24/7.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Zarezerwuj pojazd"
        lead="Wybierz pojazd i termin, a my potwierdzimy dostępność i prześlemy umowę do podpisu online."
      />
      <div className="grid gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[1.6fr_1fr] lg:px-12 lg:py-16 2xl:px-20">
        <Suspense>
          <ContactForm />
        </Suspense>
        <ul className="flex flex-col gap-6">
          {info.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 border border-border bg-card p-6"
            >
              <item.icon className="mt-1 size-6 flex-none text-redline" />
              <div>
                <p className="font-sans text-sm font-bold tracking-[0.18em] uppercase">
                  {item.title}
                </p>
                <p className="mt-1 text-steel">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
