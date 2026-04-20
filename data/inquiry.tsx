import { PricingBreakdown } from "@/components/layout/pricing-breakdown";
import { getInitialInquiryValues } from "@/lib/inquiry-schema";
import type {
  InformationStepField,
  InquiryAction,
  InquiryFormValues,
  InquirySelectionBucket,
  InquiryServiceOption,
  ServiceStyle,
} from "@/types/inquiry";

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

export const inquiryServiceOptions: InquiryServiceOption[] = [
  {
    slug: "buffet-setup-only",
    title: "Buffet (Setup Only)",
    description: "Setup only with no staff service during the event.",
    summary:
      "Pricing follows the buffet package structure with a setup fee applied separately.",
    badge: "$35 / guest",
    minimumGuests: 30,
    basePerGuest: 35,
    basePricingLabel: "$35 per guest",
    leadNote:
      "Includes 4 nibbles, 2 non-premium mains, 2 proteins, and 2 sides. Minimum 30 guests.",
  },

  {
    slug: "plated-dinner",
    title: "Plated Dinner",
    description:
      "A formal dinner service with a structured guest minimum and a set menu.",
    summary:
      "Plated dinner starts at $55 per guest with a minimum of 20 guests.",
    badge: "$55 / guest",
    minimumGuests: 20,
    maximumGuests: 200,
    basePerGuest: 55,
    basePricingLabel: "$55 per guest",
    leadNote:
      "Includes 4 nibbles, 2 non-premium mains, 2 proteins, and 2 sides. Minimum 20 guests.",
  },
  {
    slug: "nibbles-only",
    title: "Nibbles Only",
    description:
      "A lighter event service built around passed or beautifully set nibbles.",
    summary:
      "Food spend minimum applies. Setup or passed service begins from $1,001.",
    badge: "From $1,001",
    baseMinimumFoodSpend: 1001,
    basePerGuest: 1001,
    basePricingLabel: "Food spend minimum from $1,001",
    leadNote:
      "Select the nibbles you want and we will apply the minimum food spend if the estimate falls below it.",
    variants: [
      {
        slug: "setup",
        title: "Setup",
        description: "Food is delivered and set up for service.",
        priceLabel: "Quoted from menu selections",
        pricingSummary: "Setup fee applies and is finalized after review.",
      },
      {
        slug: "passed",
        title: "Passed",
        description:
          "Waitstaff pass the selected nibbles throughout the event.",
        priceLabel: "Quoted from menu selections",
        pricingSummary: "Staffing adjustments are finalized after review.",
      },
    ],
  },

  {
    slug: "pickup",
    title: "Pickup",
    description:
      "Choose your menu by pan and collect it with no setup or service charge.",
    summary: "Pickup ordering is available Fridays through Sundays only.",
    badge: "Pan pricing",
    basePricingLabel: "Priced per large pan",
    leadNote:
      "Pickup orders are calculated from selected large-pan quantities only.",
    availabilityNote: "Pickup is available Fridays through Sundays.",
  },
];

export const inquirySelectionBuckets: InquirySelectionBucket[] = [
  {
    key: "nibbles",
    title: "Nibbles",
    description:
      "Choose the nibbles that define the welcome and cocktail experience.",
    categorySlug: "nibbles",
    pricingModel: "per-guest",
    includedCount: 4,
    helperText:
      "Base package includes 4 nibble selections. Extra nibble selections are charged per guest.",
  },
  {
    key: "regularMains",
    title: "Main dishes",
    description: "Select non-premium mains included in the base package.",
    categorySlug: "mains-regular",
    pricingModel: "per-pan",
    includedCount: 2,
    helperText:
      "Base package includes 2 regular mains. Additional mains are charged using large-pan pricing.",
  },
  {
    key: "premiumMains",
    title: "Premium mains",
    description:
      "Optional premium upgrades for clients who want more elevated mains.",
    categorySlug: "mains-premium",
    pricingModel: "per-pan",
    optional: true,
    helperText:
      "Premium mains are always treated as add-ons and charged using large-pan pricing.",
  },
  {
    key: "proteins",
    title: "Proteins",
    description: "Choose the proteins for the event spread.",
    categorySlug: "proteins",
    pricingModel: "per-guest",
    includedCount: 2,
    helperText:
      "Base package includes 2 protein selections. Extra proteins are charged per guest.",
  },
  {
    key: "sides",
    title: "Sides",
    description: "Finish the menu with supporting sides and event staples.",
    categorySlug: "others",
    pricingModel: "per-guest",
    includedCount: 2,
    helperText:
      "Base package includes 2 sides. Extra side selections are charged per guest.",
  },
];

export const pickupCategoryOrder = [
  "mains-regular",
  "mains-premium",
  "pasta",
  "soups",
  "stews",
  "proteins",
  "others",
] as const;

export const inquiryInitialValues: InquiryFormValues =
  getInitialInquiryValues();

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

export const informationStepFields: InformationStepField[] = [
  {
    title: "Managing your Budget",
    content: (
      <>
        <span>
          Planning your event budget is an important part of the process. Our
          inquiry system is designed to give you clear guidance while allowing
          flexibility to customize your menu.
        </span>
        <div className="my-2">
          To generate an accurate estimate, we’ll ask for:
        </div>
        <ul className="list-disc list-inside">
          <li>Event date and location</li>
          <li>Estimated guest count</li>
          <li>Service style selection</li>
          <li>Menu selections</li>
        </ul>
        <div className="mt-2">
          You’ll see estimated totals update as you build your menu.
        </div>
      </>
    ),
  },
  {
    title: "How our pricing works",
    content: (
      <>
        <div>
          We use a per-guest pricing model for most services. Each service style
          includes a base package that covers a curated selection of menu items.
          You’re welcome to customize beyond the base package at any time.
        </div>
        <div className="mt-2">
          Your estimate updates automatically as selections are added.
        </div>
      </>
    ),
  },
  {
    title: "Service and Pricing Breakdown",
    content: <PricingBreakdown />,
  },
  {
    title: "Additional Charges & Notes",
    content: (
      <>
        <div className="mb-2">
          Depending on your selections, your estimate may include:
        </div>

        <ul className="list-disc list-inside">
          <li>Service charge</li>
          <li>Staffing fees</li>
          <li>Setup or equipment fees</li>
          <li>Applicable taxes</li>
        </ul>
        <div className="mt-2">
          All estimated costs are shown clearly before you submit your inquiry.
        </div>
      </>
    ),
  },
  {
    title: "What happens next",
    content: (
      <>
        <div className="mb-4 rounded-[1.45rem] border border-danger bg-danger/10 p-5 shadow-[0_20px_60px_rgba(49,40,33,0.08)] text-sm leading-7 font-medium text-danger">
          If you get stuck, need clarification or help understanding the menu
          and pricing, you can click on the Event Inquiry link in the navigation
          bar. You will be able to return exactly where you left off and
          continue your inquiry.
        </div>
        <b>What Happens After You Submit</b>
        <div className="my-2">Once your inquiry is submitted:</div>
        <ul className="list-disc list-inside">
          <li>A team member reviews your selections</li>
          <li>We may reach out with follow-up questions</li>
          <li>
            You’ll receive a detailed proposal if your event is a good fit
          </li>
        </ul>
        <div className="mt-2">
          Submitting an inquiry does not obligate you to book.
        </div>
      </>
    ),
  },
];
