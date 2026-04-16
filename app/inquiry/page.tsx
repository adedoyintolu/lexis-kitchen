import { InquiryForm } from "@/components/inquiry-form";
import { FadeIn } from "@/components/common/fade-in";
import { SectionHeading } from "@/components/layout/section-heading";
import { inquiryServiceOptions } from "@/data/inquiry";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = buildMetadata({
  title: "Inquiry",
  description:
    "Build an inquiry for Lexi's Kitchen by selecting the service style, menu structure, and event details in one guided flow.",
  path: "/inquiry",
});

function InquiryPage() {
  return (
    <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto py-8 md:py-10">
      <div className="grid gap-6 mb-8 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:items-end">
        <SectionHeading
          eyebrow="Event inquiry"
          title="A guided catering inquiry built around how Lexi's Kitchen actually prices"
          description="Choose the service style first, then build the menu with the same package rules your client shared. The estimate updates live so the final handoff feels thoughtful instead of generic."
        />

        <FadeIn className="rounded-[1.6rem] border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
          <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
            Available flows
          </p>
          <div className="grid gap-3 mt-4">
            {inquiryServiceOptions.map((option) => (
              <div
                key={option.slug}
                className="rounded-[1rem] border border-line bg-surface px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">{option.title}</span>
                  <span className="text-xs text-text-soft">{option.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <InquiryForm />
    </div>
  );
}

export default InquiryPage;
