import type { Metadata } from "next";
import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import {
  CtaGroup,
  FadeIn,
  InquiryHighlights,
  InquiryProcess,
  PricingSnapshot,
  ServiceCollection,
  SiteFooter,
  SiteHeader,
  WhatsAppMenuCard,
} from "@/components/site-sections";
import { businessInfo, homepageSeo, serviceStyles } from "@/data/inquiry";
import { buildMetadata } from "@/lib/metadata";
import { buildInquiryJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: homepageSeo.title,
  description: homepageSeo.description,
  path: "/",
});

export default function HomePage() {
  const inquiryJsonLd = buildInquiryJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(inquiryJsonLd) }}
      />
      <div className="page-shell">
        <SiteHeader />
        <main>
          <section className="hero-section">
            <div className="shell hero-grid">
              <FadeIn className="hero-copy">
                <p className="eyebrow">Lexi&apos;s Kitchen Catering</p>
                <h1>
                  Elegant event catering for intimate tastings, polished
                  corporate tables, and memorable celebrations.
                </h1>
                <p className="hero-lead">
                  A fast, mobile-first inquiry experience for guests planning
                  events, requesting pricing, booking a food tasting, or
                  reviewing menu options before they reach out.
                </p>
                <CtaGroup />
                <InquiryHighlights />
              </FadeIn>
              <FadeIn className="hero-panel" delay={0.12}>
                <div className="hero-panel-frame">
                  <p className="panel-label">At a glance</p>
                  <div className="hero-stat-grid">
                    <div className="hero-stat-card">
                      <span className="hero-stat-value">4</span>
                      <span className="hero-stat-label">
                        Primary service styles
                      </span>
                    </div>
                    <div className="hero-stat-card">
                      <span className="hero-stat-value">$35+</span>
                      <span className="hero-stat-label">
                        Formal buffet starting point
                      </span>
                    </div>
                    <div className="hero-stat-card">
                      <span className="hero-stat-value">$55+</span>
                      <span className="hero-stat-label">
                        Plated dinner starting point
                      </span>
                    </div>
                    <div className="hero-stat-card">
                      <span className="hero-stat-value">40-80</span>
                      <span className="hero-stat-label">
                        Abula on the spot guest range
                      </span>
                    </div>
                  </div>
                  <div className="hero-panel-note">
                    <p>{businessInfo.shortAddress}</p>
                    <p>{businessInfo.serviceArea}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          <section id="services" className="section-block">
            <div className="shell">
              <SectionHeading
                eyebrow="Service styles"
                title="A structured offering your guests can understand quickly"
                description="Each service style below is hardcoded from your current offering so you can update prices, rules, and copy in one place later."
              />
              <ServiceCollection items={serviceStyles} />
            </div>
          </section>

          <section id="pricing" className="section-block section-muted">
            <div className="shell section-grid">
              <div>
                <SectionHeading
                  eyebrow="Pricing"
                  title="Clear package starting points and pan pricing"
                  description="Large-pan and small-pan pricing is organized exactly for future edits. Where a dish has one value, it is represented as a single-size offering."
                />
                <PricingSnapshot />
              </div>
              <WhatsAppMenuCard />
            </div>
          </section>

          <section id="process" className="section-block">
            <div className="shell section-grid section-grid-reverse">
              <InquiryProcess />
              <div>
                <SectionHeading
                  eyebrow="Inquiry"
                  title="A polished intake form without backend complexity"
                  description="This submission flow uses structured front-end state, a realistic loading experience, and a success summary so the handoff still feels complete."
                />
                <InquiryForm />
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
