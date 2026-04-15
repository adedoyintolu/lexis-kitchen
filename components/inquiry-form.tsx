"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {
    eventTypeOptions,
    inquiryIntentOptions,
    serviceStyles,
} from "@/data/inquiry";
import { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  serviceStyle: string;
  venue: string;
  budget: string;
  notes: string;
  intents: string[];
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  eventType: eventTypeOptions[0]?.value ?? "",
  eventDate: "",
  guestCount: "",
  serviceStyle: serviceStyles[0]?.slug ?? "",
  venue: "",
  budget: "",
  notes: "",
  intents: ["event-inquiry"],
};

const inputClass =
  "w-full rounded-[1rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.9)] px-4 py-[0.95rem] text-[color:var(--color-text)] outline-none transition-[border-color,transform,box-shadow] duration-[160ms] ease-[ease] focus:border-[color:var(--color-accent-soft)] focus:shadow-[0_0_0_4px_rgba(117,105,93,0.12)]";

const labelClass =
  "text-[0.82rem] font-bold tracking-[0.08em] uppercase text-[color:var(--color-accent-soft)]";

const btnPrimary =
  "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-transparent bg-[color:var(--color-accent)] text-white [box-shadow:0_20px_60px_rgba(49,40,33,0.08)] transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[#1f1813] focus-visible:-translate-y-px focus-visible:bg-[#1f1813]";

const btnSecondary =
  "inline-flex items-center justify-center rounded-full px-5 py-[0.88rem] border border-[color:var(--color-line-strong)] bg-transparent text-[color:var(--color-text)] transition-[transform,background-color,border-color,color,box-shadow] duration-[180ms] ease-[ease] cursor-pointer hover:-translate-y-px hover:bg-[rgba(255,255,255,0.55)] focus-visible:-translate-y-px focus-visible:bg-[rgba(255,255,255,0.55)]";

