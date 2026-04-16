"use client";

import {
  ButtonHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getIn, useFormik } from "formik";
import { ErrorState } from "@/components/layout/error-state";
import { LoadingState } from "@/components/layout/loading-state";
import {
  eventTypeOptions,
  inquiryServiceOptions,
  inquirySelectionBuckets,
} from "@/data/inquiry";
import {
  buildInquiryEstimate,
  formatCurrency,
  getCategoryItems,
  getPickupCategories,
} from "@/lib/inquiry-estimate";
import {
  getInitialInquiryValues,
  inquiryStepFields,
  inquiryValidationSchema,
} from "@/lib/inquiry-schema";
import type {
  InquiryFormValues,
  InquirySelectionBucket,
  PricingCategory,
} from "@/types/inquiry";

const inputClass =
  "w-full rounded-[1rem] border border-line bg-white px-4 py-[0.95rem] text-text outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-soft focus:shadow-[0_0_0_4px_rgba(117,105,93,0.12)]";

const stepLabels = [
  {
    key: "details",
    title: "Event details",
    description: "Date, guest count, service type, and event context.",
  },
  {
    key: "menu",
    title: "Menu build",
    description: "Choose included dishes and see where add-ons begin.",
  },
  {
    key: "contact",
    title: "Contact and send",
    description: "Review the estimate, add contact details, and submit.",
  },
] as const;

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="text-sm text-danger mt-2">{error}</p>;
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.5rem] border border-line bg-white p-5 md:p-6 shadow-[0_20px_60px_rgba(49,40,33,0.08)]">
      <div className="grid gap-2 mb-5">
        <h3 className="m-0 font-display text-[1.8rem] leading-[0.95] tracking-[-0.02em]">
          {title}
        </h3>
        <p className="m-0 text-text-soft leading-7">{description}</p>
      </div>
      {children}
    </section>
  );
}

