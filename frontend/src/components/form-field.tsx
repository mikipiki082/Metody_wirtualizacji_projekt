import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full border border-border bg-background/60 px-4 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-steel/60 hover:border-steel/40 focus-visible:border-steel/50 focus-visible:shadow-[inset_0_-2px_0_var(--color-redline)] data-popup-open:border-steel/50 data-popup-open:shadow-[inset_0_-2px_0_var(--color-redline)]";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({ id, label, error, children, className }: Props) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-redline-bright">{error}</p>}
    </div>
  );
}
