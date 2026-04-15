type LoadingStateProps = {
  title: string;
  description: string;
};

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="grid gap-[0.9rem] rounded-[1.3rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.72)] p-[1.2rem] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
      <p className="m-0 text-[color:var(--color-accent-soft)] uppercase tracking-[0.16em] text-[0.75rem] font-bold">
        Loading state
      </p>
      <h2 className="m-0 text-[1.2rem]">{title}</h2>
      <p className="text-[color:var(--color-text-soft)] leading-[1.7]">
        {description}
      </p>
      <div className="loading-pulse" />
      <div className="loading-pulse" />
      <div className="loading-pulse" />
    </div>
  );
}
