type LoadingStateProps = {
  title: string;
  description: string;
};

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <div className="state-card">
      <p className="eyebrow">Loading state</p>
      <h2>{title}</h2>
      <p className="form-note">{description}</p>
      <div className="loading-pulse" />
      <div className="loading-pulse" />
      <div className="loading-pulse" />
    </div>
  );
}
