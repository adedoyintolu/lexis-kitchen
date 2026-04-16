export const pricingPageIntro = {
  eyebrow: "Pricing & services",
  title: "How our pricing system works",
  description:
    "We use a per-guest pricing model for most catered events. This allows us to scale food production, staffing, and service consistently with your needs while maintaining quality and maximizing your budget.",
  supportingText:
    "Each service style includes a base package. The base package sets the minimum food spend, includes a specific number of menu selections, and is tied to a baseline guest count when applicable.",
};

export const pricingHighlights = [
  {
    label: "Formal buffet",
    value: "$35 / guest",
    note: "Base package uses a minimum of 30 guests.",
  },
  {
    label: "Plated dinner",
    value: "$55 / guest",
    note: "Base package uses a minimum of 20 guests.",
  },
  {
    label: "Nibbles only",
    value: "$1,001+",
    note: "Minimum food spend applies for setup or passed service.",
  },
  {
    label: "Pickup",
    value: "A la carte",
    note: "No setup or service charge. Fridays through Sundays only.",
  },
];

export const pricingDefinitions = [
  {
    title: "Food Spend",
    body: "Food spend refers to the cost of food items only. It does not include service charges, setup fees, staffing, or taxes. Every service style has a minimum food spend requirement, which must be met before an inquiry can move forward.",
  },
  {
    title: "Setup Fee",
    body: "A setup fee applies to service styles that require on-site equipment or display. This can include chafing dishes, display equipment, and event setup logistics. Setup fees are separate from food spend.",
  },
  {
    title: "Service Charge",
    body: "A service charge covers operational costs related to on-site execution, coordination, display support, and base staffing structure where applicable. It is not included in food spend.",
  },
];

export const basePackageMeaning = {
  intro: "A base package includes:",
  bullets: [
    "A minimum food spend",
    "A curated number of menu selections included",
    "A baseline guest count when applicable",
  ],
  note: "The base package is designed to give you a complete meal experience. You can always add more to fit your needs, but selecting additional items beyond what is included will increase your food spend. Base packages are package-based, meaning the price includes a set minimum you must meet. You cannot select fewer items than the base package.",
};

export const basePackagesTable = [
  {
    serviceStyle: "Formal Buffet",
    foodSpendMinimum: "$1,050",
    guestRequirement: "30 guests",
    packageIncludes: "4 nibbles, 2 mains/carbs, 2 proteins, 2 sides",
    setupFee: "Yes",
    serviceCharge: "No",
  },
  {
    serviceStyle: "Plated Dinner",
    foodSpendMinimum: "$1,100",
    guestRequirement: "20 guests",
    packageIncludes: "4 nibbles, 2 mains/carbs, 2 proteins, 2 sides",
    setupFee: "No",
    serviceCharge: "Yes",
  },
  {
    serviceStyle: "Buffet (Setup Only)",
    foodSpendMinimum: "$1,050",
    guestRequirement: "30 guests",
    packageIncludes: "4 nibbles, 2 mains/carbs, 2 proteins, 2 sides",
    setupFee: "Yes",
    serviceCharge: "No",
  },
  {
    serviceStyle: "Nibbles Only",
    foodSpendMinimum: "Varies by service option",
    guestRequirement: "No fixed guest minimum",
    packageIncludes: "Minimum of 4 nibble selections",
    setupFee: "Depends on option selected",
    serviceCharge: "Depends on option selected",
  },
  {
    serviceStyle: "Abula on the Spot",
    foodSpendMinimum: "$30 per guest",
    guestRequirement: "40-80 guests",
    packageIncludes: "Amala, gbegiri, ewedu, assorted meat stew",
    setupFee: "No",
    serviceCharge: "Service review may apply",
  },
  {
    serviceStyle: "Pickup",
    foodSpendMinimum: "Menu dependent",
    guestRequirement: "None",
    packageIncludes: "Chosen a la carte by pan or item",
    setupFee: "No",
    serviceCharge: "No",
  },
];

