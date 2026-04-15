type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-[0.9rem] mb-8">
      <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
        {eyebrow}
      </p>
      <h2 className="m-0 font-display text-[clamp(2.2rem,8vw,4.2rem)] leading-[0.95] tracking-[-0.03em]">
        {title}
      </h2>
      <p className="text-text-soft leading-[1.7]">{description}</p>
    </div>
  );
}
