import { eventTypeOptions, inquiryServiceOptions } from "@/data/inquiry";
import { InquiryFormValues, InquiryServiceOption } from "@/types/inquiry";
import type { FormikProps } from "formik";
import { getIn } from "formik";
import { SectionCard } from "../section-card";
import { ServiceCard } from "../service-card";
import { FieldError, inputClass } from "../utils";

const EventDetailsStep = ({
  formik,
  selectedService,
}: {
  formik: FormikProps<InquiryFormValues>;
  selectedService: InquiryServiceOption | undefined;
}) => {
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
  return (
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
            <input className={inputClass} {...formik.getFieldProps("city")} />
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
                selected, the next step adapts automatically to the right menu
                structure and pricing rules.
              </p>
              <div className="grid gap-3">
                {inquiryServiceOptions.map((option) => (
                  <ServiceCard
                    key={option.slug}
                    title={option.title}
                    description={option.summary}
                    priceLabel={option.badge}
                    selected={formik.values.serviceStyle === option.slug}
                    onClick={() => handleServiceStyleChange(option.slug)}
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
                      selected={formik.values.serviceVariant === variant.slug}
                      onClick={() =>
                        formik.setFieldValue("serviceVariant", variant.slug)
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
  );
};

export default EventDetailsStep;