export function InquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const updateField = (
    field: keyof Omit<FormState, "intents">,
    value: string,
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleIntent = (intent: string) => {
    setForm((current) => {
      const intents = current.intents.includes(intent)
        ? current.intents.filter((item) => item !== intent)
        : [...current.intents, intent];

      return { ...current, intents };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.guestCount || !form.eventDate) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200);
    });
    setStatus("success");
  };

  if (status === "loading") {
    return (
      <LoadingState
        title="Submitting your inquiry"
        description="Packaging event details, pricing intent, and menu requests."
      />
    );
  }

  if (status === "success") {
    return (
      <div className="grid gap-[0.9rem] rounded-[1.3rem] border border-[rgba(33,74,53,0.25)] bg-[rgba(255,255,255,0.72)] p-[1.2rem] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
        <p className="m-0 text-[color:var(--color-accent-soft)] uppercase tracking-[0.16em] text-[0.75rem] font-bold">
          Inquiry received
        </p>
        <h2 className="m-0 text-[1.2rem]">
          Thank you, {form.fullName.split(" ")[0] || "there"}.
        </h2>
        <p className="text-[color:var(--color-text-soft)] leading-[1.7]">
          This front-end build stores no backend data yet, but the form is fully
          structured and ready to connect when you are. Below is the summary of
          what the guest submitted.
        </p>
        <div className="text-[0.82rem] font-bold tracking-[0.08em] uppercase text-[color:var(--color-accent-soft)]">
          Submission summary
        </div>
        <ul className="m-0 p-0 list-none grid gap-[0.7rem]">
          <li className="grid gap-[0.35rem]">
            <strong>Service style</strong>
            <span className="text-[color:var(--color-text-soft)]">
              {
                serviceStyles.find((item) => item.slug === form.serviceStyle)
                  ?.title
              }
            </span>
          </li>
          <li className="grid gap-[0.35rem]">
            <strong>Guest count</strong>
            <span className="text-[color:var(--color-text-soft)]">
              {form.guestCount} guests
            </span>
          </li>
          <li className="grid gap-[0.35rem]">
            <strong>Event date</strong>
            <span className="text-[color:var(--color-text-soft)]">
              {form.eventDate}
            </span>
          </li>
          <li className="grid gap-[0.35rem]">
            <strong>Primary goals</strong>
            <span className="text-[color:var(--color-text-soft)]">
              {form.intents
                .map(
                  (intent) =>
                    inquiryIntentOptions.find(
                      (option) => option.value === intent,
                    )?.label,
                )
                .filter(Boolean)
                .join(", ")}
            </span>
          </li>
        </ul>
        <div className="flex flex-wrap gap-[0.7rem]">
          <button
            className={btnPrimary}
            type="button"
            onClick={() => {
              setForm(initialState);
              setStatus("idle");
            }}
          >
            Start another inquiry
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorState
        title="A few key fields are still missing"
        description="Full name, email, guest count, and event date are required in this demo flow."
        onRetry={() => setStatus("idle")}
      />
    );
  }

  return (
    <div className="rounded-[1.5rem] p-[1.2rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.72)] [box-shadow:0_20px_60px_rgba(49,40,33,0.08)]">
      <form className="grid gap-[0.95rem]" onSubmit={handleSubmit}>
        <div className="grid gap-[0.95rem] md:grid-cols-2">
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              className={inputClass}
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="First and last name"
            />
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={inputClass}
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className={inputClass}
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="eventType">
              Event type
            </label>
            <select
              id="eventType"
              className={inputClass}
              value={form.eventType}
              onChange={(event) => updateField("eventType", event.target.value)}
            >
              {eventTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="eventDate">
              Event date
            </label>
            <input
              id="eventDate"
              className={inputClass}
              type="date"
              value={form.eventDate}
              onChange={(event) => updateField("eventDate", event.target.value)}
            />
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="guestCount">
              Guest count
            </label>
            <input
              id="guestCount"
              className={inputClass}
              type="number"
              min="1"
              value={form.guestCount}
              onChange={(event) =>
                updateField("guestCount", event.target.value)
              }
              placeholder="Estimated number of guests"
            />
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="serviceStyle">
              Service style
            </label>
            <select
              id="serviceStyle"
              className={inputClass}
              value={form.serviceStyle}
              onChange={(event) =>
                updateField("serviceStyle", event.target.value)
              }
            >
              {serviceStyles.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-[0.42rem]">
            <label className={labelClass} htmlFor="budget">
              Budget notes
            </label>
            <input
              id="budget"
              className={inputClass}
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              placeholder="Optional target spend"
            />
          </div>
        </div>

        <div className="grid gap-[0.42rem]">
          <label className={labelClass} htmlFor="venue">
            Venue or event location
          </label>
          <input
            id="venue"
            className={inputClass}
            value={form.venue}
            onChange={(event) => updateField("venue", event.target.value)}
            placeholder="Venue name or neighborhood"
          />
        </div>

        <div className="grid gap-[0.42rem]">
          <span className="text-[0.82rem] font-bold tracking-[0.08em] uppercase text-[color:var(--color-accent-soft)]">
            What do you need help with?
          </span>
          <div className="grid gap-[0.7rem] md:grid-cols-2">
            {inquiryIntentOptions.map((option) => (
              <label
                key={option.value}
                className="flex gap-[0.7rem] items-start px-4 py-[0.9rem] rounded-[1rem] border border-[color:var(--color-line)] bg-[rgba(255,255,255,0.62)] cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="mt-[0.2rem]"
                  checked={form.intents.includes(option.value)}
                  onChange={() => toggleIntent(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-[0.42rem]">
          <label className={labelClass} htmlFor="notes">
            Event notes
          </label>
          <textarea
            id="notes"
            className={`${inputClass} min-h-[8rem] resize-y`}
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Share any preferred dishes, service timing, or important details."
          />
        </div>

        <p className="text-[color:var(--color-text-soft)] leading-[1.7]">
          This static version is optimized for speed and is ready for backend or
          email integration later.
        </p>

        <button className={btnPrimary} type="submit">
          Start event inquiry
        </button>
      </form>
    </div>
  );
}
