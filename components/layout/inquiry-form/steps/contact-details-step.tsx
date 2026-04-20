import { formatCurrency } from "@/lib/inquiry-estimate";
import { InquiryFormValues, InquiryServiceOption } from "@/types/inquiry";
import { FormikProps, getIn } from "formik";
import { ReviewList } from "../review-list";
import { SectionCard } from "../section-card";
import { classNames, FieldError, inputClass } from "../utils";

const ContactDetailsStep = ({
  formik,
  selectedService,
}: {
  formik: FormikProps<InquiryFormValues>;
  selectedService: InquiryServiceOption | undefined;
}) => {
  const selectedVariant = selectedService?.variants?.find(
    (variant) => variant.slug === formik.values.serviceVariant,
  );

  return (
    <div className="fade-in" style={{ ["--delay" as string]: "0s" }}>
      <SectionCard
        title="Contact details and final review"
        description="Add your contact details and any final notes for the team. Review your selections on the right, then submit your inquiry to receive a custom proposal within 1-2 business days."
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
                  `Service Style: ${selectedVariant?.title || selectedService?.title || "Not selected"}`,
                  `Guest Count: ${formik.values.guestCount ? `${formik.values.guestCount} guests` : "Not set"}`,
                  `Event Date: ${formik.values.eventDate || "Not set"}`,
                  `Start Time: ${formik.values.startTime || "Not set"}`,
                  `End Time: ${formik.values.endTime || "Not set"}`,
                  `Venue: ${formik.values.venue || "Not set"}`,
                  `Address: ${formik.values.address || "Not set"}`,
                  `State: ${formik.values.state || "Not set"}`,
                  `City: ${formik.values.city || "Not set"}`,
                  `Budget: ${formik.values.budget ? formatCurrency(formik.values.budget) : "Not set"}`,
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
        </div>
      </SectionCard>
    </div>
  );
};

export default ContactDetailsStep;
