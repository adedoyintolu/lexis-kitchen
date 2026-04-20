export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-line bg-white p-5 md:p-6 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
      <div className="grid gap-2 mb-5">
        <h3 className="m-0 font-display text-[1.8rem] leading-[0.95] tracking-[-0.02em]">
          {title}
        </h3>
        <p className="m-0 text-text-soft leading-7">{description}</p>
      </div>
      {children}
    </section>
  );
}
