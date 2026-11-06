const steps = [
  {
    title: "Wybierz pojazd",
    text: "Przejrzyj samochody i rowery, porównaj parametry i sprawdź, co jest dostępne od ręki.",
  },
  {
    title: "Zarezerwuj termin",
    text: "Napisz albo zadzwoń. Potwierdzimy rezerwację i prześlemy umowę do podpisu online.",
  },
  {
    title: "Odbierz kluczyki",
    text: "W naszej siedzibie w Poznaniu albo z dostawą pod wskazany adres.",
  },
  {
    title: "Jedź i oddaj",
    text: "Zwracasz pojazd w umówionym miejscu. Mycie i drobne formalności bierzemy na siebie.",
  },
];

export function RentalSteps() {
  return (
    <ol className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-3 bg-card p-6 sm:p-8">
          <span className="font-display text-4xl font-extrabold text-redline">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans text-xl font-bold uppercase">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-steel">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
