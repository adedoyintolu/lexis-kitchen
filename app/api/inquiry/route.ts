import {
  buildInquiryEstimate,
  formatCurrency,
  getServiceOption,
  getServiceVariant,
} from "@/lib/inquiry-estimate";
import {
  getInitialInquiryValues,
  inquiryValidationSchema,
} from "@/lib/inquiry-schema";
import { getMissingMailerEnv, sendInquiryEmail } from "@/lib/mailer";
import type { InquiryEstimate, InquiryFormValues } from "@/types/inquiry";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function buildEstimateHtml(estimate: InquiryEstimate) {
  return `
    <div>
      <h3>Estimate summary</h3>
      <p><strong>Estimated Total:</strong> ${formatCurrency(estimate.subtotal)}</p>
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

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function infoRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding: 10px 0; width: 42%; color: #6b7280; font-size: 13px; border-bottom: 1px solid #edf0f3;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #edf0f3;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function sectionWrapper(title: string, content: string) {
  return `
    <section style="margin-top: 18px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px 18px;">
      <h3 style="margin: 0 0 12px; color: #111827; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em;">
        ${escapeHtml(title)}
      </h3>
      ${content}
    </section>
  `;
}

function buildListHtml(items: string[]) {
  if (!items.length) {
    return `<p style="margin: 0; color: #6b7280; font-size: 14px;">None selected</p>`;
  }

  return `
    <ul style="margin: 0; padding-left: 18px; color: #1f2937; font-size: 14px; line-height: 1.6; text-transform: capitalize;">
      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function normalizeInquiryValues(value: unknown): InquiryFormValues {
  const initialValues = getInitialInquiryValues();
  const payload = typeof value === "object" && value !== null ? value : {};

  const p = payload as InquiryFormValues;

  return {
    ...initialValues,
    ...p,
    selectedNibbles: Array.isArray(p.selectedNibbles)
      ? p.selectedNibbles.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedRegularMains: Array.isArray(p.selectedRegularMains)
      ? p.selectedRegularMains.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedPremiumMains: Array.isArray(p.selectedPremiumMains)
      ? p.selectedPremiumMains.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedProteins: Array.isArray(p.selectedProteins)
      ? p.selectedProteins.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedSides: Array.isArray(p.selectedSides)
      ? p.selectedSides.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedSoups: Array.isArray(p.selectedSoups)
      ? p.selectedSoups.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    selectedStews: Array.isArray(p.selectedStews)
      ? p.selectedStews.filter(
          (item): item is string => typeof item === "string",
        )
      : [],
    pickupQuantities:
      typeof p.pickupQuantities === "object" && p.pickupQuantities !== null
        ? Object.fromEntries(
            Object.entries(p.pickupQuantities).map(([key, quantity]) => [
              key,
              Number(quantity) || 0,
            ]),
          )
        : {},
  };
}

export async function POST(request: Request) {
  const missingEnv = getMissingMailerEnv();

  if (missingEnv.length) {
    return NextResponse.json(
      { error: `Missing mail configuration: ${missingEnv.join(", ")}.` },
      { status: 500 },
    );
  }

  try {
    const payload = (await request.json()) as InquiryFormValues & {
      estimate?: InquiryEstimate;
    };

    const validatedPayload = await inquiryValidationSchema.validate(payload, {
      abortEarly: false,
    });
    const values = normalizeInquiryValues(validatedPayload);

    const selectedVariant = getServiceVariant(
      values.serviceStyle,
      values.serviceVariant,
    );
    const serviceOption = getServiceOption(values.serviceStyle);

    const setupFee = selectedVariant?.setupFee
      ? formatCurrency(selectedVariant.setupFee)
      : serviceOption?.setupFee
        ? formatCurrency(serviceOption.setupFee)
        : "";

    const estimate = payload.estimate ?? buildInquiryEstimate(values);

    const pickupItems = Object.entries(values.pickupQuantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([key, quantity]) => {
        const [, ...itemParts] = key.split(":");
        return `${itemParts.join(":")} x ${quantity}`;
      });

    const serviceLabel =
      values.serviceVariant && values.serviceVariant.trim().length > 0
        ? `${values.serviceStyle} (${values.serviceVariant})`
        : values.serviceStyle;

    const stairsDetails =
      values.hasStairs === "yes"
        ? values.stairsDetails || "Yes - details not provided"
        : "No";

    const parkingDetails =
      values.hasParkingRestrictions === "yes"
        ? values.parkingRestrictions || "Yes - details not provided"
        : "No";

    const html = `
      <div style="background: #f3f4f6; padding: 24px; font-family: 'Segoe UI', Arial, sans-serif; color: #111827;">
        <div style="max-width: 880px; margin: 0 auto; background: #f8fafc; border: 1px solid #d1d5db; border-radius: 14px; overflow: hidden;">
          <header style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); color: #f9fafb; padding: 22px 24px;">
            <p style="margin: 0; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; opacity: 0.8;">Lexi's Kitchen Inquiry</p>
            <h2 style="margin: 10px 0 0; font-size: 24px; line-height: 1.2;">New Event Inquiry Submission</h2>
            <p style="margin: 10px 0 0; font-size: 13px; color: #d1d5db;">
              Submitted by ${escapeHtml(values.fullName)} • ${escapeHtml(values.email)}
            </p>
          </header>
          <main style="padding: 18px 20px 22px;">
            ${sectionWrapper(
              "Client Contact",
              `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${infoRow("Full Name", values.fullName)}
                ${infoRow("Email", values.email)}
                ${infoRow("Phone", values.phone)}
              </table>`,
            )}
            ${sectionWrapper(
              "Event Details",
              `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${infoRow("Event Type", values.eventType)}
                ${infoRow("Event Date", values.eventDate)}
                ${infoRow("Start Time", values.startTime)}
                ${infoRow("End Time", values.endTime)}
                ${infoRow("Guest Count", String(values.guestCount || "N/A"))}
                ${infoRow("Budget", formatCurrency(values.budget || 0))}
                ${infoRow("Setup fee", setupFee)}
                ${infoRow("Service charge", formatCurrency(estimate.serviceCharge || 0))}
                ${infoRow("Service Selection", serviceLabel || "N/A")}
              </table>`,
            )}
            ${sectionWrapper(
              "Venue and Logistics",
              `<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${infoRow("Venue", values.venue)}
                ${infoRow("Address", values.address)}
                ${infoRow("State", values.state)}
                ${infoRow("City", values.city)}
                ${infoRow("Postal code", values.zipCode)}
                ${infoRow("Venue Instructions", values.venueInstructions || "N/A")}
                ${infoRow("Stairs / Obstacles", stairsDetails)}
                ${infoRow("Parking Restrictions", parkingDetails)}
              </table>`,
            )}
            ${sectionWrapper(
              "Menu Selections",
              `<div style="display: grid; gap: 12px;">
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Nibbles</p>
                  ${buildListHtml(values.selectedNibbles)}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Mains</p>
                  ${buildListHtml(values.selectedRegularMains)}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Proteins</p>
                  ${buildListHtml(values.selectedProteins)}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Sides</p>
                  ${buildListHtml(values.selectedSides)}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Soups</p>
                  ${buildListHtml(values.selectedSoups ?? [])}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Stews</p>
                  ${buildListHtml(values.selectedStews ?? [])}
                </div>
                <div>
                  <p style="margin: 0 0 6px; font-size: 13px; color: #374151; font-weight: 700; text-transform: capitalize;">Pickup Items</p>
                  ${buildListHtml(pickupItems)}
                </div>
              </div>`,
            )}
            ${sectionWrapper(
              "Additional Notes",
              `<p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.7;">${escapeHtml(values.notes || "No additional notes provided.")}</p>`,
            )}
            ${sectionWrapper("Estimate Summary", buildEstimateHtml(estimate))}
          </main>
        </div>
      </div>
    `;

    const text = [
      "New Lexi's Kitchen inquiry",
      `Name: ${values.fullName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      `Event type: ${values.eventType}`,
      `Date: ${values.eventDate}`,
      `Start time: ${values.startTime}`,
      `End time: ${values.endTime}`,
      `Guest count: ${values.guestCount}`,
      `Budget: ${formatCurrency(values.budget || 0)}`,
      `Setup fee: ${setupFee}`,
      `Service charge: ${formatCurrency(estimate.serviceCharge || 0)}`,
      `Venue: ${values.venue}`,
      `Address: ${values.address}`,
      `State: ${values.state}`,
      `City: ${values.city}`,
      `Postal code: ${values.zipCode}`,
      `Service style: ${values.serviceStyle}`,
      `Service variant: ${values.serviceVariant || "N/A"}`,
      `Venue instructions: ${values.venueInstructions || "N/A"}`,
      `Stairs or obstacles: ${stairsDetails}`,
      `Parking restrictions: ${parkingDetails}`,
      `Nibbles: ${values.selectedNibbles.join(", ") || "None"}`,
      `Mains: ${values.selectedRegularMains.join(", ") || "None"}`,
      `Proteins: ${values.selectedProteins.join(", ") || "None"}`,
      `Sides: ${values.selectedSides.join(", ") || "None"}`,
      `Soups: ${(values.selectedSoups ?? []).join(", ") || "None"}`,
      `Stews: ${(values.selectedStews ?? []).join(", ") || "None"}`,
      `Pickup items: ${pickupItems.join(", ") || "None"}`,
      `Notes: ${values.notes || "No additional notes."}`,
      "",
      buildEstimateText(estimate),
    ].join("\n");

    await sendInquiryEmail({
      from: process.env.INQUIRY_FROM_EMAIL!,
      fromName: process.env.INQUIRY_FROM_NAME ?? "Lexi's Kitchen",
      to: process.env.INQUIRY_TO_EMAIL!,
      replyTo: values.email,
      subject: `New inquiry from ${values.fullName}`,
      html,
      text,
    });

    return NextResponse.json({
      message: "Inquiry delivered successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json(
      { error: "Unable to process the inquiry request." },
      { status: 400 },
    );
  }
}
