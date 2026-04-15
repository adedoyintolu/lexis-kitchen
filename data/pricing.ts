import { PricingCategory } from "@/types/inquiry";

export const pricingCategories: PricingCategory[] = [
  {
    slug: "nibbles",
    label: "Nibbles",
    title: "Nibbles selections",
    description: "Large pan and small pan pricing for nibbles",
    items: [
      {
        name: "mini sliders",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "mini sandwich",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Pinwheels",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "mini meat pies",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Mini turkey sliders",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Pasta Cups",
        largePackPrice: 4,
        smallPackPrice: 0,
      },
      {
        name: "Puff puff",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Samosas",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Spring rolls",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "prawn spring rolls",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Mosa",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "Wings",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "beef kebab",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "chicken kebab",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "goat meat pepper soup",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "breadrolls or butter",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "fruit salad",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
      {
        name: "peppered kpomo",
        largePackPrice: 3,
        smallPackPrice: 0,
      },
    ],
  },
  {
    slug: "mains-premium",
    label: "Mains (Premium)",
    title: "Premium Mains selections",
    description: "Large pan and small pan pricing for premium mains offerings.",
    items: [
      {
        name: "Lexi's Special Fried Rice",
        largePackPrice: 165,
        smallPackPrice: 75,
      },
      {
        name: "Salmon",
        largePackPrice: 12,
        smallPackPrice: 0,
      },
      {
        name: "Lamb chops",
        largePackPrice: 20,
        smallPackPrice: 0,
      },
      {
        name: "Steamed  coconut Basmati Rice",
        largePackPrice: 150,
        smallPackPrice: 0,
      },
      {
        name: "Creamy Catfish nugget",
        largePackPrice: 0,
        smallPackPrice: 0,
      },
      { name: "King prawn", largePackPrice: 8, smallPackPrice: 0 },
      { name: "Seafood fried rice", largePackPrice: 180, smallPackPrice: 0 },
      { name: "Lobster", largePackPrice: 180, smallPackPrice: 0 },
      { name: "kajun pasta", largePackPrice: 150, smallPackPrice: 0 },
      { name: "Creamy Alfredo pasta", largePackPrice: 150, smallPackPrice: 0 },
      {
        name: "Tomato basil sauce pasta",
        largePackPrice: 110,
        smallPackPrice: 0,
      },
    ],
  },
  {
    slug: "mains-regular",
    label: "Mains (Regular)",
    title: "Regular Mains selections",
    description: "Large pan and small pan pricing for regular mains offerings.",
    items: [
      {
        name: "Lexi's Special Fried Rice",
        largePackPrice: 110,
        smallPackPrice: 0,
      },
      { name: "Jollof Rice", largePackPrice: 100, smallPackPrice: 0 },
      { name: "Fried Rice", largePackPrice: 100, smallPackPrice: 0 },
      { name: "Coconut Rice", largePackPrice: 100, smallPackPrice: 0 },
      { name: "White Rice", largePackPrice: 65, smallPackPrice: 0 },
    ],
  },
  {
    slug: "pasta",
    label: "Pasta",
    title: "Pasta selections",
    description:
      "Creamy and tomato-forward pasta trays for event service or pickup.",
    items: [
      {
        name: "Creamy Alfredo Pasta",
        largePackPrice: 150,
        smallPackPrice: 80,
      },
      { name: "Tomato Basil Pasta", largePackPrice: 110, smallPackPrice: 75 },
      { name: "Seafood pasta", largePackPrice: 160, smallPackPrice: 0 },
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
        smallPackPrice: 160,
      },
      {
        name: "Affang with Assorted or Goat Meat",
        largePackPrice: 350,
        smallPackPrice: 150,
      },
      {
        name: "Seafood Okro",
        smallPackPrice: 150,
      },
      {
        name: "Seafood sauce",
        largePackPrice: 150,
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
      { name: "Goat Meat Stew", largePackPrice: 400, smallPackPrice: 150 },
      {
        name: "Turkey or Chicken Stew",
        largePackPrice: 350,
        smallPackPrice: 140,
      },
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
        largePackPrice: 4,
        smallPackPrice: 0,
      },
      {
        name: "Peppered or Stewed Fish",
        largePackPrice: 4,
        smallPackPrice: 0,
      },
      {
        name: "Peppered or Stewed Chicken",
        largePackPrice: 4,
        smallPackPrice: 0,
      },
      {
        name: "Peppered or Stewed Goat Meat",
        largePackPrice: 4,
        smallPackPrice: 0,
      },
      {
        name: "Peppered or Stewed Turkey",
        largePackPrice: 4,
        smallPackPrice: 0,
      },
    ],
  },
  {
    slug: "others",
    label: "Others",
    title: "Extras and sides",
    description: "Supporting items often added to complete event packages.",
    items: [
      { name: "Gizdodo", largePackPrice: 2.5, smallPackPrice: 0 },
      { name: "Vegetable salad", largePackPrice: 2.5, smallPackPrice: 0 },
      { name: "Fried plantain", largePackPrice: 2.5, smallPackPrice: 0 },
      { name: "Moi moi ", largePackPrice: 3.5, smallPackPrice: 0 },
      { name: "Leaf moi moi ", largePackPrice: 4.5, smallPackPrice: 0 },
    ],
  },
];
