import { InquiryForm } from "@/components/layout/inquiry-form";
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
      <p className="m-0 text-accent font-display text-[clamp(1.6rem,4vw,2.2rem)] uppercase tracking-[0.16em] font-bold mb-5">
        Event Inquiry
      </p>
      <InquiryForm />
    </div>
  );
}

export default InquiryPage;
