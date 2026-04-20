import { classNames } from "./utils";

export function ServiceCard({
  title,
  description,
  priceLabel,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  priceLabel: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "w-full rounded-[1.35rem] border p-4 text-left transition-all duration-300 hover:-translate-y-px",
        selected
          ? "border-accent bg-accent text-white shadow-[0_20px_60px_rgba(49,40,33,0.16)]"
          : "border-line bg-surface hover:bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="m-0 text-lg font-semibold">{title}</p>
          <p
            className={classNames(
              "m-0 mt-2 text-sm leading-6",
              selected ? "text-white/80" : "text-text-soft",
            )}
          >
            {description}
          </p>
        </div>
        <span
          className={classNames(
            "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
            selected
              ? "bg-white/15 text-white"
              : "bg-surface-muted text-text-soft",
          )}
        >
          {priceLabel}
        </span>
      </div>
      <span
        className={classNames(
          "text-xs uppercase tracking-[0.16em]",
          selected ? "text-white/70" : "text-accent-soft",
        )}
      >
        Tap to select
      </span>
    </button>
  );
}
