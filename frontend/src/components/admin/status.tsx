import {
  CircleCheck,
  LoaderCircle,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Loading({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-2 p-10 text-steel",
        className,
      )}
    >
      <LoaderCircle className="size-5 animate-spin" />
      Wczytywanie...
    </p>
  );
}

type NoteProps = {
  tone: "error" | "success";
  children: React.ReactNode;
  className?: string;
};

export function Note({ tone, children, className }: NoteProps) {
  const Icon = tone === "error" ? TriangleAlert : CircleCheck;

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "flex items-start gap-3 border px-4 py-3 text-sm",
        tone === "error"
          ? "border-redline/40 bg-redline/10 text-redline-bright"
          : "border-border bg-white/[0.03] text-foreground",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-4 flex-none",
          tone === "success" && "text-redline",
        )}
      />
      <span>{children}</span>
    </p>
  );
}

type EmptyProps = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export function EmptyState({ icon: Icon, title, text }: EmptyProps) {
  return (
    <div className="flex flex-col items-center gap-3 border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <Icon className="size-9 text-redline" />
      <p className="font-sans text-sm font-bold tracking-[0.18em] uppercase">
        {title}
      </p>
      <p className="max-w-sm text-sm text-steel">{text}</p>
    </div>
  );
}
