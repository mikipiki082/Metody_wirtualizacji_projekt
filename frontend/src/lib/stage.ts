import type { CSSProperties } from "react";
import type { ImageGeometry, VehicleType } from "@/types/vehicle";

const vehicleWidth: Record<VehicleType, number> = {
  car: 0.8,
  bike: 0.4,
};

const stageRatio = 9 / 16;
const reflectionRoom = 0.25;

const percent = (value: number) => `${(value * 100).toFixed(2)}%`;

export function stageStyle(geometry: ImageGeometry, type: VehicleType) {
  const { w, h, xl, yl, xr, yr } = geometry;
  const width = vehicleWidth[type];
  const scale = width / stageRatio / w;

  const slope = (yr - yl) / (xr - xl);
  const offset = yl - slope * xl;
  const angle = Math.atan(slope);
  const diagonal =
    w * Math.abs(Math.sin(angle)) + h * Math.abs(Math.cos(angle));
  const fade = Math.min(0.45 * h, reflectionRoom / scale);
  const maskStart =
    ((xl - w / 2) * Math.sin(angle) - (yl - h / 2) * Math.cos(angle)) /
      diagonal +
    0.5;
  const maskEnd = maskStart + fade / diagonal;

  return {
    "--ar": `${w} / ${h}`,
    "--xl": percent(xl / w),
    "--yl": percent(yl / h),
    "--xr": percent(xr / w),
    "--yr": percent(yr / h),
    "--ka": String(2 * slope),
    "--kb": String((2 * offset) / h),
    "--kbl": String((2 * yl) / h),
    "--th": `${((angle * 180) / Math.PI).toFixed(2)}deg`,
    "--m0": percent(maskStart),
    "--m1": percent(maskEnd),
    "--xm": percent((xl + xr) / 2 / w),
    "--ym": percent((yl + yr) / 2 / h),
    "--wrear": `${(((xr - xl) / w) * 100 + 14).toFixed(1)}%`,
    "--vw": percent(width),
    "--vt": `calc(var(--floor) - ${percent(yl * scale)})`,
  } as CSSProperties;
}
