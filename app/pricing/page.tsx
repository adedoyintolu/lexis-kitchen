import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn, SiteFooter, SiteHeader } from "@/components/site-sections";
import { pricingCategories } from "@/data/inquiry";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pricing",
  description:
    "Review Lexi's Kitchen catering pricing for event service styles, per-guest packages, and pan-based menu items.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="section-block">
        <div className="shell">
          <SectionHeading
            eyebrow="Pricing guide"
            title="Per-guest packages and pan pricing in one place"
            description="This page is organized from your current inquiry flow so updates can happen inside the shared data file rather than inside the UI."
          />
          <div className="pricing-category-stack">
            {pricingCategories.map((category, index) => (
              <FadeIn
                key={category.slug}
                className="pricing-category-card"
                delay={index * 0.06}
              >
                <div className="pricing-category-header">
                  <div>
                    <p className="eyebrow">{category.label}</p>
                    <h2>{category.title}</h2>
                  </div>
                  <p>{category.description}</p>
                </div>
                <div className="pricing-table-wrap">
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Large pan</th>
                        <th>Small pan</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item) => (
                        <tr key={item.name}>
                          <td>{item.name}</td>
                          <td>
                            {item.largePackPrice
                              ? `$${item.largePackPrice}`
                              : "N/A"}
                          </td>
                          <td>
                            {item.smallPackPrice
                              ? `$${item.smallPackPrice}`
                              : "N/A"}
                          </td>
                          <td>{item.note ?? "Standard pan pricing"}</td>
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
