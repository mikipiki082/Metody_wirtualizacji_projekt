import type { Rating } from "@/types/vehicle";

export function RatingBars({ ratings }: { ratings: Rating[] }) {
  return (
    <dl className="flex flex-col gap-3">
      {ratings.map((rating) => (
        <div key={rating.label}>
          <div className="mb-1.5 flex justify-between font-sans text-xs font-semibold tracking-[0.2em] uppercase">
            <dt className="text-steel">{rating.label}</dt>
            <dd>{rating.value.toFixed(1)}</dd>
          </div>
          <div className="h-1 bg-border">
            <div
              className="h-full bg-gradient-to-r from-redline to-redline-bright"
              style={{ width: `${rating.value * 10}%` }}
            />
          </div>
        </div>
      ))}
    </dl>
  );
}
