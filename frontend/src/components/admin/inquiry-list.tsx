import Link from "next/link";
import { ArrowUpRight, Inbox, Mail, Phone } from "lucide-react";
import { EmptyState } from "@/components/admin/status";
import type { Inquiry } from "@/lib/admin";
import { formatDays, formatRange, rentalDays } from "@/lib/rental";
import { vehicleHref } from "@/lib/vehicles";
import type { Vehicle } from "@/types/vehicle";

const sentFormat = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

type Props = {
  inquiries: Inquiry[];
  vehicles: Vehicle[];
};

export function InquiryList({ inquiries, vehicles }: Props) {
  if (inquiries.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="Brak zapytań"
        text="Gdy klient wyśle formularz kontaktowy, jego zapytanie pojawi się tutaj."
      />
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {inquiries.map((inquiry) => (
        <InquiryCard key={inquiry.id} inquiry={inquiry} vehicles={vehicles} />
      ))}
    </ul>
  );
}

type CardProps = {
  inquiry: Inquiry;
  vehicles: Vehicle[];
};

function InquiryCard({ inquiry, vehicles }: CardProps) {
  return (
    <li className="border border-border bg-card/85 backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 border-b border-border p-5 sm:px-6">
        <div className="min-w-0">
          <p className="text-lg font-semibold wrap-break-word">
            {inquiry.name}
          </p>
          <div className="mt-1 flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <a
              href={`mailto:${inquiry.email}`}
              className="flex min-w-0 items-center gap-2 text-steel transition-colors hover:text-foreground"
            >
              <Mail className="size-4 flex-none text-redline" />
              <span className="wrap-anywhere">{inquiry.email}</span>
            </a>
            {inquiry.phone && (
              <a
                href={`tel:${inquiry.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-steel transition-colors hover:text-foreground"
              >
                <Phone className="size-4 flex-none text-redline" />
                {inquiry.phone}
              </a>
            )}
          </div>
        </div>
        <time
          dateTime={inquiry.createdAt}
          className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase"
        >
          {sentFormat.format(new Date(inquiry.createdAt))}
        </time>
      </div>

      <div className="grid gap-6 p-5 sm:px-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10">
        <dl className="flex flex-col gap-4">
          <Detail label="Pojazd">
            <InquiryVehicle inquiry={inquiry} vehicles={vehicles} />
          </Detail>
          <Detail label="Termin">
            <InquiryDates inquiry={inquiry} />
          </Detail>
        </dl>
        <div>
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
            Wiadomość
          </p>
          <p className="mt-1 leading-relaxed whitespace-pre-line wrap-break-word">
            {inquiry.message}
          </p>
        </div>
      </div>
    </li>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
        {label}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

function InquiryVehicle({ inquiry, vehicles }: CardProps) {
  if (!inquiry.vehicle) {
    return <span className="text-steel">Nie wybrano</span>;
  }

  const name = `${inquiry.vehicle.brand} ${inquiry.vehicle.model}`;
  const vehicle = vehicles.find((item) => item.id === inquiry.vehicle?.id);
  if (!vehicle) {
    return <span>{name}</span>;
  }

  return (
    <Link
      href={vehicleHref(vehicle)}
      className="inline-flex items-center gap-1 font-semibold underline-offset-4 transition-colors hover:text-redline hover:underline"
    >
      {name}
      <ArrowUpRight className="size-4 flex-none" />
    </Link>
  );
}

function InquiryDates({ inquiry }: { inquiry: Inquiry }) {
  if (!inquiry.dateFrom) {
    return <span className="text-steel">Nie podano</span>;
  }

  const days = inquiry.dateTo
    ? rentalDays(inquiry.dateFrom, inquiry.dateTo)
    : 0;

  return (
    <span>
      {formatRange(inquiry.dateFrom, inquiry.dateTo ?? "", true)}
      {days > 0 && (
        <>
          {" "}
          <span className="whitespace-nowrap text-steel">
            · {formatDays(days)}
          </span>
        </>
      )}
    </span>
  );
}
