import { informationStepFields } from "@/data/inquiry";
import React from "react";
import { SectionHeading } from "../../section-heading";
import { SectionCard } from "../section-card";

const InformationStep = () => {
  return (
    <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
      <SectionCard
        title="Pricing, services, and policies"
        description="Brief information about our service styles, pricing, and policies to help you understand how we work and what to expect in the next steps."
      >
        <div className="flex items-center gap-3 flex-wrap">
          {informationStepFields.map((field, index) => (
            <React.Fragment key={index}>
              <SectionHeading
                eyebrow={field.title}
                description={field.content}
                title=""
              />
              {index < informationStepFields.length - 1 ? (
                <div className="bg-line h-[0.1px] w-full mb-6" />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default InformationStep;
