import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

const info = [
  {
    icon: MapPin,
    title: "Odbiór",
    text: "Poznań lub dostawa pod wskazany adres",
  },
  { icon: Clock, title: "Godziny", text: "Codziennie od 8:00 do 22:00" },
  {
    icon: ShieldCheck,
    title: "W cenie",
    text: "Ubezpieczenie OC i AC oraz assistance 24/7",
  },
];

export function SiteFooter() {
  return (
    <footer
      id="kontakt"
      className="relative border-t border-border bg-card/60 px-4 py-12 sm:px-8 lg:px-12 2xl:px-20"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-4">
          <Logo className="h-7" />
          <p className="max-w-sm text-sm text-steel">
            Wypożyczalnia sportowych i tuningowanych samochodów oraz rowerów
            premium.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-3">
          {info.map((item) => (
            <li key={item.title} className="flex gap-3">
              <item.icon className="mt-0.5 size-5 flex-none text-redline" />
              <div>
                <p className="font-sans text-sm font-bold tracking-[0.18em] uppercase">
                  {item.title}
                </p>
                <p className="text-sm text-steel">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 border-t border-border pt-6 text-xs text-steel">
        Projekt zaliczeniowy z przedmiotu Metody wirtualizacji, Politechnika
        Poznańska 2026/2027.
      </p>
    </footer>
  );
}
