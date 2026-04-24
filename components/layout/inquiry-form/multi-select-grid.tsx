import { formatCurrency } from "@/lib/inquiry-estimate";
import { useState } from "react";
import { classNames, FieldError } from "./utils";

export function MultiSelectGrid({
  title,
  description,
  items,
  selected,
  onToggle,
  error,
  pricingModel,
  includedCount,
}: {
  title: string;
  description: string;
  items: { name: string; largePackPrice?: number; premium?: boolean }[];
  selected: string[];
  onToggle: (itemName: string) => void;
  error?: string;
  pricingModel: "per-guest" | "per-pan";
  includedCount?: number;
}) {
  const extraCount = Math.max(selected.length - (includedCount ?? 0), 0);
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 text-lg font-semibold">{title}</p>
          <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-soft">
            {selected.length} selected
          </span>
          {typeof includedCount === "number" ? (
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-soft">
              {includedCount} included
            </span>
          ) : null}
          {extraCount > 0 ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              {extraCount} add-on{extraCount > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>
      </div>
      <div>
        <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
          Tap any card to add or remove it from this inquiry.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.name);

          return (
            <button
              type="button"
              key={item.name}
              onClick={() => onToggle(item.name)}
              className={classNames(
                "rounded-[1.15rem] border p-4 text-left transition-all duration-300 hover:-translate-y-px",
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white hover:bg-surface",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="m-0 font-semibold capitalize">{item.name}</p>
                    {item.premium ? (
                      <div className="relative">
                        <span
                          onMouseEnter={() => setTooltip(item.name)}
                          onMouseLeave={() => setTooltip(null)}
                          className={classNames(
                            "cursor-default rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide",
                            isSelected
                              ? "bg-white/20 text-white"
                              : "bg-amber-100 text-amber-700",
                          )}
                        >
                          Premium
                        </span>
                        {tooltip === item.name ? (
                          <div className="absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-xl border border-line bg-white px-3 py-2 text-xs leading-5 text-text-soft shadow-lg">
                            This is a premium-priced item and will be charged as
                            an add-on at the listed rate.
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <p
                    className={classNames(
                      "m-0 mt-2 text-sm",
                      isSelected ? "text-white/80" : "text-text-soft",
                    )}
                  >
                    {item.largePackPrice
                      ? pricingModel === "per-guest"
                        ? `${formatCurrency(item.largePackPrice)} per guest when added`
                        : `${formatCurrency(item.largePackPrice)} per large pan when added`
                      : "Price on request"}
                  </p>
                </div>
                <span
                  className={classNames(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                    isSelected
                      ? "border-white text-white"
                      : "border-line text-text-soft",
                  )}
                >
                  {isSelected ? "✓" : "+"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <FieldError error={error} variant="bold" />
    </div>
  );
}
