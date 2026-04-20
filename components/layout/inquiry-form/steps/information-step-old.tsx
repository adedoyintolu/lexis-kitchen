import Button from "@/components/common/button";
import { informationStepFields } from "@/data/inquiry";
import { useState } from "react";
import { SectionCard } from "../section-card";

const InformationStep = () => {
  const [selectedStep, setSelectedStep] = useState(0);
  return (
    <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
      <SectionCard
        title="Pricing, services, and policies"
        description="Brief information about our service styles, pricing, and policies to help you understand how we work and what to expect in the next steps."
      >
        <div className="flex items-center gap-3 flex-wrap">
          {informationStepFields.map((field, index) => (
            <Button
              key={index}
              className="h-10 px-3! py-2! font-medium"
              variant={index === selectedStep ? "primary" : "secondary"}
              onClick={() => setSelectedStep(index)}
            >
              {field.title}
            </Button>
          ))}
        </div>
        <div className="p-5 rounded-lg border border-line bg-white mt-5 text-text-soft">
          {informationStepFields[selectedStep].content}
        </div>
      </SectionCard>
    </div>
  );
};

export default InformationStep;
