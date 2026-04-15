import { SectionHeading } from "@/components/section-heading";
import { FadeIn, SiteFooter, SiteHeader } from "@/components/site-sections";
import { pricingCategories } from "@/data/inquiry";
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
    <div className="min-h-screen">
      <SiteHeader />
      <main className="py-[4.5rem]">
        <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
          <SectionHeading
            eyebrow="Pricing guide"
            title="Per-guest packages and pan pricing in one place"
            description="This page is organized from your current inquiry flow so updates can happen inside the shared data file rather than inside the UI."
          />
          <div className="grid gap-4">
            {pricingCategories.map((category, index) => (
              <FadeIn
                key={category.slug}
                className="rounded-[1.45rem] p-[1.2rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]"
                delay={index * 0.06}
              >
                <div className="grid gap-[0.7rem] mb-4">
                  <div>
                    <p className="m-0 text-[color:var(--color-accent-soft)] uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                      {category.label}
                    </p>
                    <h2 className="m-0 font-[family-name:var(--font-display)] text-[clamp(1.8rem,5vw,2.8rem)] leading-[0.95] tracking-[-0.03em]">
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-[color:var(--color-text-soft)] leading-[1.7]">
                    {category.description}
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[42rem]">
                    <thead>
                      <tr>
                        <th className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] text-[color:var(--color-text-soft)] font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                          Item
                        </th>
                        <th className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] text-[color:var(--color-text-soft)] font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                          Large pan
                        </th>
                        <th className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] text-[color:var(--color-text-soft)] font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                          Small pan
                        </th>
                        <th className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] text-[color:var(--color-text-soft)] font-bold uppercase tracking-[0.12em] text-[0.73rem] align-top">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.name}>
                          <td className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] align-top">
                            {item.name}
                          </td>
                          <td className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] align-top">
                            {item.largePackPrice
                              ? `${item.largePackPrice}`
                              : "N/A"}
                          </td>
                          <td className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] align-top">
                            {item.smallPackPrice
                              ? `${item.smallPackPrice}`
                              : "N/A"}
                          </td>
                          <td className="text-left px-4 py-[0.9rem] border-b border-[color:var(--color-line)] align-top">
                            {item.note ?? "Standard pan pricing"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
