import { inquiryServiceOptions } from "@/data/inquiry";
import { buildInquiryEstimate, formatCurrency } from "@/lib/inquiry-estimate";
import { InquiryFormValues } from "@/types/inquiry";
import { SummaryRow } from "./summary-row";

export function SummaryCard({ values }: { values: InquiryFormValues }) {
  const estimate = buildInquiryEstimate(values);
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
        {values.budget && estimate.subtotal > values.budget ? (
          <div className="mt-4 rounded-2xl border border-danger/30 bg-danger/40 px-4 py-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-red-300">
              Over budget
            </p>
            <p className="m-0 mt-2 text-sm leading-6 text-white/80">
              This estimate exceeds your specified budget of{" "}
              {formatCurrency(values.budget)}.
            </p>
          </div>
        ) : null}
        {estimate.minimumApplied && values.serviceStyle !== "nibbles-only" ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/8 px-4 py-3 grid gap-2">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/55">
              Package minimums
            </p>
            {(
              [
                {
                  label: "Nibbles",
                  selected: values.selectedNibbles?.length ?? 0,
                  required: 4,
                },
                {
                  label: "Mains",
                  selected: values.selectedRegularMains?.length ?? 0,
                  required: 2,
                },
                {
                  label: "Proteins",
                  selected: values.selectedProteins?.length ?? 0,
                  required: 2,
                },
                {
                  label: "Sides",
                  selected: values.selectedSides?.length ?? 0,
                  required: 2,
                },
              ] as const
            ).map(({ label, selected, required }) => (
              <div key={label}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs text-white/60">{label}</span>
                  <span className="text-xs font-semibold text-white/70">
                    {selected} / {required}
                  </span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((selected / required) * 100, 100)}%`,
                      backgroundColor:
                        selected >= required
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(255,255,255,0.25)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 border-b border-white/10 px-5 py-5">
        <SummaryRow
          label="Service"
          value={
            selectedVariant
              ? `${selectedService?.title} - ${selectedVariant.title}`
              : selectedService?.title || "Select one"
          }
        />
        {(selectedVariant?.setupFee || selectedService?.setupFee) && (
          <SummaryRow
            label="Setup Fee"
            value={
              selectedVariant?.setupFee
                ? formatCurrency(selectedVariant.setupFee)
                : selectedService?.setupFee
                  ? formatCurrency(selectedService.setupFee)
                  : ""
            }
          />
        )}
        <SummaryRow
          label="Guests"
          value={values.guestCount ? `${values.guestCount} guests` : "Not set"}
        />
        <SummaryRow label="Event date" value={values.eventDate || "Not set"} />
        <SummaryRow
          label="Time"
          value={values.startTime + " - " + values.endTime || "Not set"}
        />
        <SummaryRow label="Venue" value={values.venue || "Not set"} />
        <SummaryRow
          label="Budget"
          value={formatCurrency(values.budget || 0) || "Not set"}
        />
        <SummaryRow
          label="Service charge"
          value={formatCurrency(estimate.serviceCharge || 0) || "Not set"}
        />
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
            {estimate.lineItems.map((item, index) => (
              <div
                key={`${item.label}-${item.detail || "no-detail"}-${index}`}
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
