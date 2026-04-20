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
    body: "Food spend refers to the cost of food items only. It does not include service charges, setup fees, staffing, or taxes. Every service style has a minimum food spend requirement, which must be met in order to proceed with an inquiry. Selecting additional items beyond what is included in a base package will increase your food spend.",
  },
  {
    title: "Setup Fee",
    body: "A setup fee applies to service styles that require on-site equipment, or display. This includes items such as chafing dishes, display equipment, and event setup logistics. Setup fees are separate from food spend and are shown clearly in your estimate when applicable.",
  },
  {
    title: "Service Charge",
    body: "A service charge covers operational costs related to service execution, associated on-site equipment, or display setup required, coordination, and base staffing support.  This charge is calculated as a percentage of your food spend and applies only to service styles that include on-site service.",
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
    serviceStyle: "Buffet (Setup Only)",
    foodSpendMinimum: "$1,050",
    guestRequirement: "30 guests",
    packageIncludes: "4 nibbles, 2 mains/carbs, 2 proteins, 2 sides",
    setupFee: "Yes",
    serviceCharge: "Yes",
  },
  {
    serviceStyle: "Plated Dinner",
    foodSpendMinimum: "$1,100",
    guestRequirement: "20 guests",
    packageIncludes: "4 nibbles, 2 mains/carbs, 2 proteins, 2 sides",
    setupFee: "Yes",
    serviceCharge: "Yes",
  },
  {
    serviceStyle: "Nibbles Only",
    foodSpendMinimum: "Varies: Setup, Passed, Pickup",
    guestRequirement: "No guest minimum",
    packageIncludes: "Minimum of 4 nibbles",
    setupFee: "Depends on option selected",
    serviceCharge: "Yes",
  },
  {
    serviceStyle: "Pickup",
    foodSpendMinimum: "Lower minimum",
    guestRequirement: "None",
    packageIncludes: "Menu dependent",
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
        body: "4 nibbles, 2 mains/carbs, 2 proteins, and 2 sides. You may add more items at any time. Additional menu items are priced individually per pan",
      },
      {
        title: "Buffet Service",
        body: "Buffet service with professional setup. Equipment included. No waitstaff service",
      },
      {
        title: "Pricing",
        body: "Starts at $35 per guest. Base package 30 guests. Minimum food spend: $1,050.",
      },
      {
        title: "Plated dinner pricing",
        body: "Formal plated service that starts at $55 per guest in a coordinated dining experience. Base package 20 guests. Minimum food spend: $1,100. 1 Professional waitstaff included (this may increase depending on your guest count or menu selections and will be determined by our team to be added to your invoice.). Additional menu selections beyond the base package will increase the food spend. Service charge and staffing fees apply.",
      },
      {
        title: "Add-on rules",
        body: "Additional menu selections beyond the base package will increase the food spend. A setup fee applies. Service charge and staffing fees do not apply.",
      },
    ],
  },
  {
    title: "Nibbles Only",
    summary:
      "Nibbles service is ideal for cocktail hours, receptions, and casual events.",
    sections: [
      {
        title: "Minimum selection",
        body: "At least 4 nibble variations",
      },
      {
        title: "Pricing structure",
        body: "Nibbles range between $3-$5 per item. No guest minimum, but a minimum food spend applies.",
      },
      {
        title: "Service options",
        body: "Setup, waitstaff passed, or pickup. Each service option has its own minimum food spend. Setup and passed options may include setup fees and service charges. Pickup does not include setup or service charges.",
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
        body: "All menus available. No setup or service charges. Lower minimum food spend compared to setup services.",
      },
      {
        title: "Minimum requirements",
        body: "Minimum food spend and menu requirements still apply and must be met before submission.",
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
    appliesWhen: "Plated, Passed",
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