export const servicePricingDetails = [
  {
    title: "Buffet & Plated Dinner",
    summary:
      "Both buffet and plated dinner services use the same base menu structure and allow add-ons beyond the included package.",
    sections: [
      {
        title: "What’s included in the base package",
        body: "4 nibbles, 2 mains/carbs that are not premium, 2 proteins, and 2 sides.",
      },
      {
        title: "Formal buffet pricing",
        body: "Starts at $35 per guest. Base package 30 guests. Minimum food spend: $1,050.",
      },
      {
        title: "Plated dinner pricing",
        body: "Starts at $55 per guest. Base package 20 guests. Minimum food spend: $1,100.",
      },
      {
        title: "Add-on rules",
        body: "Extra mains are charged using large-pan pricing. Extra nibbles, proteins, and sides are charged as item price multiplied by guest count.",
      },
    ],
  },
  {
    title: "Nibbles Only",
    summary:
      "Nibbles service is ideal for cocktail hours, receptions, and lighter event formats built around bite-sized selections.",
    sections: [
      {
        title: "Minimum selection",
        body: "At least 4 nibble variations should be selected for a working estimate.",
      },
      {
        title: "Pricing structure",
        body: "Nibble pricing ranges are represented per item in the menu pricing section below. No fixed guest minimum is enforced here, but a minimum food spend applies.",
      },
      {
        title: "Service options",
        body: "Setup, waitstaff passed, or pickup. Setup and passed options may include setup fees and service charges. Pickup does not include setup or service charges.",
      },
    ],
  },
  {
    title: "Buffet (Setup Only)",
    summary:
      "Buffet setup only follows the same package structure as formal buffet, but without service staff on site.",
    sections: [
      {
        title: "Pricing",
        body: "Priced the same as buffet style at $35 per guest with a 30-guest base package and $1,050 food spend minimum.",
      },
      {
        title: "Operational note",
        body: "Setup fee applies. Service charge is not included because staff are not part of this format.",
      },
    ],
  },
  {
    title: "Abula on the Spot",
    summary:
      "A focused live-service format for clients who want a signature traditional offering on site.",
    sections: [
      {
        title: "What’s included",
        body: "Abula comes with amala, gbegiri, ewedu, and assorted meat stew.",
      },
      {
        title: "Pricing",
        body: "$30 per guest with a minimum of 40 guests and a maximum of 80 guests.",
      },
    ],
  },
  {
    title: "Pickup Service",
    summary:
      "Pickup is designed for clients who want professionally prepared food without on-site service.",
    sections: [
      {
        title: "Key details",
        body: "No setup or service charges. Clients choose menu items a la carte. Pickup currently runs Fridays through Sundays.",
      },
      {
        title: "Minimums",
        body: "Menu requirements still apply based on what is selected, but pickup avoids service-related charges.",
      },
    ],
  },
];

export const additionalChargesMatrix = [
  {
    chargeType: "Setup Fee",
    appliesWhen: "Setup or display services",
    includedInFoodSpend: "No",
  },
  {
    chargeType: "Service Charge",
    appliesWhen: "On-site service styles",
    includedInFoodSpend: "No",
  },
  {
    chargeType: "Staffing Costs",
    appliesWhen: "Passed, plated, or live-service events",
    includedInFoodSpend: "No",
  },
  {
    chargeType: "Taxes",
    appliesWhen: "All applicable services",
    includedInFoodSpend: "No",
  },
];

export const importantThingsToKnow = [
  "Food spend minimums must be met for all service styles.",
  "Guest count requirements apply where specified.",
  "You are not required to finalize selections immediately.",
  "Submitting an inquiry does not obligate you to book.",
  "Estimates update in real time as you build your menu.",
  "A team member will review your inquiry after submission.",
];

export const whyWeUseMinimums = [
  "Maintain food quality",
  "Properly staff events",
  "Ensure consistent service",
];
