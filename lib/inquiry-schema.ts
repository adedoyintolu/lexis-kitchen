import { inquiryServiceOptions } from "@/data/inquiry";
import type { InquiryFormValues } from "@/types/inquiry";
import * as Yup from "yup";

const PACKAGE_STYLES = ["plated-dinner", "buffet-setup-only"];

function isWeekendDate(value?: string) {
  if (!value) {
    return false;
  }

  const date = new Date(`${value}T12:00:00`);
  const day = date.getDay();

  return day === 5 || day === 6 || day === 0;
}

export const inquiryValidationSchema = Yup.object({
  fullName: Yup.string().trim().required("Please enter the guest's full name."),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address.")
    .required("Please enter an email address."),
  phone: Yup.string().trim().required("Please enter a phone number."),
  eventType: Yup.string().required("Select an event type."),
  eventDate: Yup.string()
    .required("Please choose the event date.")
    .test(
      "pickup-weekend",
      "Pickup is only available Friday through Sunday.",
      function validatePickupDate(value) {
        if (this.parent.serviceStyle !== "pickup") {
          return true;
        }

        return isWeekendDate(value);
      },
    )
    // Test for past dates
    .test(
      "not-in-past",
      "Event date cannot be in the past.",
      function validateNotInPast(value) {
        if (!value) {
          return false;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const eventDate = new Date(`${value}T12:00:00`);

        return eventDate >= today;
      },
    ),
  startTime: Yup.string().required("Please enter the event start time."),
  endTime: Yup.string()
    .required("Please enter the event end time.")
    .test(
      "end-after-start",
      "End time must be after start time.",
      function validateEndTime(value) {
        const { startTime } = this.parent;
        if (!value || !startTime) {
          return false;
        }

        return value > startTime;
      },
    ),
  address: Yup.string().trim().required("Please enter the street address."),
  state: Yup.string().trim().required("Please enter the state."),
  zipCode: Yup.string().trim().notRequired(),
  budget: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Please enter a budget.")
    .min(0, "Budget cannot be negative.")
    .typeError("Please enter a valid number for the budget.")
    .test(
      "budget-minimum-by-service",
      "The minimum budget for our services is $1,100.",
      function (value) {
        const { serviceStyle } = this.parent;

        const selectedService = inquiryServiceOptions.find(
          (opt: { slug: string }) => opt.slug === serviceStyle,
        );

        if (!selectedService) {
          return true; // No service selected yet, skip this validation
        }

        const minimum = selectedService?.baseMinimumFoodSpend || 1100;

        if (value !== undefined && value < minimum) {
          return this.createError({
            message: `The minimum budget for ${selectedService.title} is ${minimum.toLocaleString("en-US", { style: "currency", currency: "USD" })}.`,
          });
        }

        return true;
      },
    ),
  guestCount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .when("serviceStyle", {
      is: "pickup",
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema
          .required("Enter the expected guest count.")
          .min(1, "Guest count must be at least 1."),
    })
    .test(
      "guest-count-by-service",
      "", // We leave the default message empty because we generate it dynamically below
      function (value) {
        const { serviceStyle } = this.parent;
        if (!value) return false;

        // Buffet Setup Only (Min 30)
        if (serviceStyle === "buffet-setup-only") {
          return (
            value >= 30 ||
            this.createError({
              message: "Buffet Setup requires at least 30 guests.",
            })
          );
        }

        // Plated Dinner (20 - 200)
        if (serviceStyle === "plated-dinner") {
          return (
            value >= 20 ||
            this.createError({
              message: "Plated Dinner requires at least 20 guests.",
            })
          );
        }

        // No validation for max for now
        // // Nibbles Only (Max 500)
        // if (serviceStyle === "nibbles-only") {
        //   return (
        //     value <= 500 ||
        //     this.createError({
        //       message: "Nibbles Only is limited to 500 guests.",
        //     })
        //   );
        // }

        // // Pickup (Max 1000)
        // if (serviceStyle === "pickup") {
        //   return (
        //     value <= 1000 ||
        //     this.createError({
        //       message: "Pickup service is limited to 1000 guests.",
        //     })
        //   );
        // }

        return true;
      },
    ),
  venue: Yup.string()
    .trim()
    .required("Please enter the venue or pickup reference."),
  city: Yup.string().trim().required("Please enter the city or area."),
  serviceStyle: Yup.string().required("Choose a service style."),
  serviceVariant: Yup.string()
    .test(
      "variant-required",
      "Choose the service option for this style.",
      function validateVariant(value) {
        if (
          ["nibbles-only", "full-service"].includes(this.parent.serviceStyle)
        ) {
          return Boolean(value);
        }

        return true;
      },
    )
    .default("")
    .defined(),
  selectedNibbles: Yup.array(Yup.string()).test(
    "nibbles-required",
    "", // Default message ignored
    function validateNibbles(value) {
      const style = this.parent.serviceStyle;
      const count = value?.length ?? 0;

      // 1. Nibbles Only (Min 1)
      if (style === "nibbles-only") {
        return (
          count >= 1 ||
          this.createError({
            message: "Please select at least 1 nibble choice.",
          })
        );
      }

      // 2. Package Styles (Min 4)
      if (PACKAGE_STYLES.includes(style)) {
        return (
          count >= 4 ||
          this.createError({
            message:
              "This package includes 4 nibble choices. Please select 4 or more.",
          })
        );
      }

      return true;
    },
  ),
  selectedRegularMains: Yup.array(Yup.string()).test(
    "regular-mains-required",
    "Select at least 2 regular mains for this package.",
    function validateRegularMains(value) {
      if (!PACKAGE_STYLES.includes(this.parent.serviceStyle)) {
        return true;
      }

      return (value?.length ?? 0) >= 2;
    },
  ),
  selectedPremiumMains: Yup.array(Yup.string()),
  selectedSoups: Yup.array(Yup.string()),
  selectedStews: Yup.array(Yup.string()),
  selectedProteins: Yup.array(Yup.string()).test(
    "proteins-required",
    "Select at least 2 proteins for this package.",
    function validateProteins(value) {
      if (!PACKAGE_STYLES.includes(this.parent.serviceStyle)) {
        return true;
      }

      return (value?.length ?? 0) >= 2;
    },
  ),
  selectedSides: Yup.array(Yup.string()).test(
    "sides-required",
    "Select at least 2 sides for this package.",
    function validateSides(value) {
      if (!PACKAGE_STYLES.includes(this.parent.serviceStyle)) {
        return true;
      }

      return (value?.length ?? 0) >= 2;
    },
  ),
  pickupQuantities: Yup.object()
    .test(
      "pickup-required",
      "", // Default message ignored
      function validate(value) {
        if (this.parent.serviceStyle !== "pickup") {
          return true;
        }
        const quantities = Object.values(value ?? {});
        const totalItems = quantities.reduce<number>(
          (sum, q) => sum + Number(q || 0),
          0,
        );

        // 1. Check if they selected anything at all
        if (totalItems === 0) {
          return this.createError({
            message: "Please add at least one item to your pickup order.",
          });
        }

        // 2. Check if the total meets the minimum of 10
        if (totalItems < 10) {
          return this.createError({
            message: `You have ${totalItems} items selected. A minimum of 10 items is required for pickup.`,
          });
        }

        return true;
      },
    )
    .required(),
  hasStairs: Yup.string().oneOf(["yes", "no"]).default("no"),
  hasParkingRestrictions: Yup.string().oneOf(["yes", "no"]).default("no"),
  stairsDetails: Yup.string()
    .trim()
    .when("hasStairs", {
      is: "yes",
      then: (schema) =>
        schema.required("Please provide details about the obstacles."),
      otherwise: (schema) => schema.notRequired(),
    }),
  parkingRestrictions: Yup.string()
    .trim()
    .when("hasParkingRestrictions", {
      is: "yes",
      then: (schema) =>
        schema.required(
          "Please provide details about the parking restrictions.",
        ),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const inquiryStepFields = [
  [],
  [
    "eventType",
    "eventDate",
    "guestCount",
    "venue",
    "city",
    "serviceStyle",
    "serviceVariant",
    "startTime",
    "endTime",
    "budget",
    "hasStairs",
    "stairsDetails",
    "hasParkingRestrictions",
    "parkingRestrictions",
    "address",
    "state",
    "venueInstructions",
  ],
  [
    "selectedNibbles",
    "selectedRegularMains",
    "selectedProteins",
    "selectedSides",
    "selectedSoups",
    "selectedStews",
    "pickupQuantities",
  ],
  ["fullName", "email", "phone", "notes"],
] as const;

export function getInitialInquiryValues(): InquiryFormValues {
  return {
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    guestCount: "",
    venue: "",
    address: "",
    state: "",
    city: "",
    serviceStyle: "",
    serviceVariant: "",
    selectedNibbles: [],
    selectedRegularMains: [],
    selectedPremiumMains: [],
    selectedProteins: [],
    selectedSides: [],
    selectedSoups: [],
    selectedStews: [],
    pickupQuantities: {},
    notes: "",
    budget: "",
    hasStairs: "no",
    stairsDetails: "",
    hasParkingRestrictions: "no",
    parkingRestrictions: "",
    zipCode: "",
  };
}
