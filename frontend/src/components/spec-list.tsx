import type { Spec } from "@/types/vehicle";

export function SpecList({ specs }: { specs: Spec[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col border-l-2 border-redline/60 pl-3"
        >
          <dt className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
            {spec.label}
          </dt>
          <dd className="font-medium">{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}
