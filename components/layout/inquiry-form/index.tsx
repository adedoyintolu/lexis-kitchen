/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect, useState } from "react";
import { ValidationError } from "yup";
import BuildMenuStep from "./steps/build-menu-step";
import ContactDetailsStep from "./steps/contact-details-step";
import EventDetailsStep from "./steps/event-details-step";
import InformationStep from "./steps/information-step";
import { SummaryCard } from "./summary-card";
import { stepLabels } from "./utils";

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

  useEffect(() => {
    if (currentStep !== 2) {
      return;
    }

    const menuStepFields = inquiryStepFields[2] as readonly string[];
    const nextTouched = { ...(formik.touched as Record<string, unknown>) };

    menuStepFields.forEach((field) => {
      nextTouched[field] = true;
    });

    formik.setTouched(nextTouched as typeof formik.touched, false);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep !== 3) {
      return;
    }

    const contactStepFields = inquiryStepFields[3] as readonly string[];
    const nextTouched = { ...(formik.touched as Record<string, unknown>) };

    contactStepFields.forEach((field) => {
      delete nextTouched[field];
    });

    formik.setTouched(nextTouched as typeof formik.touched, false);
  }, [currentStep]);

  const validateCurrentStep = async () => {
    const fields = inquiryStepFields[currentStep] as readonly string[];

    try {
      await inquiryValidationSchema.validate(formik.values, {
        abortEarly: false,
      });

      const nextErrors = { ...(formik.errors as Record<string, unknown>) };

      fields.forEach((field) => {
        delete nextErrors[field];
      });

      formik.setErrors(nextErrors as typeof formik.errors);
      return false;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        return true;
      }

      const stepErrors: Record<string, string> = {};
      const validationErrors = error.inner.length ? error.inner : [error];

      validationErrors.forEach((validationError) => {
        if (validationError.path && fields.includes(validationError.path)) {
          stepErrors[validationError.path] = validationError.message;
        }
      });

      const nextErrors = { ...(formik.errors as Record<string, unknown>) };

      fields.forEach((field) => {
        delete nextErrors[field];
      });

      formik.setErrors({
        ...nextErrors,
        ...stepErrors,
      } as typeof formik.errors);

      return Object.keys(stepErrors).length > 0;
    }
  };

  const touchCurrentStepFields = () => {
    const fields = inquiryStepFields[currentStep] as readonly string[];
    const nextTouched = { ...(formik.touched as Record<string, unknown>) };

    fields.forEach((field) => {
      nextTouched[field] = true;
    });

    formik.setTouched(nextTouched as typeof formik.touched, false);
  };

  const handleNextStep = async () => {
    if (currentStep === 0) {
      // Skip validation for the first step since it's just informational
      setCurrentStep(1);
      return;
    }
    touchCurrentStepFields();
    const hasStepErrors = await validateCurrentStep();

    if (hasStepErrors) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, stepLabels.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const hasCurrentStepErrors = () => {
    if (currentStep === 0) {
      return false;
    }

    const fields = inquiryStepFields[currentStep] as readonly string[];

    try {
      inquiryValidationSchema.validateSync(formik.values, {
        abortEarly: false,
      });
      return false;
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        return true;
      }

      const validationErrors = error.inner.length ? error.inner : [error];

      return validationErrors.some(
        (validationError) =>
          Boolean(validationError.path) &&
          fields.includes(validationError.path as string),
      );
    }
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
      <div className="grid gap-4 rounded-3xl border border-success/20 bg-white p-6 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
          Inquiry sent
        </p>
        <h2 className="m-0 font-display text-[2rem] leading-[0.95]">
          Your inquiry is on its way.
        </h2>
        <p className="m-0 text-text-soft leading-7">
          We will review the details and get back to you within 1-2 business
          days. In the meantime, feel free to start another inquiry or explore
          our menu and services further.
        </p>

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
        <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-accent-soft">
                Inquiry progress
              </p>
              <p className="m-0 mt-2 text-sm text-text-soft">
                Step {currentStep + 1} of {stepLabels.length}:{" "}
                {stepLabels[currentStep].title}
              </p>
              <p className="m-0 mt-1 text-xs text-text-soft">
                {stepLabels[currentStep].description}
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
                disabled={hasCurrentStepErrors()}
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
                disabled={formik.isSubmitting || hasCurrentStepErrors()}
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
