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
import type { Metadata } from "next";

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
      <div className="min-h-screen">
        <SiteHeader />
        <main>
          {/* Hero */}
          <section className="py-9 md:py-14">
            <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-6">
              <FadeIn className="rounded-[1.75rem] p-[1.4rem] border border-line bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
                <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                  Lexi&apos;s Kitchen Catering
                </p>
                <h1 className="mt-2 mb-4 font-display text-[clamp(3rem,10vw,6.2rem)] leading-[0.95] tracking-[-0.03em]">
                  Elegant event catering for intimate tastings, polished
                  corporate tables, and memorable celebrations.
                </h1>
                <p className="m-0 mb-[1.4rem] text-text-soft leading-[1.7]">
                  A fast, mobile-first inquiry experience for guests planning
                  events, requesting pricing, booking a food tasting, or
                  reviewing menu options before they reach out.
                </p>
                <CtaGroup />
                <div className="mt-4">
                  <InquiryHighlights />
                </div>
              </FadeIn>
              <FadeIn delay={0.12}>
                <div className="h-full rounded-[1.75rem] p-[1.4rem] grid gap-5 border border-line bg-surface [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
                  <p className="m-0 text-accent-soft uppercase tracking-[0.16em] text-[0.75rem] font-bold">
                    At a glance
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-[0.35rem] p-4 rounded-[1.2rem] bg-surface-strong border border-line">
                      <span className="text-[1.45rem] font-bold">4</span>
                      <span className="text-text-soft">
                        Primary service styles
                      </span>
                    </div>
                    <div className="grid gap-[0.35rem] p-4 rounded-[1.2rem] bg-surface-strong border border-line">
                      <span className="text-[1.45rem] font-bold">$35+</span>
                      <span className="text-text-soft">
                        Formal buffet starting point
                      </span>
                    </div>
                    <div className="grid gap-[0.35rem] p-4 rounded-[1.2rem] bg-surface-strong border border-line">
                      <span className="text-[1.45rem] font-bold">$55+</span>
                      <span className="text-text-soft">
                        Plated dinner starting point
                      </span>
                    </div>
                    <div className="grid gap-[0.35rem] p-4 rounded-[1.2rem] bg-surface-strong border border-line">
                      <span className="text-[1.45rem] font-bold">40-80</span>
                      <span className="text-text-soft">
                        Abula on the spot guest range
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-[0.15rem] text-[0.95rem] text-text-soft">
                    <p className="m-0">{businessInfo.shortAddress}</p>
                    <p className="m-0">{businessInfo.serviceArea}</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-18">
            <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto">
              <SectionHeading
                eyebrow="Service styles"
                title="A structured offering your guests can understand quickly"
                description="Each service style below is hardcoded from your current offering so you can update prices, rules, and copy in one place later."
              />
              <ServiceCollection items={serviceStyles} />
            </div>
          </section>

          {/* Pricing */}
          <section
            id="pricing"
            className="py-18 bg-[rgba(255,255,255,0.45)] border-t border-b border-line"
          >
            <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
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

          {/* Process + Inquiry */}
          <section id="process" className="py-18">
            <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto grid gap-6 md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
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