function StepBadge({
  index,
  title,
  description,
  active,
  complete,
}: {
  index: number;
  title: string;
  description: string;
  active: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={classNames(
        "rounded-[1.35rem] border p-4 transition-all duration-300",
        active
          ? "border-accent bg-white shadow-[0_20px_60px_rgba(49,40,33,0.08)]"
          : "border-line bg-surface",
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={classNames(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold",
            active || complete
              ? "bg-accent text-white"
              : "bg-surface-muted text-text",
          )}
        >
          {complete ? "✓" : index + 1}
        </div>
        <div>
          <p className="m-0 text-sm font-semibold">{title}</p>
          <p className="m-0 text-xs text-text-soft">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  description,
  priceLabel,
  selected,
  onClick,
}: {
  title: string;
  description: string;
  priceLabel: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "w-full rounded-[1.35rem] border p-4 text-left transition-all duration-300 hover:-translate-y-px",
        selected
          ? "border-accent bg-accent text-white shadow-[0_20px_60px_rgba(49,40,33,0.16)]"
          : "border-line bg-surface hover:bg-white",
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="m-0 text-lg font-semibold">{title}</p>
          <p
            className={classNames(
              "m-0 mt-2 text-sm leading-6",
              selected ? "text-white/80" : "text-text-soft",
            )}
          >
            {description}
          </p>
        </div>
        <span
          className={classNames(
            "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap",
            selected
              ? "bg-white/15 text-white"
              : "bg-surface-muted text-text-soft",
          )}
        >
          {priceLabel}
        </span>
      </div>
      <span
        className={classNames(
          "text-xs uppercase tracking-[0.16em]",
          selected ? "text-white/70" : "text-accent-soft",
        )}
      >
        Tap to select
      </span>
    </button>
  );
}

function MultiSelectGrid({
  title,
  description,
  items,
  selected,
  onToggle,
  error,
  pricingModel,
  includedCount,
}: {
  title: string;
  description: string;
  items: { name: string; largePackPrice?: number }[];
  selected: string[];
  onToggle: (itemName: string) => void;
  error?: string;
  pricingModel: "per-guest" | "per-pan";
  includedCount?: number;
}) {
  const extraCount = Math.max(selected.length - (includedCount ?? 0), 0);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="m-0 text-lg font-semibold">{title}</p>
          <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-soft">
            {selected.length} selected
          </span>
          {typeof includedCount === "number" ? (
            <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-text-soft">
              {includedCount} included
            </span>
          ) : null}
          {extraCount > 0 ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
              {extraCount} add-on{extraCount > 1 ? "s" : ""}
            </span>
          ) : null}
        </div>
      </div>
      <div>
        <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
          Tap any card to add or remove it from this inquiry.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.name);

          return (
            <button
              type="button"
              key={item.name}
              onClick={() => onToggle(item.name)}
              className={classNames(
                "rounded-[1.15rem] border p-4 text-left transition-all duration-300 hover:-translate-y-px",
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-white hover:bg-surface",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="m-0 font-semibold">{item.name}</p>
                  <p
                    className={classNames(
                      "m-0 mt-2 text-sm",
                      isSelected ? "text-white/80" : "text-text-soft",
                    )}
                  >
                    {pricingModel === "per-guest"
                      ? `${formatCurrency(item.largePackPrice ?? 0)} per guest when added`
                      : `${formatCurrency(item.largePackPrice ?? 0)} per large pan when added`}
                  </p>
                </div>
                <span
                  className={classNames(
                    "mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border text-xs",
                    isSelected
                      ? "border-white text-white"
                      : "border-line text-text-soft",
                  )}
                >
                  {isSelected ? "✓" : "+"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <FieldError error={error} />
    </div>
  );
}

function PickupCategoryBlock({
  category,
  quantities,
  onChange,
}: {
  category: PricingCategory;
  quantities: Record<string, number>;
  onChange: (key: string, quantity: number) => void;
}) {
  return (
    <div className="grid gap-4">
      <div>
        <p className="m-0 text-lg font-semibold">{category.label}</p>
        <p className="m-0 mt-1 text-sm leading-6 text-text-soft">
          {category.description}
        </p>
      </div>
      <div className="grid gap-3">
        {category.items.map((item) => {
          const key = `${category.slug}:${item.name}`;
          const quantity = quantities[key] ?? 0;

          return (
            <div
              key={key}
              className="rounded-[1.15rem] border border-line bg-white p-4 md:flex md:items-center md:justify-between"
            >
              <div className="mb-4 md:mb-0">
                <p className="m-0 font-semibold">{item.name}</p>
                <p className="m-0 mt-2 text-sm text-text-soft">
                  {formatCurrency(item.largePackPrice ?? 0)} per large pan
                </p>
              </div>
              <div className="flex items-center gap-3">
                <QuantityButton
                  ariaLabel={`Decrease ${item.name}`}
                  onClick={() => onChange(key, Math.max(quantity - 1, 0))}
                >
                  -
                </QuantityButton>
                <input
                  className="h-12 w-20 rounded-full border border-line bg-surface text-center"
                  type="number"
                  min="0"
                  max="20"
                  value={quantity}
                  onChange={(event) =>
                    onChange(key, Math.max(Number(event.target.value) || 0, 0))
                  }
                />
                <QuantityButton
                  ariaLabel={`Increase ${item.name}`}
                  onClick={() => onChange(key, quantity + 1)}
                >
                  +
                </QuantityButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuantityButton({
  children,
  ariaLabel,
  onClick,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-lg"
    >
      {children}
    </button>
  );
}

function SummaryCard({ values }: { values: InquiryFormValues }) {
  const estimate = useMemo(() => buildInquiryEstimate(values), [values]);
  const selectedService = inquiryServiceOptions.find(
    (option) => option.slug === values.serviceStyle,
  );
  const selectedVariant = selectedService?.variants?.find(
    (variant) => variant.slug === values.serviceVariant,
  );

  return (
    <aside className="overflow-hidden rounded-[1.75rem] border border-line bg-accent text-white shadow-[0_24px_70px_rgba(49,40,33,0.2)] md:sticky md:top-24">
      <div className="border-b border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 text-xs uppercase tracking-[0.18em] text-white/60">
            Planning estimate
          </p>
          <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/70">
            Live
          </span>
        </div>
      </div>

      <div className="border-b border-white/10 px-5 py-5">
        <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
          Current total
        </p>
        <p className="m-0 mt-3 font-display text-[3rem] leading-[0.88] tracking-[-0.03em]">
          {formatCurrency(estimate.subtotal)}
        </p>
        <p className="m-0 mt-3 text-sm leading-6 text-white/75">
          A quick planning estimate based on the current selections and pricing
          variables.
        </p>
        {estimate.minimumApplied ? (
          <div className="mt-4 rounded-[1rem] border border-white/10 bg-white/8 px-4 py-3">
            <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/55">
              Minimum applied
            </p>
            <p className="m-0 mt-2 text-sm leading-6 text-white/80">
              Service minimums increased this estimate based on the current
              selection.
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 border-b border-white/10 px-5 py-5">
        <SummaryRow
          label="Service"
          value={
            selectedVariant
              ? selectedVariant.title
              : selectedService?.title || "Select one"
          }
        />
        <SummaryRow
          label="Guests"
          value={values.guestCount ? `${values.guestCount} guests` : "Not set"}
        />
        <SummaryRow label="Event date" value={values.eventDate || "Not set"} />
        <SummaryRow label="Venue" value={values.venue || "Not set"} />
      </div>

      <div className="border-b border-white/10 px-5 py-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
            Cost breakdown
          </p>
          <span className="text-xs text-white/40">
            {estimate.lineItems.length} line
            {estimate.lineItems.length === 1 ? "" : "s"}
          </span>
        </div>
        {estimate.lineItems.length > 0 ? (
          <div className="grid gap-3">
            {estimate.lineItems.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 rounded-[1rem] border border-white/8 bg-white/6 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-sm text-white/75">{item.label}</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                {item.detail ? (
                  <p className="m-0 text-xs leading-5 text-white/45">
                    {item.detail}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="m-0 text-sm leading-6 text-white/60">
            Choose a service style and guest count to see the estimate fill in.
          </p>
        )}
      </div>

      <div className="px-5 py-5">
        <p className="m-0 text-xs uppercase tracking-[0.16em] text-white/60">
          Planning notes
        </p>
        <ul className="m-0 mt-3 list-none p-0 grid gap-2">
          {estimate.assumptions.map((assumption) => (
            <li
              key={assumption}
              className="rounded-[0.95rem] border border-white/8 bg-white/5 px-4 py-3 text-sm leading-6 text-white/70"
            >
              {assumption}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-white/60">{label}</span>
      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  );
}

function ReviewList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.15rem] border border-line bg-white p-4 transition-transform duration-300 hover:-translate-y-px">
      <p className="m-0 text-sm font-semibold">{title}</p>
      <p className="m-0 mt-1 text-xs uppercase tracking-[0.16em] text-accent-soft">
        {items.length} item{items.length === 1 ? "" : "s"}
      </p>
      {items.length ? (
        <ul className="m-0 mt-3 list-none p-0 grid gap-2">
          {items.map((item) => (
            <li key={item} className="text-sm text-text-soft">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 mt-3 text-sm text-text-soft">Nothing selected.</p>
      )}
    </div>
  );
}

function getStepErrorCount(errors: unknown, fields: readonly string[]) {
  return fields.reduce((count, field) => {
    return getIn(errors, field) ? count + 1 : count;
  }, 0);
}

export function InquiryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const wizardRef = useRef<HTMLDivElement | null>(null);

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
  const selectedVariant = selectedService?.variants?.find(
    (variant) => variant.slug === formik.values.serviceVariant,
  );
  const isPackageStyle = ["full-service", "buffet-setup-only"].includes(
    formik.values.serviceStyle,
  );
  const progressPercentage = ((currentStep + 1) / stepLabels.length) * 100;

  useEffect(() => {
    wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentStep]);

  const handleServiceStyleChange = (serviceStyle: string) => {
    formik.setValues({
      ...formik.values,
      serviceStyle,
      serviceVariant: "",
      selectedNibbles: [],
      selectedRegularMains: [],
      selectedPremiumMains: [],
      selectedProteins: [],
      selectedSides: [],
      pickupQuantities: {},
    });
  };

  const toggleSelection = (
    field:
      | "selectedNibbles"
      | "selectedRegularMains"
      | "selectedPremiumMains"
      | "selectedProteins"
      | "selectedSides",
    itemName: string,
  ) => {
    const currentSelections = formik.values[field];
    const nextSelections = currentSelections.includes(itemName)
      ? currentSelections.filter((value) => value !== itemName)
      : [...currentSelections, itemName];

    formik.setFieldValue(field, nextSelections);
  };

  const handleNextStep = async () => {
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
      ref={wizardRef}
      className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-start"
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
          {currentStep === 0 ? (
            <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
              <SectionCard
                title="Event details and service style"
                description="Start with the event basics, then choose the service flow that best matches the client request."
              >
                <div className="grid gap-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Event type
                      </label>
                      <select
                        className={inputClass}
                        {...formik.getFieldProps("eventType")}
                      >
                        {eventTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <FieldError
                        error={
                          getIn(formik.touched, "eventType")
                            ? getIn(formik.errors, "eventType")
                            : undefined
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Event date
                      </label>
                      <input
                        type="date"
                        className={inputClass}
                        {...formik.getFieldProps("eventDate")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "eventDate")
                            ? getIn(formik.errors, "eventDate")
                            : undefined
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Guest count
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={inputClass}
                        {...formik.getFieldProps("guestCount")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "guestCount")
                            ? getIn(formik.errors, "guestCount")
                            : undefined
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Venue or pickup reference
                      </label>
                      <input
                        className={inputClass}
                        {...formik.getFieldProps("venue")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "venue")
                            ? getIn(formik.errors, "venue")
                            : undefined
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-accent-soft">
                      City or area
                    </label>
                    <input
                      className={inputClass}
                      {...formik.getFieldProps("city")}
                    />
                    <FieldError
                      error={
                        getIn(formik.touched, "city")
                          ? getIn(formik.errors, "city")
                          : undefined
                      }
                    />
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <p className="m-0 text-sm font-semibold text-accent-soft mb-3">
                        Select service style
                      </p>
                      <p className="m-0 mb-4 text-sm leading-6 text-text-soft">
                        Start with the overall service model first. Once this is
                        selected, the next step adapts automatically to the
                        right menu structure and pricing rules.
                      </p>
                      <div className="grid gap-3">
                        {inquiryServiceOptions.map((option) => (
                          <ServiceCard
                            key={option.slug}
                            title={option.title}
                            description={option.summary}
                            priceLabel={option.badge}
                            selected={
                              formik.values.serviceStyle === option.slug
                            }
                            onClick={() =>
                              handleServiceStyleChange(option.slug)
                            }
                          />
                        ))}
                      </div>
                      <FieldError
                        error={
                          getIn(formik.touched, "serviceStyle")
                            ? getIn(formik.errors, "serviceStyle")
                            : undefined
                        }
                      />
                    </div>

                    {selectedService ? (
                      <div className="rounded-[1.25rem] border border-line bg-surface p-4">
                        <p className="m-0 text-xs uppercase tracking-[0.16em] text-accent-soft">
                          Selected style
                        </p>
                        <h4 className="m-0 mt-2 text-xl font-semibold">
                          {selectedService.title}
                        </h4>
                        <p className="m-0 mt-2 text-text-soft leading-7">
                          {selectedService.leadNote}
                        </p>
                        {selectedService.availabilityNote ? (
                          <p className="m-0 mt-3 text-sm text-danger">
                            {selectedService.availabilityNote}
                          </p>
                        ) : null}
                      </div>
                    ) : null}

                    {selectedService?.variants ? (
                      <div className="grid gap-3">
                        <p className="m-0 text-sm font-semibold text-accent-soft">
                          Choose the service option
                        </p>
                        <div className="grid gap-3 md:grid-cols-2">
                          {selectedService.variants.map((variant) => (
                            <ServiceCard
                              key={variant.slug}
                              title={variant.title}
                              description={variant.pricingSummary}
                              priceLabel={variant.priceLabel}
                              selected={
                                formik.values.serviceVariant === variant.slug
                              }
                              onClick={() =>
                                formik.setFieldValue(
                                  "serviceVariant",
                                  variant.slug,
                                )
                              }
                            />
                          ))}
                        </div>
                        <FieldError
                          error={
                            getIn(formik.touched, "serviceVariant")
                              ? getIn(formik.errors, "serviceVariant")
                              : undefined
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </SectionCard>
            </div>
          ) : null}

          {currentStep === 1 ? (
            <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
              <SectionCard
                title="Build the menu"
                description="Choose the menu structure for the selected service style. The estimate updates live as add-ons are introduced."
              >
                <div className="grid gap-8">
                  {formik.values.serviceStyle === "nibbles-only" ? (
                    <MultiSelectGrid
                      title="Nibbles selection"
                      description="Choose the nibble options you want to price. We will apply the minimum food spend if needed."
                      items={getCategoryItems("nibbles")}
                      selected={formik.values.selectedNibbles}
                      onToggle={(itemName) =>
                        toggleSelection("selectedNibbles", itemName)
                      }
                      error={
                        getIn(formik.touched, "selectedNibbles")
                          ? getIn(formik.errors, "selectedNibbles")
                          : undefined
                      }
                      pricingModel="per-guest"
                      includedCount={undefined}
                    />
                  ) : null}

                  {isPackageStyle
                    ? inquirySelectionBuckets.map((bucket) => {
                        const fieldMap: Record<
                          InquirySelectionBucket["key"],
                          keyof InquiryFormValues
                        > = {
                          nibbles: "selectedNibbles",
                          regularMains: "selectedRegularMains",
                          premiumMains: "selectedPremiumMains",
                          proteins: "selectedProteins",
                          sides: "selectedSides",
                        };

                        const field = fieldMap[bucket.key];

                        return (
                          <MultiSelectGrid
                            key={bucket.key}
                            title={bucket.title}
                            description={bucket.helperText}
                            items={getCategoryItems(bucket.categorySlug)}
                            selected={formik.values[field] as string[]}
                            onToggle={(itemName) =>
                              toggleSelection(
                                field as
                                  | "selectedNibbles"
                                  | "selectedRegularMains"
                                  | "selectedPremiumMains"
                                  | "selectedProteins"
                                  | "selectedSides",
                                itemName,
                              )
                            }
                            error={
                              getIn(formik.touched, field)
                                ? getIn(formik.errors, field)
                                : undefined
                            }
                            pricingModel={bucket.pricingModel}
                            includedCount={bucket.includedCount}
                          />
                        );
                      })
                    : null}

                  {formik.values.serviceStyle === "pickup" ? (
                    <div className="grid gap-6">
                      {getPickupCategories().map((category) => (
                        <PickupCategoryBlock
                          key={category.slug}
                          category={category}
                          quantities={formik.values.pickupQuantities}
                          onChange={(key, quantity) =>
                            formik.setFieldValue("pickupQuantities", {
                              ...formik.values.pickupQuantities,
                              [key]: quantity,
                            })
                          }
                        />
                      ))}
                      <FieldError
                        error={
                          getIn(formik.touched, "pickupQuantities")
                            ? getIn(formik.errors, "pickupQuantities")
                            : undefined
                        }
                      />
                    </div>
                  ) : null}

                  {formik.values.serviceStyle === "abula-on-the-spot" ? (
                    <div className="rounded-[1.35rem] border border-line bg-surface p-5">
                      <p className="m-0 text-lg font-semibold">Included menu</p>
                      <ul className="m-0 mt-4 list-none p-0 grid gap-2">
                        {[
                          "Amala",
                          "Gbegiri",
                          "Ewedu",
                          "Assorted meat stew",
                        ].map((item) => (
                          <li key={item} className="text-text-soft">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </SectionCard>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
              <SectionCard
                title="Contact details and final review"
                description="Add the client contact details, any important notes, and then send the inquiry to the configured inbox."
              >
                <div className="grid gap-5">
                  <div className="rounded-[1.25rem] border border-line bg-surface p-4">
                    <p className="m-0 text-xs uppercase tracking-[0.16em] text-accent-soft">
                      Review snapshot
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <ReviewList
                        title="Service choice"
                        items={[
                          selectedVariant?.title ||
                            selectedService?.title ||
                            "Not selected",
                          formik.values.guestCount
                            ? `${formik.values.guestCount} guests`
                            : "Guest count not set",
                          formik.values.eventDate || "Event date not set",
                        ]}
                      />
                      <ReviewList
                        title="Menu selections"
                        items={[
                          ...formik.values.selectedNibbles,
                          ...formik.values.selectedRegularMains,
                          ...formik.values.selectedPremiumMains,
                          ...formik.values.selectedProteins,
                          ...formik.values.selectedSides,
                          ...Object.entries(formik.values.pickupQuantities)
                            .filter(([, quantity]) => quantity > 0)
                            .map(([key, quantity]) => {
                              const [, ...itemParts] = key.split(":");
                              return `${itemParts.join(":")} x ${quantity}`;
                            }),
                        ]}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Full name
                      </label>
                      <input
                        className={inputClass}
                        {...formik.getFieldProps("fullName")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "fullName")
                            ? getIn(formik.errors, "fullName")
                            : undefined
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Email
                      </label>
                      <input
                        type="email"
                        className={inputClass}
                        {...formik.getFieldProps("email")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "email")
                            ? getIn(formik.errors, "email")
                            : undefined
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-accent-soft">
                        Phone
                      </label>
                      <input
                        className={inputClass}
                        {...formik.getFieldProps("phone")}
                      />
                      <FieldError
                        error={
                          getIn(formik.touched, "phone")
                            ? getIn(formik.errors, "phone")
                            : undefined
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-accent-soft">
                      Event notes
                    </label>
                    <textarea
                      rows={6}
                      className={classNames(inputClass, "min-h-32 resize-y")}
                      {...formik.getFieldProps("notes")}
                      placeholder="Share timing, preferences, allergies, premium requests, or anything the team should know."
                    />
                  </div>

                  <div className="rounded-[1.25rem] border border-line bg-surface p-4">
                    <p className="m-0 text-xs uppercase tracking-[0.16em] text-accent-soft">
                      Before you send
                    </p>
                    <ul className="m-0 mt-3 list-none p-0 grid gap-2">
                      <li className="text-text-soft">
                        The estimate uses large-pan pricing only, per your
                        instruction.
                      </li>
                      <li className="text-text-soft">
                        Any setup, staffing, tax, or rental adjustments remain
                        part of manual review.
                      </li>
                      <li className="text-text-soft">
                        The email payload includes the full inquiry details plus
                        the live estimate summary.
                      </li>
                    </ul>
                  </div>
                </div>
              </SectionCard>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-5 py-3 text-text transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              Back to previous step
            </button>

            {currentStep < stepLabels.length - 1 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-white"
              >
                Save and continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-white disabled:opacity-50"
              >
                Send inquiry
              </button>
            )}
          </div>
        </form>
      </div>

      <SummaryCard values={formik.values} />
    </div>
  );
}
