export type VehicleType = "car" | "bike";

export type Spec = {
  label: string;
  value: string;
};

export type Rating = {
  label: string;
  value: number;
};

export type ImageGeometry = {
  w: number;
  h: number;
  xl: number;
  yl: number;
  xr: number;
  yr: number;
};

export type VehicleColor = {
  name: string;
  hex: string;
  imageUrl: string | null;
  geometry: ImageGeometry | null;
};

export type Vehicle = {
  id: number;
  type: VehicleType;
  brand: string;
  model: string;
  category: string;
  year: number;
  description: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string | null;
  colors: VehicleColor[];
  specs: Spec[];
  ratings: Rating[];
};

export type VehicleInput = {
  type: VehicleType;
  brand: string;
  model: string;
  category: string;
  year: number;
  description: string;
  pricePerDay: number;
  available: boolean;
};
