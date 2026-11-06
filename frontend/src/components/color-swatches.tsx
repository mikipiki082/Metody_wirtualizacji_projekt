import { imageSrc } from "@/lib/api";
import { preloadImage } from "@/lib/preload";
import { cn } from "@/lib/utils";
import type { VehicleColor } from "@/types/vehicle";

type Props = {
  colors: VehicleColor[];
  selected: number;
  onSelect: (index: number) => void;
};

export function ColorSwatches({ colors, selected, onSelect }: Props) {
  if (colors.length === 0) {
    return null;
  }

  function preloadColors() {
    colors.forEach((color) => preloadImage(imageSrc(color.imageUrl)));
  }

  return (
    <div onPointerEnter={preloadColors} onFocus={preloadColors}>
      <p className="mb-2 font-sans text-xs font-semibold tracking-[0.2em] text-steel uppercase">
        Kolor: <span className="text-foreground">{colors[selected]?.name}</span>
      </p>
      <div className="flex gap-2.5">
        {colors.map((color, index) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onSelect(index)}
            aria-label={color.name}
            aria-pressed={index === selected}
            title={color.name}
            className={cn(
              "size-7 rounded-full border-2 transition-all",
              index === selected
                ? "border-redline ring-2 ring-redline/30"
                : "border-border hover:border-steel",
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
