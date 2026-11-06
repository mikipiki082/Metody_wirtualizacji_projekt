import { VehicleDetails } from "@/components/vehicle-details";

export default async function BikePage({ params }: PageProps<"/rowery/[id]">) {
  const { id } = await params;
  return <VehicleDetails id={Number(id)} type="bike" />;
}
