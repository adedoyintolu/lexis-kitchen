import { eventTypeOptions, inquiryServiceOptions } from "@/data/inquiry";
import { formatCurrency, getTodaysDate } from "@/lib/inquiry-estimate";
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
          {/* Service Type */}
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
                  variant="bold"
                />
              </div>
            ) : null}
          </div>

          {/* Event Form */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Event type
              </label>
              <select
                className={inputClass}
                {...formik.getFieldProps("eventType")}
              >
                <option value="" disabled>
                  Select one
                </option>
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
                min={getTodaysDate()} // This restricts the picker to today onwards
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
                Start Time
              </label>
              <input
                type="time"
                className={inputClass}
                {...formik.getFieldProps("startTime")}
              />
              <FieldError
                error={
                  getIn(formik.touched, "startTime")
                    ? getIn(formik.errors, "startTime")
                    : undefined
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                End Time
              </label>
              <input
                type="time"
                className={inputClass}
                {...formik.getFieldProps("endTime")}
              />
              <FieldError
                error={
                  getIn(formik.touched, "endTime")
                    ? getIn(formik.errors, "endTime")
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
              {selectedService?.minimumGuests && (
                <p className="mt-1 text-xs text-text-soft">
                  Minimum {selectedService.minimumGuests} guests for{" "}
                  {selectedService.title}
                </p>
              )}

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
                Event center / venue name
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
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Street Address
              </label>
              <input
                className={inputClass}
                {...formik.getFieldProps("address")}
              />
              <FieldError
                error={
                  getIn(formik.touched, "address")
                    ? getIn(formik.errors, "address")
                    : undefined
                }
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                State
              </label>
              <input
                className={inputClass}
                {...formik.getFieldProps("state")}
              />
              <FieldError
                error={
                  getIn(formik.touched, "state")
                    ? getIn(formik.errors, "state")
                    : undefined
                }
              />
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
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Venue instructions (optional)
              </label>
              <textarea
                rows={3}
                className={inputClass}
                {...formik.getFieldProps("venueInstructions")}
              />
              <FieldError
                error={
                  getIn(formik.touched, "venueInstructions")
                    ? getIn(formik.errors, "venueInstructions")
                    : undefined
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Food Budget
              </label>
              <input
                type="number"
                className={inputClass}
                min={selectedService?.baseMinimumFoodSpend || 1100}
                {...formik.getFieldProps("budget")}
              />
              <p className="mt-1 text-xs text-text-soft">
                Food spend minimum:{" "}
                {formatCurrency(
                  selectedService?.baseMinimumFoodSpend || 1100,
                ) || "$1,100"}
                . Your budget must meet or exceed this amount.
              </p>
              <FieldError
                error={
                  getIn(formik.touched, "budget")
                    ? getIn(formik.errors, "budget")
                    : undefined
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Stairs or obstacles?
              </label>
              <select
                className={inputClass + " capitalize!"}
                {...formik.getFieldProps("hasStairs")}
              >
                <option value="" disabled className="capitalize">
                  Select one
                </option>
                {["yes", "no"].map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
              <FieldError
                error={
                  getIn(formik.touched, "hasStairs")
                    ? getIn(formik.errors, "hasStairs")
                    : undefined
                }
              />
            </div>
            {formik.values.hasStairs === "yes" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-accent-soft">
                  Describe any obstacles
                </label>
                <textarea
                  rows={3}
                  className={inputClass}
                  {...formik.getFieldProps("stairsDetails")}
                />
                <FieldError
                  error={
                    getIn(formik.touched, "stairsDetails")
                      ? getIn(formik.errors, "stairsDetails")
                      : undefined
                  }
                />
              </div>
            )}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-accent-soft">
                Parking restrictions?
              </label>
              <select
                className={inputClass + " capitalize!"}
                {...formik.getFieldProps("hasParkingRestrictions")}
              >
                <option value="" disabled className="capitalize">
                  Select one
                </option>
                {["yes", "no"].map((option) => (
                  <option key={option} value={option} className="capitalize">
                    {option}
                  </option>
                ))}
              </select>
              <FieldError
                error={
                  getIn(formik.touched, "hasParkingRestrictions")
                    ? getIn(formik.errors, "hasParkingRestrictions")
                    : undefined
                }
              />
            </div>
            {formik.values.hasParkingRestrictions === "yes" && (
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-accent-soft">
                  Describe the parking restrictions
                </label>
                <textarea
                  rows={3}
                  className={inputClass}
                  {...formik.getFieldProps("parkingRestrictions")}
                />
                <FieldError
                  error={
                    getIn(formik.touched, "parkingRestrictions")
                      ? getIn(formik.errors, "parkingRestrictions")
                      : undefined
                  }
                />
              </div>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default EventDetailsStep;
