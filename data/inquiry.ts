import {
  InquiryAction,
  MenuCollection,
  PricingCategory,
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

export const pricingCategories: PricingCategory[] = [
  {
    slug: "rice",
    label: "Rice",
    title: "Rice selections",
    description:
      "Large pan and small pan pricing for signature rice offerings.",
    items: [
      {
        name: "Lexi's Special Fried Rice",
        largePackPrice: 165,
        smallPackPrice: 75,
      },
      { name: "Jollof Rice", largePackPrice: 85, smallPackPrice: 45 },
      { name: "Fried Rice", largePackPrice: 90, smallPackPrice: 50 },
      { name: "Coconut Rice", largePackPrice: 120, smallPackPrice: 60 },
    ],
  },
  {
    slug: "pasta",
    label: "Pasta",
    title: "Pasta selections",
    description:
      "Creamy and tomato-forward pasta trays for event service or pickup.",
    items: [
      { name: "Creamy Pasta", largePackPrice: 150, smallPackPrice: 80 },
      { name: "Tomato Basil Pasta", largePackPrice: 150, smallPackPrice: 75 },
    ],
  },
  {
    slug: "soups",
    label: "Soups",
    title: "Soup selections",
    description:
      "Traditional soup offerings with assorted protein notes preserved.",
    items: [
      {
        name: "Egusi Soup with Assorted",
        largePackPrice: 250,
        smallPackPrice: 120,
      },
      { name: "Eforiro", largePackPrice: 250, smallPackPrice: 130 },
      {
        name: "Edikaikong with Assorted or Goat Meat",
        largePackPrice: 350,
        smallPackPrice: 140,
      },
      {
        name: "Affang with Assorted or Goat Meat",
        largePackPrice: 350,
        smallPackPrice: 150,
      },
      {
        name: "Seafood Okro",
        smallPackPrice: 150,
        note: "Small pan only",
      },
    ],
  },
  {
    slug: "stews",
    label: "Stews",
    title: "Stew selections",
    description:
      "Large-format stews for buffet, pickup, and menu customization.",
    items: [
      { name: "Designer Stew", largePackPrice: 400, smallPackPrice: 180 },
      { name: "Assorted Meat Stew", largePackPrice: 400, smallPackPrice: 150 },
      { name: "Goat Stew", largePackPrice: 400, smallPackPrice: 150 },
      { name: "Turkey Stew", largePackPrice: 350, smallPackPrice: 140 },
      { name: "Chicken Stew", largePackPrice: 350, smallPackPrice: 140 },
    ],
  },
  {
    slug: "proteins",
    label: "Proteins",
    title: "Protein selections",
    description:
      "Peppered and stewed proteins with large and small pan pricing.",
    items: [
      {
        name: "Peppered or Stewed Beef",
        largePackPrice: 350,
        smallPackPrice: 150,
      },
      {
        name: "Peppered or Stewed Fish",
        largePackPrice: 250,
        smallPackPrice: 100,
      },
      {
        name: "Peppered or Stewed Chicken",
        largePackPrice: 200,
        smallPackPrice: 85,
      },
      {
        name: "Peppered or Stewed Goat Meat",
        largePackPrice: 450,
        smallPackPrice: 200,
      },
      {
        name: "Peppered or Stewed Turkey",
        largePackPrice: 220,
        smallPackPrice: 90,
      },
    ],
  },
  {
    slug: "others",
    label: "Others",
    title: "Extras and sides",
    description: "Supporting items often added to complete event packages.",
    items: [
      { name: "Salad", largePackPrice: 150, smallPackPrice: 80 },
      { name: "Gizdodo", largePackPrice: 170, smallPackPrice: 80 },
    ],
  },
];

export const menuCollections: MenuCollection[] = [
  {
    slug: "signature-mains",
    label: "Collection 01",
    title: "Signature mains",
    description:
      "Popular guest-facing dishes drawn from the current pricing menu.",
    items: [
      {
        name: "Jollof Rice",
        description:
          "Classic event favorite for buffet service and pickup orders.",
      },
      {
        name: "Lexi's Special Fried Rice",
        description: "House signature rice offering for elevated menus.",
        tag: "Signature",
      },
      {
        name: "Creamy Pasta",
        description:
          "Rich pasta option suited to both buffet and plated menus.",
      },
    ],
  },
  {
    slug: "soups-and-swallow",
    label: "Collection 02",
    title: "Soups and swallow",
    description:
      "Structured for traditional food service and Abula-led experiences.",
    items: [
      {
        name: "Egusi Soup with Assorted",
        description: "Well-suited to traditional event service.",
      },
      {
        name: "Ewedu and Gbegiri",
        description: "Core to the Abula on the spot service format.",
        tag: "Abula",
      },
      {
        name: "Affang and Edikaikong",
        description: "Premium soup options with assorted or goat meat.",
      },
    ],
  },
  {
    slug: "proteins-and-sides",
    label: "Collection 03",
    title: "Proteins and sides",
    description:
      "Flexible add-ons that complete both tasting and event packages.",
    items: [
      {
        name: "Peppered Goat Meat",
        description: "A premium protein option with strong event appeal.",
      },
      {
        name: "Peppered Turkey",
        description: "Ideal as a buffet side protein or cocktail addition.",
      },
      {
        name: "Gizdodo",
        description: "Popular side item for curated event menus.",
      },
    ],
  },
  {
    slug: "event-additions",
    label: "Collection 04",
    title: "Event additions",
    description:
      "Helpful supporting options around inquiry, tasting, and planning.",
    items: [
      {
        name: "Book food tasting",
        description: "Redirect guests to Calendly for tasting appointments.",
        tag: "Planning",
      },
      {
        name: "Pricing review",
        description:
          "Guide guests toward pan pricing and per-guest package starting points.",
        tag: "Planning",
      },
      {
        name: "Menu request on WhatsApp",
        description:
          "Send the complete menu directly in chat after interest is confirmed.",
        tag: "Workflow",
      },
    ],
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
