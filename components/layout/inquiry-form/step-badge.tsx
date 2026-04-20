import { classNames } from "./utils";

export function StepBadge({
  index,
  title,
  description,
  active,
  complete,
}: {
  index: number;
  title: string;
  description: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={classNames(
        "rounded-[1.35rem] border p-4 transition-all duration-300",
        active
          ? "border-accent bg-white shadow-[0_20px_60px_rgba(49,40,33,0.08)]"
          : "border-line bg-surface",
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={classNames(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
            active || complete
              ? "bg-accent text-white"
              : "bg-surface-muted text-text",
          )}
        >
          {complete ? "✓" : index + 1}
        </div>
        <div>
          <p className="m-0 text-sm font-semibold">{title}</p>
          <p className="m-0 text-xs text-text-soft">{description}</p>
        </div>
      </div>
    </div>
  );
}
