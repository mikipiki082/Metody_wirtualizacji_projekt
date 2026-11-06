import {
  CarFront,
  Inbox,
  LogOut,
  ShieldCheck,
  SquarePlus,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Section = "vehicles" | "add" | "inquiries";

const items: {
  id: Section;
  label: string;
  short: string;
  icon: LucideIcon;
}[] = [
  { id: "vehicles", label: "Pojazdy", short: "Pojazdy", icon: CarFront },
  { id: "add", label: "Dodaj pojazd", short: "Dodaj", icon: SquarePlus },
  { id: "inquiries", label: "Zapytania", short: "Zapytania", icon: Inbox },
];

const itemClass =
  "flex flex-1 flex-col items-center justify-center gap-1.5 px-1 py-3 font-sans text-[0.625rem] font-semibold tracking-[0.12em] uppercase transition-colors sm:flex-row sm:gap-2.5 sm:text-xs sm:tracking-[0.16em] lg:flex-none lg:justify-start lg:gap-3 lg:border-l-2 lg:px-4 lg:py-3.5 lg:text-sm";

type Props = {
  active: Section;
  onSelect: (section: Section) => void;
  onLogout: () => void;
};

export function AdminNav({ active, onSelect, onLogout }: Props) {
  return (
    <nav
      aria-label="Panel administratora"
      className="flex border border-border bg-card/85 backdrop-blur-sm lg:sticky lg:top-28 lg:h-[calc(100svh-9rem)] lg:min-h-80 lg:flex-col lg:self-start lg:py-4"
    >
      <div className="mb-4 hidden items-center gap-3 border-b border-border px-5 pb-5 lg:flex">
        <ShieldCheck className="size-6 flex-none text-redline" />
        <div>
          <p className="font-sans text-xs font-bold tracking-[0.2em] uppercase">
            Administrator
          </p>
          <p className="text-sm text-steel">Redline Rent</p>
        </div>
      </div>

      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              itemClass,
              isActive
                ? "bg-white/[0.04] text-foreground shadow-[inset_0_-2px_0_var(--color-redline)] lg:border-redline lg:shadow-none"
                : "text-steel hover:bg-white/[0.03] hover:text-foreground lg:border-transparent",
            )}
          >
            <item.icon
              className={cn("size-5 flex-none", isActive && "text-redline")}
            />
            <span className="sm:hidden">{item.short}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}

      <div className="flex border-l border-border lg:mt-auto lg:flex-col lg:border-t lg:border-l-0 lg:pt-4">
        <button
          type="button"
          onClick={onLogout}
          className={cn(
            itemClass,
            "px-3 text-steel hover:bg-white/[0.03] hover:text-foreground sm:px-5 lg:border-transparent lg:px-4",
          )}
        >
          <LogOut className="size-5 flex-none" />
          Wyloguj
        </button>
      </div>
    </nav>
  );
}
