"use client";

import Button from "@/components/common/button";
import { ErrorState } from "@/components/layout/error-state";
import { LoadingState } from "@/components/layout/loading-state";
import { inquiryServiceOptions } from "@/data/inquiry";
import { buildInquiryEstimate } from "@/lib/inquiry-estimate";
import {
  getInitialInquiryValues,
  inquiryStepFields,
  inquiryValidationSchema,
} from "@/lib/inquiry-schema";
import type { InquiryFormValues } from "@/types/inquiry";
import { useFormik } from "formik";
import { useState } from "react";
import { StepBadge } from "./step-badge";
import BuildMenuStep from "./steps/build-menu-step";
import ContactDetailsStep from "./steps/contact-details-step";
import EventDetailsStep from "./steps/event-details-step";
import InformationStep from "./steps/information-step";
import { SummaryCard } from "./summary-card";
import { getStepErrorCount, stepLabels } from "./utils";

export function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const formik = useFormik<InquiryFormValues>({
    initialValues: getInitialInquiryValues(),
    validationSchema: inquiryValidationSchema,
    validateOnMount: false,
    onSubmit: async (values, helpers) => {
      setSubmissionState("loading");
      setSubmissionMessage("");

      try {
        const estimate = buildInquiryEstimate(values);
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            estimate,
          }),
        });

        const result = (await response.json()) as {
          message?: string;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(
            result.error || "Something went wrong while sending the inquiry.",
          );
        }

        setSubmissionState("success");
        setSubmissionMessage(result.message || "Inquiry sent successfully.");
        helpers.resetForm();
        setCurrentStep(0);
      } catch (error) {
        setSubmissionState("error");
        setSubmissionMessage(
          error instanceof Error
            ? error.message
            : "Something went wrong while sending the inquiry.",
        );
      }
    },
  });

  const selectedService = inquiryServiceOptions.find(
    (option) => option.slug === formik.values.serviceStyle,
  );

  const progressPercentage = ((currentStep + 1) / stepLabels.length) * 100;

  const handleNextStep = async () => {
    if (currentStep === 0) {
      // Skip validation for the first step since it's just informational
      setCurrentStep(1);
      return;
    }
    const errors = await formik.validateForm();
    const fields = inquiryStepFields[currentStep];

    fields.forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    if (getStepErrorCount(errors, fields) > 0) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, stepLabels.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const disabledButton = () => {
    if (currentStep === 0) {
      return false;
    }
    const errors = formik.errors;
    const fields = inquiryStepFields[currentStep];

    return getStepErrorCount(errors, fields) > 0;
  };

  if (submissionState === "loading") {
    return (
      <LoadingState
        title="Sending inquiry"
        description="Packaging service selections, estimate details, and contact information."
      />
    );
  }

  if (submissionState === "success") {
    return (
      <div className="grid gap-4 rounded-[1.5rem] border border-success/20 bg-white p-6 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
          Inquiry sent
        </p>
        <h2 className="m-0 font-display text-[2rem] leading-[0.95]">
          Your inquiry is on its way.
        </h2>
        <p className="m-0 text-text-soft leading-7">
          {submissionMessage} We have kept the estimate logic in the app so the
          client gets both the inquiry details and your current pricing
          snapshot.
        </p>
        <div className="rounded-[1.2rem] border border-line bg-surface p-4">
          <p className="m-0 text-sm text-text-soft">
            If you are testing with Mailtrap, check the configured inbox for the
            full HTML and text versions of the submission.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSubmissionState("idle")}
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-white"
          >
            Start another inquiry
          </button>
        </div>
      </div>
    );
  }

  if (submissionState === "error") {
    return (
      <ErrorState
        title="The inquiry could not be delivered"
        description={
          submissionMessage || "Please review the form and try again."
        }
        onRetry={() => setSubmissionState("idle")}
      />
    );
  }

  return (
    <div
      className={
        "grid gap-6 lg:items-start" +
        (currentStep > 0 ? " lg:grid-cols-[minmax(0,1.1fr)_24rem]" : "")
      }
    >
      <div className="grid gap-6">
        <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
                Inquiry progress
              </p>
              <p className="m-0 mt-2 text-sm text-text-soft">
                Step {currentStep + 1} of {stepLabels.length}:{" "}
                {stepLabels[currentStep].title}
              </p>
            </div>
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-soft">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {stepLabels.map((step, index) => (
            <StepBadge
              key={step.key}
              index={index}
              title={step.title}
              description={step.description}
              active={index === currentStep}
              complete={index < currentStep}
            />
          ))}
        </div>

        <form onSubmit={formik.handleSubmit} className="grid gap-6">
          {currentStep === 0 ? <InformationStep /> : null}
          {currentStep === 1 ? (
            <EventDetailsStep
              formik={formik}
              selectedService={selectedService}
            />
          ) : null}

          {currentStep === 2 ? <BuildMenuStep formik={formik} /> : null}

          {currentStep === 3 ? (
            <ContactDetailsStep
              formik={formik}
              selectedService={selectedService}
            />
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Back to previous step
            </Button>

            {currentStep < stepLabels.length - 1 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={disabledButton()}
                variant="primary"
              >
                {currentStep === 0
                  ? "I understand, continue to event details"
                  : "Save and continue"}
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Send inquiry
              </Button>
            )}
          </div>
        </form>
      </div>

      {currentStep > 0 && <SummaryCard values={formik.values} />}
    </div>
  );
}
