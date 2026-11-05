import { VehicleList } from "@/components/vehicle-list";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-12">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">
          Wypożyczalnia rowerów i samochodów
        </h1>
        <p className="text-muted-foreground">
          Lista pojazdów pobierana z backendu (Express) w formacie JSON, dane z
          bazy PostgreSQL.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Pojazdy</h2>
        <VehicleList />
      </section>
    </main>
  );
}
