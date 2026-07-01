import Button from "@/components/common/button";
import { FadeIn } from "@/components/common/fade-in";
import { PricingBreakdown } from "@/components/layout/pricing-breakdown";
import { SectionHeading } from "@/components/layout/section-heading";
import { businessInfo } from "@/data/inquiry";
import {
  additionalChargesMatrix,
  basePackageMeaning,
  venueBasePackagesTable,
  importantThingsToKnow,
  pricingDefinitions,
  pricingPageIntro,
  servicePricingDetails,
  whyWeUseMinimums,
  venueServicePricingDetails,
} from "@/data/pricing-page";
import { buildMetadata } from "@/lib/metadata";
import { routes } from "@/routes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Venue Client Pricing",
  description:
    "Review Lexi's Kitchen venue client pricing with service breakdowns, base packages, additional charge rules, and detailed menu pricing.",
  path: "/venue-client-pricing",
});

export default function VenueClientPricingPage() {
  return (
    <div className="py-16 md:py-18">
      <div className="mx-auto w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)]">
        <section className="mb-12">
          <SectionHeading
            eyebrow={pricingPageIntro.eyebrow}
            title="Venue Client Pricing"
            description={pricingPageIntro.description}
          />
          <FadeIn className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)] md:p-7">
            <p className="m-0 max-w-3xl text-sm leading-7 text-text-soft md:text-base">
              {pricingPageIntro.supportingText}
            </p>
            <p className="m-0 mt-4 text-sm leading-7 text-text-soft md:text-base">
              You are never limited to these selections. You may always add more
              items, and your estimate updates automatically as you make
              selections.
            </p>
          </FadeIn>
        </section>

        <section className="mb-12">
          <SectionHeading
            eyebrow="Key pricing definitions"
            title="The breakdown behind every estimate"
            description="This section mirrors the live page structure your client referenced: food spend, setup fees, and service charges are represented separately so the page reads like a real pricing guide."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {pricingDefinitions.map((definition, index) => (
              <FadeIn
                key={definition.title}
                delay={index * 0.05}
                className="rounded-[1.45rem] border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)]"
              >
                <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
                  Definition
                </p>
                <h2 className="m-0 mt-2 text-xl font-semibold">
                  {definition.title}
                </h2>
                <p className="m-0 mt-3 text-sm leading-7 text-text-soft">
                  {definition.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-4">
          <FadeIn className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)] md:p-7">
            <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
              What a base package means
            </p>
            <p className="m-0 mt-4 text-base font-semibold">
              {basePackageMeaning.intro}
            </p>
            <ul className="m-0 mt-4 grid gap-2 pl-5 text-sm leading-7 text-text-soft list-disc">
              {basePackageMeaning.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <p className="m-0 mt-5 text-sm leading-7 text-text-soft">
              {basePackageMeaning.note}
            </p>
          </FadeIn>
        </section>

        <section className="mb-12">
          <SectionHeading
            eyebrow="Base packages"
            title="Service styles, minimums, and what each package includes"
            description="The live page uses a dedicated package table, so this version does too. It keeps the service breakdown visible before the detailed menu pricing."
          />
          <FadeIn className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
            <div className="hidden overflow-x-auto md:block">
              <PricingBreakdown venue={true} />
            </div>

            <div className="grid gap-3 p-4 md:hidden">
              {venueBasePackagesTable.map((item) => (
                <div
                  key={item.serviceStyle}
                  className="rounded-[1.2rem] border border-line bg-surface p-4"
                >
                  <p className="m-0 text-base font-semibold">
                    {item.serviceStyle}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm leading-6 text-text-soft">
                    <p className="m-0">
                      <span className="font-semibold text-text-main">
                        Food spend minimum:
                      </span>{" "}
                      {item.foodSpendMinimum}
                    </p>
                    <p className="m-0">
                      <span className="font-semibold text-text-main">
                        Guest requirement:
                      </span>{" "}
                      {item.guestRequirement}
                    </p>
                    <p className="m-0">
                      <span className="font-semibold text-text-main">
                        Package includes:
                      </span>{" "}
                      {item.packageIncludes}
                    </p>
                    <p className="m-0">
                      <span className="font-semibold text-text-main">
                        Setup fee:
                      </span>{" "}
                      {item.setupFee}
                    </p>
                    <p className="m-0">
                      <span className="font-semibold text-text-main">
                        Service charge:
                      </span>{" "}
                      {item.serviceCharge}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="mb-12">
          <SectionHeading
            eyebrow="Detailed breakdown"
            title="Service and pricing breakdown"
            description=""
          />
          <div className="grid gap-4">
            {venueServicePricingDetails.map((detail, index) => (
              <FadeIn
                key={detail.title}
                delay={index * 0.04}
                className="rounded-3xl border border-line bg-white shadow-[0_20px_60px_rgba(49,40,33,0.08)]"
              >
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 md:px-7">
                    <div>
                      <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
                        Service style
                      </p>
                      <h2 className="m-0 mt-2 text-xl font-semibold">
                        {detail.title}
                      </h2>
                      <p className="m-0 mt-3 max-w-3xl text-sm leading-7 text-text-soft">
                        {detail.summary}
                      </p>
                    </div>
                    <span className="mt-1 text-sm font-semibold text-accent-soft transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="grid gap-3 border-t border-line px-5 py-5 md:px-7">
                    {detail.sections.map((section) => (
                      <div
                        key={section.title}
                        className="rounded-[1.1rem] border border-line bg-surface p-4"
                      >
                        <p className="m-0 text-sm font-semibold">
                          {section.title}
                        </p>
                        <p className="m-0 mt-2 text-sm leading-7 text-text-soft">
                          {section.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading
            eyebrow="Additional charges"
            title="Charges explained"
            description="This matrix keeps the non-food costs visible, just like the reference page, so clients understand what is and is not included in food spend."
          />
          <FadeIn className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
                      Charge type
                    </th>
                    <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
                      Applies when
                    </th>
                    <th className="border-b border-line px-4 py-4 text-left text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
                      Included in food spend
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {additionalChargesMatrix.map((item) => (
                    <tr key={item.chargeType}>
                      <td className="border-b border-line px-4 py-4 align-top font-medium">
                        {item.chargeType}
                      </td>
                      <td className="border-b border-line px-4 py-4 align-top text-text-soft">
                        {item.appliesWhen}
                      </td>
                      <td className="border-b border-line px-4 py-4 align-top text-text-soft">
                        {item.includedInFoodSpend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-3 p-4 md:hidden">
              {additionalChargesMatrix.map((item) => (
                <div
                  key={item.chargeType}
                  className="rounded-[1.2rem] border border-line bg-surface p-4"
                >
                  <p className="m-0 text-base font-semibold">
                    {item.chargeType}
                  </p>
                  <p className="m-0 mt-3 text-sm leading-6 text-text-soft">
                    <span className="font-semibold text-text-main">
                      Applies when:
                    </span>{" "}
                    {item.appliesWhen}
                  </p>
                  <p className="m-0 mt-2 text-sm leading-6 text-text-soft">
                    <span className="font-semibold text-text-main">
                      Included in food spend:
                    </span>{" "}
                    {item.includedInFoodSpend}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        <section className="mb-12 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <FadeIn className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)] md:p-7">
            <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
              Important things to know
            </p>
            <ul className="m-0 mt-4 grid gap-2 pl-5 text-sm leading-7 text-text-soft list-decimal">
              {importantThingsToKnow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="rounded-3xl border border-line bg-surface p-5 md:p-7">
            <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-accent-soft">
              Why we use minimums
            </p>
            <p className="m-0 mt-4 text-sm leading-7 text-text-soft">
              Minimums help us provide accurate estimates before final
              proposals.
            </p>
            <ul className="m-0 mt-4 grid gap-2 pl-5 text-sm leading-7 text-text-soft list-disc">
              {whyWeUseMinimums.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="m-0 mt-5 text-sm leading-7 text-text-soft">
              If you have any questions: contact us via <br />
              Email:{" "}
              <a
                href={`mailto: ${businessInfo.email}`}
                className="text-blue-800!"
                target="_blank"
                rel="noreferrer"
              >
                {businessInfo.email}
              </a>
              <br />
              Instagram:{" "}
              <a
                href="https://www.instagram.com/lexxiskitchen"
                className="text-blue-800!"
                target="_blank"
                rel="noreferrer"
              >
                @lexxiskitchen
              </a>
              <br />
              Visit our website:{" "}
              <a
                href="https://lexkitchen.com/"
                className="text-blue-800!"
                target="_blank"
                rel="noreferrer"
              >
                Lexis Kitchen Website
              </a>
            </p>
          </FadeIn>
        </section>

        <Link href="https://lexkitchen.com/contact-us/">
          <Button className="w-full!" variant="primary">
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  );
}
