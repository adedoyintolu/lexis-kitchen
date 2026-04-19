import type { InquiryFormValues } from "@/types/inquiry";
import * as Yup from "yup";

const PACKAGE_STYLES = ["full-service", "buffet-setup-only"];

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
    ),
  guestCount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Enter the expected guest count.")
    .min(1, "Guest count must be at least 1.")
    .test(
      "guest-count-by-service",
      "Guest count does not match this service style.",
      function (value) {
        if (!value) {
          return false;
        }

        const { serviceStyle, serviceVariant } = this.parent;

        if (
          serviceStyle === "full-service" &&
          serviceVariant === "formal-buffet"
        ) {
          return value >= 30;
        }

        if (
          serviceStyle === "full-service" &&
          serviceVariant === "plated-dinner"
        ) {
          return value >= 20;
        }

        if (serviceStyle === "buffet-setup-only") {
          return value >= 30;
        }

        if (serviceStyle === "abula-on-the-spot") {
          return value >= 40 && value <= 80;
        }

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
    "Select at least the required nibble choices for this service.",
    function validateNibbles(value) {
      const style = this.parent.serviceStyle;

      if (style === "nibbles-only") {
        return (value?.length ?? 0) >= 1;
      }

      if (PACKAGE_STYLES.includes(style)) {
        return (value?.length ?? 0) >= 4;
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
      "Add at least one pickup item and quantity.",
      function validate(value) {
        if (this.parent.serviceStyle !== "pickup") {
          return true;
        }

        return Object.values(value ?? {}).some(
          (quantity) => Number(quantity) > 0,
        );
      },
    )
    .required(),
  notes: Yup.string().trim().default("").defined(),
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
  ],
  [
    "selectedNibbles",
    "selectedRegularMains",
    "selectedPremiumMains",
    "selectedProteins",
    "selectedSides",
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
    guestCount: "",
    venue: "",
    city: "",
    serviceStyle: "",
    serviceVariant: "",
    selectedNibbles: [],
    selectedRegularMains: [],
    selectedPremiumMains: [],
    selectedProteins: [],
    selectedSides: [],
    pickupQuantities: {},
    notes: "",
  };
}
