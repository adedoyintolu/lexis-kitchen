import { buildInquiryEstimate, formatCurrency } from "@/lib/inquiry-estimate";
import {
  getInitialInquiryValues,
  inquiryValidationSchema,
} from "@/lib/inquiry-schema";
import { createInquiryTransporter, getMissingMailerEnv } from "@/lib/mailer";
import type { InquiryEstimate, InquiryFormValues } from "@/types/inquiry";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function buildSelectionsHtml(title: string, values: string[]) {
  if (!values.length) {
    return `<p><strong>${title}:</strong> None selected</p>`;
  }

  return `
    <div>
      <strong>${title}</strong>
      <ul>
        ${values.map((value) => `<li>${value}</li>`).join("")}
      </ul>
    </div>
  `;
}

function buildPickupHtml(quantities: Record<string, number>) {
  const entries = Object.entries(quantities).filter(
    ([, quantity]) => quantity > 0,
  );

  if (!entries.length) {
    return "<p><strong>Pickup items:</strong> None selected</p>";
  }

  return `
    <div>
      <strong>Pickup items</strong>
      <ul>
        ${entries
          .map(([key, quantity]) => {
            const [, ...itemParts] = key.split(":");
            return `<li>${itemParts.join(":")} x ${quantity}</li>`;
          })
          .join("")}
      </ul>
    </div>
  `;
}

function buildEstimateHtml(estimate: InquiryEstimate) {
  return `
    <div>
      <h3>Estimate summary</h3>
      <p><strong>Total:</strong> ${formatCurrency(estimate.subtotal)}</p>
      <ul>
        ${estimate.lineItems
          .map(
            (item) =>
              `<li><strong>${item.label}:</strong> ${formatCurrency(item.amount)}${
                item.detail ? ` — ${item.detail}` : ""
              }</li>`,
          )
          .join("")}
      </ul>
      <p><strong>Assumptions</strong></p>
      <ul>
        ${estimate.assumptions.map((assumption) => `<li>${assumption}</li>`).join("")}
      </ul>
    </div>
  `;
}

function buildEstimateText(estimate: InquiryEstimate) {
  return [
    `Estimate total: ${formatCurrency(estimate.subtotal)}`,
    ...estimate.lineItems.map(
      (item) =>
        `- ${item.label}: ${formatCurrency(item.amount)}${item.detail ? ` (${item.detail})` : ""}`,
    ),
    "Assumptions:",
    ...estimate.assumptions.map((assumption) => `- ${assumption}`),
  ].join("\n");
}

function normalizeInquiryValues(value: unknown): InquiryFormValues {
  const initialValues = getInitialInquiryValues();
  const payload = typeof value === "object" && value !== null ? value : {};

  return {
    ...initialValues,
    ...(payload as Partial<InquiryFormValues>),
    selectedNibbles: Array.isArray(
      (payload as InquiryFormValues).selectedNibbles,
    )
      ? (payload as InquiryFormValues).selectedNibbles.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedRegularMains: Array.isArray(
      (payload as InquiryFormValues).selectedRegularMains,
    )
      ? (payload as InquiryFormValues).selectedRegularMains.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedPremiumMains: Array.isArray(
      (payload as InquiryFormValues).selectedPremiumMains,
    )
      ? (payload as InquiryFormValues).selectedPremiumMains.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedProteins: Array.isArray(
      (payload as InquiryFormValues).selectedProteins,
    )
      ? (payload as InquiryFormValues).selectedProteins.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedSides: Array.isArray((payload as InquiryFormValues).selectedSides)
      ? (payload as InquiryFormValues).selectedSides.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    pickupQuantities:
      typeof (payload as InquiryFormValues).pickupQuantities === "object" &&
      (payload as InquiryFormValues).pickupQuantities !== null
        ? Object.fromEntries(
            Object.entries((payload as InquiryFormValues).pickupQuantities).map(
              ([key, quantity]) => [key, Number(quantity) || 0],
            ),
          )
        : {},
  };
}

export async function POST(request: Request) {
  const missingEnv = getMissingMailerEnv();

  if (missingEnv.length) {
    return NextResponse.json(
      {
        error: `Missing mail configuration: ${missingEnv.join(", ")}.`,
      },
      { status: 500 },
    );
  }

  try {
    const payload = (await request.json()) as InquiryFormValues & {
      estimate?: InquiryEstimate;
    };

    const validatedPayload = await inquiryValidationSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });
    const values = normalizeInquiryValues(validatedPayload);

    const estimate = payload.estimate ?? buildInquiryEstimate(values);
    const transporter = createInquiryTransporter();

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e1a17;">
        <h2>New Lexi's Kitchen inquiry</h2>
        <p><strong>Name:</strong> ${values.fullName}</p>
        <p><strong>Email:</strong> ${values.email}</p>
        <p><strong>Phone:</strong> ${values.phone}</p>
        <p><strong>Event type:</strong> ${values.eventType}</p>
        <p><strong>Date:</strong> ${values.eventDate}</p>
        <p><strong>Guest count:</strong> ${values.guestCount}</p>
        <p><strong>Venue:</strong> ${values.venue}</p>
        <p><strong>City:</strong> ${values.city}</p>
        <p><strong>Service style:</strong> ${values.serviceStyle}</p>
        <p><strong>Service variant:</strong> ${values.serviceVariant || "N/A"}</p>
        ${buildSelectionsHtml("Nibbles", values.selectedNibbles)}
        ${buildSelectionsHtml("Regular mains", values.selectedRegularMains)}
        ${buildSelectionsHtml("Premium mains", values.selectedPremiumMains)}
        ${buildSelectionsHtml("Proteins", values.selectedProteins)}
        ${buildSelectionsHtml("Sides", values.selectedSides)}
        ${buildPickupHtml(values.pickupQuantities)}
        <p><strong>Notes:</strong> ${values.notes || "No additional notes."}</p>
        ${buildEstimateHtml(estimate)}
      </div>
    `;

    const text = [
      "New Lexi's Kitchen inquiry",
      `Name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Event type: ${values.eventType}`,
      `Date: ${values.eventDate}`,
      `Guest count: ${values.guestCount}`,
      `Venue: ${values.venue}`,
      `City: ${values.city}`,
      `Service style: ${values.serviceStyle}`,
      `Service variant: ${values.serviceVariant || "N/A"}`,
      `Nibbles: ${values.selectedNibbles.join(", ") || "None"}`,
      `Regular mains: ${values.selectedRegularMains.join(", ") || "None"}`,
      `Premium mains: ${values.selectedPremiumMains.join(", ") || "None"}`,
      `Proteins: ${values.selectedProteins.join(", ") || "None"}`,
      `Sides: ${values.selectedSides.join(", ") || "None"}`,
      `Notes: ${values.notes || "No additional notes."}`,
      "",
      buildEstimateText(estimate),
    ].join("\n");

    const info = await transporter.sendMail({
      from: process.env.INQUIRY_FROM_NAME
        ? `"${process.env.INQUIRY_FROM_NAME}" <${process.env.INQUIRY_FROM_EMAIL}>`
        : process.env.INQUIRY_FROM_EMAIL,
      to: process.env.INQUIRY_TO_EMAIL,
      replyTo: values.email,
      subject: `New inquiry from ${values.fullName}`,
      html,
      text,
    });

    return NextResponse.json({
      message: `Inquiry delivered successfully. Message ID: ${info.messageId}`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unable to process the inquiry request." },
      { status: 400 },
    );
  }
}
