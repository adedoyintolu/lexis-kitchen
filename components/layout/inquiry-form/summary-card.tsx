import { inquiryServiceOptions } from "@/data/inquiry";
import { buildInquiryEstimate, formatCurrency } from "@/lib/inquiry-estimate";
import { InquiryFormValues } from "@/types/inquiry";
import { useMemo } from "react";
import { SummaryRow } from "./summary-row";

export function SummaryCard({ values }: { values: InquiryFormValues }) {
  const estimate = useMemo(() => buildInquiryEstimate(values), [values]);
  const selectedService = inquiryServiceOptions.find(
    (option) => option.slug === values.serviceStyle,
  );
  const selectedVariant = selectedService?.variants?.find(
    (variant) => variant.slug === values.serviceVariant,
  );

  return (
    <aside className="overflow-hidden rounded-[1.75rem] border border-line bg-accent text-white shadow-[0_24px_70px_rgba(49,40,33,0.2)] md:sticky md:top-24">
      <div className="border-b border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 text-xs uppercase tracking-[0.18em] text-white/60">
            Planning estimate
          </p>
          <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            Live
          </span>
        </div>
      </div>

      <div className="border-b border-white/10 px-5 py-5">
        <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
          Current total
        </p>
        <p className="m-0 mt-3 font-display text-[3rem] leading-[0.88] tracking-[-0.03em]">
          {formatCurrency(estimate.subtotal)}
        </p>
        <p className="m-0 mt-3 text-sm leading-6 text-white/75">
          A quick planning estimate based on the current selections and pricing
          variables.
        </p>
        {estimate.minimumApplied ? (
          <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/55">
              Minimum applied
            </p>
            <p className="m-0 mt-2 text-sm leading-6 text-white/80">
              Service minimums increased this estimate based on the current
              selection.
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 border-b border-white/10 px-5 py-5">
        <SummaryRow
          label="Service"
          value={
            selectedVariant
              ? selectedVariant.title
              : selectedService?.title || "Select one"
          }
        />
        <SummaryRow
          label="Guests"
          value={values.guestCount ? `${values.guestCount} guests` : "Not set"}
        />
        <SummaryRow label="Event date" value={values.eventDate || "Not set"} />
        <SummaryRow label="Venue" value={values.venue || "Not set"} />
      </div>

      <div className="border-b border-white/10 px-5 py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
            Cost breakdown
          </p>
          <span className="text-xs text-white/40">
            {estimate.lineItems.length} line
            {estimate.lineItems.length === 1 ? "" : "s"}
          </span>
        </div>
        {estimate.lineItems.length > 0 ? (
          <div className="grid gap-3">
            {estimate.lineItems.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 rounded-[1rem] border border-white/8 bg-white/6 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-white/75">{item.label}</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                {item.detail ? (
                  <p className="m-0 text-xs leading-5 text-white/45">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm leading-6 text-white/60">
            Choose a service style and guest count to see the estimate fill in.
          </p>
        )}
      </div>

      <div className="px-5 py-5">
        <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
          Planning notes
        </p>
        <ul className="m-0 mt-3 list-none p-0 grid gap-2">
          {estimate.assumptions.map((assumption) => (
            <li
              key={assumption}
              className="rounded-[0.95rem] border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white/70"
            >
              {assumption}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
