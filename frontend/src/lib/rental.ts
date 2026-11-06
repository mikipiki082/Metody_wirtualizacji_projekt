import { plural } from "@/lib/vehicles";

const dayFormat = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
});

const yearFormat = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function toIsoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return undefined;
  }
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function rentalDays(from: string, to: string) {
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  if (!start || !end || end < start) {
    return 0;
  }
  return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
}

export function formatDays(count: number) {
  return `${count} ${plural(count, "doba", "doby", "dób")}`;
}

export function formatRange(from: string, to: string, withYear = false) {
  const format = withYear ? yearFormat : dayFormat;
  const start = parseIsoDate(from);
  const end = parseIsoDate(to);
  if (!start) {
    return "";
  }
  return end
    ? `${format.format(start)} - ${format.format(end)}`
    : `od ${format.format(start)}`;
}
