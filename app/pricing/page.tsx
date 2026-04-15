import { FadeIn } from "@/components/common/fade-in";
import { SectionHeading } from "@/components/layout/section-heading";
import { pricingCategories } from "@/data/pricing";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Review Lexi's Kitchen catering pricing for event service styles, per-guest packages, and pan-based menu items.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="py-18">
      <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
        <SectionHeading
          eyebrow="Pricing guide"
          title="How Our Pricing System Works"
          description="We use a per-guest pricing model for most catered events. This allows us to scale food production, staffing, and service consistently with your needs while maintaining quality and maximizing your budget. Each service style includes a base package. The base package sets the minimum food spend, includes a specific number of menu selections, and is tied to a baseline guest count when applicable. You are never limited to these selections. You may always add more items. Your estimate updates automatically as you make selections."
        />
        <div className="grid gap-4 mb-8">
          {pricingCategories.map((category, index) => (
            <FadeIn
              key={category.slug}
              className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
              delay={index * 0.06}
            >
              <div className="grid gap-[0.7rem] mb-4">
                <div>
                  <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                    {category.label}
                  </p>
                  <h2 className="m-0 font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] tracking-[-0.03em]">
                    {category.title}
                  </h2>
                </div>
                <p className="text-text-soft leading-[1.7]">
                  {category.description}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-2xl">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-[0.9rem] border-b border-line text-text-soft font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                        Item
                      </th>
                      <th className="text-left px-4 py-[0.9rem] border-b border-line text-text-soft font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                        Large pan
                      </th>
                      <th className="text-left px-4 py-[0.9rem] border-b border-line text-text-soft font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                        Small pan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item) => (
                      <tr key={item.name}>
                        <td className="text-left px-4 py-[0.9rem] border-b border-line align-top capitalize">
                          {item.name}
                        </td>
                        <td className="text-left px-4 py-[0.9rem] border-b border-line align-top">
                          {item.largePackPrice
                            ? `${item.largePackPrice.toLocaleString("en-US", {
                                currency: "USD",
                                style: "currency",
                                minimumFractionDigits: 2,
                              })}`
                            : "N/A"}
                        </td>
                        <td className="text-left px-4 py-[0.9rem] border-b border-line align-top">
                          {item.smallPackPrice
                            ? `${item.smallPackPrice.toLocaleString("en-US", {
                                currency: "USD",
                                style: "currency",
                                minimumFractionDigits: 2,
                              })}`
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="grid gap-[0.9rem] mb-8">
            <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
              Additional information
            </p>
            <h2 className="m-0 font-display text-[clamp(2.2rem,6vw,3.2rem)] leading-[0.95] tracking-[-0.03em]">
              Important Things to Know
            </h2>
            <ul className="rounded-[1.45rem] p-[1.2rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] gap-3 flex flex-col">
              <li>
                <strong>Service Charge:</strong> 25% of the total payment.
              </li>
              <li>
                <strong>Tax:</strong> No tax applied.
              </li>
              <li>
                <strong>Setup Fee: </strong> $450 flat rate (waived for
                &quot;Passed&quot; service).
              </li>
              <li>
                <strong>Staffing Rate:</strong> $20 per wait staff member.
              </li>
              <li>
                <strong>Staffing Requirements:</strong>
                <ul>
                  <li>30 – 50 guests: 2 wait staff.</li>
                  <li>Every 25 additional guests: +2 wait staff.</li>
                </ul>
              </li>
              <li>
                <strong>Pickup Days:</strong> Available Fridays and Saturdays.
              </li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
