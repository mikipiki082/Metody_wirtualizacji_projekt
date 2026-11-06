"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/samochody", label: "Samochody" },
  { href: "/rowery", label: "Rowery" },
  { href: "/jak-wynajac", label: "Jak wynająć" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="flex h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-8 lg:h-20 lg:px-12 2xl:px-20">
        <Logo className="h-5 min-[400px]:h-6 sm:h-7 xl:h-8" />

        <nav className="hidden items-center gap-8 xl:flex 2xl:gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "border-b-2 py-1 font-sans text-[0.9375rem] whitespace-nowrap font-semibold tracking-[0.18em] uppercase transition-colors",
                isActive(link.href)
                  ? "border-redline text-foreground"
                  : "border-transparent text-foreground/85 hover:border-redline/60 hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/kontakt"
            className="chamfer-sm hidden bg-redline px-5 py-2.5 font-sans text-sm font-bold tracking-[0.18em] uppercase transition-colors hover:bg-redline-bright sm:block xl:px-6 xl:py-3 xl:text-[0.9375rem]"
          >
            Zarezerwuj
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            className="p-2 text-foreground xl:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-border/60 px-4 py-4 sm:px-8 lg:px-12 xl:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 font-sans text-lg font-semibold tracking-[0.18em] uppercase",
                isActive(link.href) ? "text-redline" : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
