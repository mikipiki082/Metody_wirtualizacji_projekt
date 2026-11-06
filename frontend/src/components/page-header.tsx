import { Fog } from "@/components/fog";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
};

export function PageHeader({ eyebrow, title, lead }: Props) {
  return (
    <section className="@container relative isolate overflow-hidden border-b border-border px-4 pt-14 pb-12 sm:px-8 lg:px-12 lg:pt-20 2xl:px-20">
      <div className="absolute inset-0 -z-10 bg-[url(/hero-mgla.webp)] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <Fog className="-z-10" />
      <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-display text-[length:clamp(1.5rem,7cqi,3.75rem)] uppercase">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
        {lead}
      </p>
    </section>
  );
}
