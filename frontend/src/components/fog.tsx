import { cn } from "@/lib/utils";

export function Fog({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="fog-layer -bottom-1/4 -left-1/4 h-2/3 w-3/4" />
      <div className="fog-layer -right-1/4 bottom-0 h-1/2 w-2/3 [animation-delay:-6s] [animation-duration:24s]" />
      <div className="fog-layer top-1/4 left-1/3 h-1/3 w-1/2 opacity-60 [animation-delay:-12s] [animation-duration:30s]" />
    </div>
  );
}
