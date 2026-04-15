type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <div
      className={["fade-in", className].filter(Boolean).join(" ")}
      style={{ ["--delay" as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}
