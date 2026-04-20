import { formatCurrency } from "@/lib/inquiry-estimate";
import { PricingCategory } from "@/types/inquiry";
import { QuantityButton } from "./quantity-button";

export function PickupCategoryBlock({
  category,
  quantities,
  onChange,
}: {
  category: PricingCategory;
  quantities: Record<string, number>;
  onChange: (key: string, quantity: number) => void;
}) {
  return (
    <div className="grid gap-4">
      <div>
        <p className="m-0 text-lg font-semibold">{category.label}</p>
        <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
          {category.description}
        </p>
      </div>
      <div className="grid gap-3">
        {category.items.map((item) => {
          const key = `${category.slug}:${item.name}`;
          const quantity = quantities[key] ?? 0;

          return (
            <div
              key={key}
              className="rounded-[1.15rem] border border-line bg-white p-4 md:flex md:items-center md:justify-between"
            >
              <div className="mb-4 md:mb-0">
                <p className="m-0 font-semibold capitalize">{item.name}</p>
                <p className="m-0 mt-2 text-sm text-text-soft">
                  {formatCurrency(item.largePackPrice ?? 0)} per large pan
                </p>
              </div>
              <div className="flex items-center gap-3">
                <QuantityButton
                  ariaLabel={`Decrease ${item.name}`}
                  onClick={() => onChange(key, Math.max(quantity - 1, 0))}
                  disabled={quantity === 0}
                >
                  -
                </QuantityButton>
                <input
                  className="h-12 w-20 rounded-full border border-line bg-surface text-center"
                  type="number"
                  min="0"
                  max="20"
                  value={quantity}
                  onChange={(event) =>
                    onChange(key, Math.max(Number(event.target.value) || 0, 0))
                  }
                />
                <QuantityButton
                  ariaLabel={`Increase ${item.name}`}
                  onClick={() => onChange(key, quantity + 1)}
                >
                  +
                </QuantityButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
