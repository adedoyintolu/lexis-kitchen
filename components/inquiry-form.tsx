"use client";

import { useState } from "react";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {
  eventTypeOptions,
  inquiryIntentOptions,
  serviceStyles,
} from "@/data/inquiry";

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
      <div className="state-card state-card-success">
        <p className="eyebrow">Inquiry received</p>
        <h2>Thank you, {form.fullName.split(" ")[0] || "there"}.</h2>
        <p className="form-note">
          This front-end build stores no backend data yet, but the form is fully
          structured and ready to connect when you are. Below is the summary of
          what the guest submitted.
        </p>
        <div className="summary-heading">Submission summary</div>
        <ul className="summary-list">
          <li>
            <strong>Service style</strong>
            <span>
              {
                serviceStyles.find((item) => item.slug === form.serviceStyle)
                  ?.title
              }
            </span>
          </li>
          <li>
            <strong>Guest count</strong>
            <span>{form.guestCount} guests</span>
          </li>
          <li>
            <strong>Event date</strong>
            <span>{form.eventDate}</span>
          </li>
          <li>
            <strong>Primary goals</strong>
            <span>
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
        <div className="state-actions">
          <button
            className="button button-primary"
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
    <div className="inquiry-card">
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="field-grid">
          <div className="field">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              className="input"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="First and last name"
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="input"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="name@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              className="input"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="field">
            <label htmlFor="eventType">Event type</label>
            <select
              id="eventType"
              className="select"
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
          <div className="field">
            <label htmlFor="eventDate">Event date</label>
            <input
              id="eventDate"
              className="input"
              type="date"
              value={form.eventDate}
              onChange={(event) => updateField("eventDate", event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="guestCount">Guest count</label>
            <input
              id="guestCount"
              className="input"
              type="number"
              min="1"
              value={form.guestCount}
              onChange={(event) =>
                updateField("guestCount", event.target.value)
              }
              placeholder="Estimated number of guests"
            />
          </div>
          <div className="field">
            <label htmlFor="serviceStyle">Service style</label>
            <select
              id="serviceStyle"
              className="select"
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
          <div className="field">
            <label htmlFor="budget">Budget notes</label>
            <input
              id="budget"
              className="input"
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              placeholder="Optional target spend"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="venue">Venue or event location</label>
          <input
            id="venue"
            className="input"
            value={form.venue}
            onChange={(event) => updateField("venue", event.target.value)}
            placeholder="Venue name or neighborhood"
          />
        </div>

        <div className="field">
          <span className="summary-heading">What do you need help with?</span>
          <div className="checkbox-grid">
            {inquiryIntentOptions.map((option) => (
              <label key={option.value} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={form.intents.includes(option.value)}
                  onChange={() => toggleIntent(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="notes">Event notes</label>
          <textarea
            id="notes"
            className="textarea"
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Share any preferred dishes, service timing, or important details."
          />
        </div>

        <p className="form-note">
          This static version is optimized for speed and is ready for backend or
          email integration later.
        </p>

        <button className="button button-primary" type="submit">
          Start event inquiry
        </button>
      </form>
    </div>
  );
}
