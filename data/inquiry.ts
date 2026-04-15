import { InquiryAction, ServiceStyle } from "@/types/inquiry";

export const businessInfo = {
  name: "Lexi's Kitchen",
  legalName: "Lexi's Kitchen Catering",
  shortAddress: "Houston, Texas",
  serviceArea:
    "Serving private events, corporate gatherings, and social tables.",
  phone: "(555) 123-4567",
  email: "hello@lexiskitchen.com",
  calendlyLink: "https://calendly.com/lexiskitchen/food-tasting",
  whatsAppLink: "https://wa.me/15551234567",
};

export const homepageSeo = {
  title: "Luxury Catering Inquiry",
  description:
    "Start an event inquiry, book a food tasting, review pricing, and preview menu collections for Lexi's Kitchen.",
};

export const inquiryActions: InquiryAction[] = [
  {
    label: "Start Event Inquiry",
    href: "/#process",
    variant: "primary",
    external: false,
  },
  {
    label: "Book Food Tasting",
    href: businessInfo.calendlyLink,
    variant: "secondary",
    external: true,
  },
  {
    label: "View Pricing",
    href: "/pricing",
    variant: "secondary",
    external: false,
  },
  {
    label: "View Menu",
    href: businessInfo.whatsAppLink,
    variant: "secondary",
    external: true,
  },
];

export const serviceStyles: ServiceStyle[] = [
  {
    slug: "nibbles-only",
    label: "01",
    title: "Nibbles (Only)",
    description:
      "Food spend minimum applies. Available as setup or passed hors d'oeuvres service.",
    highlights: [
      "Setup or passed presentation available",
      "Setup or passed service begins from $1,001",
      "Pickup option begins from $507",
    ],
    meta: "Ideal for receptions, openings, and elegant cocktail-style hosting.",
  },
  {
    slug: "full-service",
    label: "02",
    title: "Full Service",
    description:
      "Choose between a formal buffet or a plated dinner service with structured guest minimums.",
    highlights: [
      "Formal buffet starts at $35 per guest",
      "Formal buffet minimum is 30 guests",
      "Plated dinner starts at $55 per guest",
      "Plated dinner minimum is 20 guests",
    ],
    meta: "Designed for weddings, brand dinners, and more formal hospitality moments.",
  },
  {
    slug: "buffet-setup-only",
    label: "03",
    title: "Buffet (Setup Only)",
    description:
      "Setup only with no staff included. Setup fee applies and the base package begins at 30 guests.",
    highlights: [
      "Setup only, no on-site staff",
      "Minimum of 30 guests",
      "Best for hosts with their own service team or casual guest flow",
    ],
    meta: "A practical option when you want professional food presentation without service labor.",
  },
  {
    slug: "abula-on-the-spot",
    label: "04",
    title: "Abula on the Spot",
    description:
      "A focused live offering with amala, gbegiri, ewedu, and assorted meat stew.",
    highlights: [
      "$30 per guest",
      "Minimum of 40 guests",
      "Maximum of 80 guests",
      "Includes amala, gbegiri, ewedu, and assorted meat stew",
    ],
    meta: "Structured for a signature cultural food experience at medium-sized gatherings.",
  },
  {
    slug: "pickup",
    label: "05",
    title: "Pickup",
    description:
      "Choose your menu and collect your order with no setup or service charge attached.",
    highlights: ["Menu-led ordering", "No setup fee", "No service charge"],
    meta: "Best for clients handling logistics independently.",
  },
];

export const timelineSteps = [
  {
    title: "Choose the guest goal",
    description:
      "Guests can start an event inquiry, request pricing, book a food tasting, or ask for the menu.",
  },
  {
    title: "Select a service style",
    description:
      "Service style options mirror the current business flow, including full service, buffet setup, nibbles, pickup, and Abula on the spot.",
  },
  {
    title: "Review pricing expectations",
    description:
      "Guests see base package guidance, guest minimums, and the structured pan pricing that supports the conversation.",
  },
  {
    title: "Send a clean inquiry",
    description:
      "The intake form captures the event essentials in a format ready for backend or email automation later.",
  },
] as const;

export const inquiryIntentOptions = [
  { value: "event-inquiry", label: "Start an event inquiry" },
  { value: "food-tasting", label: "Book a food tasting" },
  { value: "pricing", label: "Review pricing" },
  { value: "menu", label: "Request menu" },
] as const;

export const eventTypeOptions = [
  { value: "corporate", label: "Corporate event" },
  { value: "birthday", label: "Birthday celebration" },
  { value: "wedding", label: "Wedding event" },
  { value: "private-dinner", label: "Private dinner" },
  { value: "other", label: "Other event" },
] as const;
