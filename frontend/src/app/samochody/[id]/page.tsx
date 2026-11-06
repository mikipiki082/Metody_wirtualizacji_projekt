import { VehicleDetails } from "@/components/vehicle-details";

export default async function CarPage({
  params,
}: PageProps<"/samochody/[id]">) {
  const { id } = await params;
  return <VehicleDetails id={Number(id)} type="car" />;
}
