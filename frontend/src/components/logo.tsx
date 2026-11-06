import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Redline Rent - strona główna"
      className={cn("block shrink-0", className)}
    >
      <Image
        src="/brand/redline-rent.svg"
        alt="Redline Rent"
        width={1424}
        height={128}
        priority
        unoptimized
        className="h-full w-auto"
      />
    </Link>
  );
}
