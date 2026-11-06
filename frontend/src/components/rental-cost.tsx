import { formatPrice } from "@/lib/api";
import { formatDays, rentalDays } from "@/lib/rental";

type Props = {
  price: number | null;
  from: string;
  to: string;
};

export function RentalCost({ price, from, to }: Props) {
  const days = rentalDays(from, to);

  return (
    <div className="flex h-14 items-center gap-3 border border-border/60 bg-background/30 px-4">
      {price && days > 0 ? (
        <>
          <span className="font-display text-2xl">
            {formatPrice(price * days)} zł
          </span>
          <span className="text-sm text-steel">
            {formatDays(days)} × {formatPrice(price)} zł
          </span>
        </>
      ) : (
        <span className="text-sm text-steel">
          {price
            ? "Wybierz termin, a policzymy koszt."
            : "Wybierz pojazd i termin, a policzymy koszt."}
        </span>
      )}
    </div>
  );
}
