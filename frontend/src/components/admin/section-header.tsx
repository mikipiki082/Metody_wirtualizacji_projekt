type Props = {
  title: string;
  lead: string;
  children?: React.ReactNode;
};

export function SectionHeader({ title, lead, children }: Props) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
      <div className="min-w-0">
        <p className="font-sans text-sm font-bold tracking-[0.18em] text-redline uppercase">
          Panel administratora
        </p>
        <h1 className="mt-1 font-display text-3xl uppercase sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-xl text-steel">{lead}</p>
      </div>
      {children}
    </div>
  );
}
