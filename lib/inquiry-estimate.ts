import {
  inquirySelectionBuckets,
  inquiryServiceOptions,
  pickupCategoryOrder,
} from "@/data/inquiry";
import { pricingCategories } from "@/data/pricing";
import type {
  InquiryEstimate,
  InquiryEstimateLineItem,
  InquiryFormValues,
  PricingCategory,
  PricingItem,
} from "@/types/inquiry";

const PACKAGE_STYLES = new Set(["plated-dinner", "buffet-setup-only"]);

function getPriceMap() {
  return new Map(
    pricingCategories.flatMap((category) =>
      category.items.map((item) => [`${category.slug}:${item.name}`, item]),
    ),
  );
}

const priceMap = getPriceMap();

function compactLineItems(
  items: Array<InquiryEstimateLineItem | null>,
): InquiryEstimateLineItem[] {
  return items.filter((item): item is InquiryEstimateLineItem => item !== null);
}

function getPricingItem(
  categorySlug: string,
  itemName: string,
): PricingItem | undefined {
  return priceMap.get(`${categorySlug}:${itemName}`);
}

function getServiceOption(serviceStyle: string) {
  return inquiryServiceOptions.find((option) => option.slug === serviceStyle);
}

function getServiceVariant(serviceStyle: string, serviceVariant: string) {
  return getServiceOption(serviceStyle)?.variants?.find(
    (variant) => variant.slug === serviceVariant,
  );
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

function countExtraSelections(selected: string[], includedCount = 0) {
  return Math.max(selected.length - includedCount, 0);
}

function sumExtraSelections(
  categorySlug: string,
  selected: string[],
  includedCount: number,
  guestCount: number,
  pricingModel: "per-guest" | "per-pan",
) {
  if (selected.length <= includedCount) {
    return 0;
  }

  return selected.slice(includedCount).reduce((total, itemName) => {
    const itemPrice =
      getPricingItem(categorySlug, itemName)?.largePackPrice ?? 0;

    if (pricingModel === "per-guest") {
      return total + itemPrice * guestCount;
    }

    return total + itemPrice;
  }, 0);
}

function buildPackageEstimate(values: InquiryFormValues): InquiryEstimate {
  const guestCount = Number(values.guestCount || 0);
  const variant =
    values.serviceStyle === "buffet-setup-only"
      ? {
          title: "Buffet setup only",
          basePerGuest: 35,
          minimumGuests: 30,
        }
      : getServiceVariant(values.serviceStyle, values.serviceVariant);

  const effectiveGuests = Math.max(
    guestCount,
    variant?.minimumGuests ?? guestCount,
  );
  const basePerGuest = variant?.basePerGuest ?? 0;
  const basePackageSubtotal = basePerGuest * effectiveGuests;

  const extraNibbles = sumExtraSelections(
    "nibbles",
    values.selectedNibbles,
    4,
    guestCount,
    "per-guest",
  );
  const extraRegularMains = sumExtraSelections(
    "mains-regular",
    values.selectedRegularMains,
    2,
    guestCount,
    "per-pan",
  );
  const premiumMains = values.selectedPremiumMains.reduce((total, itemName) => {
    const itemPrice =
      getPricingItem("mains-premium", itemName)?.largePackPrice ?? 0;
    return total + itemPrice;
  }, 0);
  const extraProteins = sumExtraSelections(
    "proteins",
    values.selectedProteins,
    2,
    guestCount,
    "per-guest",
  );
  const extraSides = sumExtraSelections(
    "others",
    values.selectedSides,
    2,
    guestCount,
    "per-guest",
  );

  const lineItems = compactLineItems([
    {
      label: "Base package",
      amount: basePackageSubtotal,
      detail: `${formatCurrency(basePerGuest)} x ${effectiveGuests} guests`,
    },
    extraNibbles > 0
      ? {
          label: "Extra nibbles",
          amount: extraNibbles,
          detail: `${countExtraSelections(values.selectedNibbles, 4)} extra selections`,
        }
      : null,
    extraRegularMains > 0
      ? {
          label: "Extra mains",
          amount: extraRegularMains,
          detail: `${countExtraSelections(values.selectedRegularMains, 2)} extra selections`,
        }
      : null,
    premiumMains > 0
      ? {
          label: "Premium mains",
          amount: premiumMains,
          detail: `${values.selectedPremiumMains.length} add-on selections`,
        }
      : null,
    extraProteins > 0
      ? {
          label: "Extra proteins",
          amount: extraProteins,
          detail: `${countExtraSelections(values.selectedProteins, 2)} extra selections`,
        }
      : null,
    extraSides > 0
      ? {
          label: "Extra sides",
          amount: extraSides,
          detail: `${countExtraSelections(values.selectedSides, 2)} extra selections`,
        }
      : null,
  ]);

  const subtotal = [
    basePackageSubtotal,
    extraNibbles,
    extraRegularMains,
    premiumMains,
    extraProteins,
    extraSides,
  ].reduce((sum, value) => sum + value, 0);

  return {
    subtotal,
    effectiveGuests,
    minimumApplied: effectiveGuests !== guestCount,
    lineItems,
    assumptions: [
      "Setup, staffing, rentals, and tax adjustments are confirmed after review.",
      "Extra mains use large-pan pricing. Extra nibbles, proteins, and sides use per-guest pricing.",
    ],
  };
}

function buildNibblesEstimate(values: InquiryFormValues): InquiryEstimate {
  const guestCount = Number(values.guestCount || 0);
  const selectedTotal = values.selectedNibbles.reduce((total, itemName) => {
    const itemPrice = getPricingItem("nibbles", itemName)?.largePackPrice ?? 0;
    return total + itemPrice * guestCount;
  }, 0);

  const minimumSubtotal = 1001;
  const subtotal = Math.max(selectedTotal, minimumSubtotal);

  return {
    subtotal,
    minimumApplied:
      subtotal === minimumSubtotal && selectedTotal < minimumSubtotal,
    lineItems: compactLineItems([
      {
        label: "Selected nibbles",
        amount: selectedTotal,
        detail: `${values.selectedNibbles.length} selections x ${guestCount} guests`,
      },
      subtotal > selectedTotal
        ? {
            label: "Minimum food spend adjustment",
            amount: subtotal - selectedTotal,
            detail: "Raised to the $1,001 minimum food spend",
          }
        : null,
    ]),
    assumptions: [
      "Setup or passed staffing adjustments are confirmed after review.",
      "Nibbles are estimated using the large-pan price field as the per-guest selection price.",
    ],
  };
}

function buildPickupEstimate(values: InquiryFormValues): InquiryEstimate {
  const lineItems = Object.entries(values.pickupQuantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([key, quantity]) => {
      const [categorySlug, ...itemParts] = key.split(":");
      const itemName = itemParts.join(":");
      const item = getPricingItem(categorySlug, itemName);
      const itemPrice = item?.largePackPrice ?? 0;

      return {
        label: itemName,
        amount: itemPrice * quantity,
        detail: `${quantity} x ${formatCurrency(itemPrice)}`,
      };
    });

  return {
    subtotal: lineItems.reduce((sum, item) => sum + item.amount, 0),
    minimumApplied: false,
    lineItems,
    assumptions: [
      "Pickup estimates use large-pan pricing only.",
      "Pickup is available Fridays through Sundays.",
    ],
  };
}

function buildAbulaEstimate(values: InquiryFormValues): InquiryEstimate {
  const guestCount = Number(values.guestCount || 0);
  const subtotal = guestCount * 30;

  return {
    subtotal,
    effectiveGuests: guestCount,
    minimumApplied: false,
    lineItems: [
      {
        label: "Abula on the Spot",
        amount: subtotal,
        detail: `${formatCurrency(30)} x ${guestCount} guests`,
      },
    ],
    assumptions: [
      "Includes amala, gbegiri, ewedu, and assorted meat stew.",
      "Guest count must remain between 40 and 80.",
    ],
  };
}

export function buildInquiryEstimate(
  values: InquiryFormValues,
): InquiryEstimate {
  if (!values.serviceStyle || !values.guestCount) {
    return {
      subtotal: 0,
      minimumApplied: false,
      lineItems: [],
      assumptions: [
        "Select a service style and guest count to see the estimate.",
      ],
    };
  }

  if (values.serviceStyle === "nibbles-only") {
    return buildNibblesEstimate(values);
  }

  if (PACKAGE_STYLES.has(values.serviceStyle)) {
    return buildPackageEstimate(values);
  }

  if (values.serviceStyle === "pickup") {
    return buildPickupEstimate(values);
  }

  return {
    subtotal: 0,
    minimumApplied: false,
    lineItems: [],
    assumptions: ["Select a valid inquiry type to generate an estimate."],
  };
}

export function getCategoryItems(categorySlug: string) {
  return (
    pricingCategories.find((category) => category.slug === categorySlug)
      ?.items ?? []
  );
}

export function getPickupCategories() {
  return pickupCategoryOrder
    .map((slug) => pricingCategories.find((category) => category.slug === slug))
    .filter((category): category is PricingCategory => Boolean(category));
}

export function getPackageBuckets() {
  return inquirySelectionBuckets;
}

export function getTodaysDate() {
  const today = new Date().toISOString().split("T")[0];

  return today;
}
