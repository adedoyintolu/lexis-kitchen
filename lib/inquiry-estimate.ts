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

function normalizeLookupPart(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function buildLookupKey(categorySlug: string, itemName: string) {
  return `${normalizeLookupPart(categorySlug)}:${normalizeLookupPart(itemName)}`;
}

function getPriceMap() {
  const map = new Map<string, PricingItem>();

  pricingCategories.forEach((category) => {
    category.items.forEach((item) => {
      map.set(`${category.slug}:${item.name}`, item);
      map.set(buildLookupKey(category.slug, item.name), item);
    });
  });

  return map;
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
  return (
    priceMap.get(`${categorySlug}:${itemName}`) ??
    priceMap.get(buildLookupKey(categorySlug, itemName))
  );
}

export function getServiceOption(serviceStyle: string) {
  return inquiryServiceOptions.find((option) => option.slug === serviceStyle);
}

export function getServiceVariant(
  serviceStyle: string,
  serviceVariant: string,
) {
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
  const selectedVariant = getServiceVariant(
    values.serviceStyle,
    values.serviceVariant,
  );
  const serviceOption = getServiceOption(values.serviceStyle);
  const basePerGuest =
    selectedVariant?.basePerGuest ?? serviceOption?.basePerGuest ?? 0;
  const minimumGuests =
    selectedVariant?.minimumGuests ?? serviceOption?.minimumGuests ?? 0;

  const effectiveGuests = Math.max(guestCount, minimumGuests);
  const baseMinimum = basePerGuest * effectiveGuests;

  // Price every selected item individually
  const nibblesTotal = (values.selectedNibbles ?? []).reduce(
    (total, itemName) => {
      return (
        total +
        (getPricingItem("nibbles", itemName)?.largePackPrice ?? 0) * guestCount
      );
    },
    0,
  );

  const mainsTotal = (values.selectedRegularMains ?? []).reduce(
    (total, itemName) => {
      return (
        total + (getPricingItem("mains-regular", itemName)?.largePackPrice ?? 0)
      );
    },
    0,
  );

  const proteinsTotal = (values.selectedProteins ?? []).reduce(
    (total, itemName) => {
      return (
        total +
        (getPricingItem("proteins", itemName)?.largePackPrice ?? 0) * guestCount
      );
    },
    0,
  );

  const sidesTotal = (values.selectedSides ?? []).reduce((total, itemName) => {
    return (
      total +
      (getPricingItem("others", itemName)?.largePackPrice ?? 0) * guestCount
    );
  }, 0);

  const addOnSoups = (values.selectedSoups ?? []).reduce((total, itemName) => {
    return total + (getPricingItem("soups", itemName)?.largePackPrice ?? 0);
  }, 0);

  const addOnStews = (values.selectedStews ?? []).reduce((total, itemName) => {
    return total + (getPricingItem("stews", itemName)?.largePackPrice ?? 0);
  }, 0);

  const itemsTotal =
    nibblesTotal +
    mainsTotal +
    proteinsTotal +
    sidesTotal +
    addOnSoups +
    addOnStews;

  const setupFee =
    getServiceVariant(values.serviceStyle, values.serviceVariant)?.setupFee ??
    getServiceOption(values.serviceStyle)?.setupFee ??
    0;

  const subtotal = itemsTotal + setupFee;
  const serviceCharge = 0.25 * subtotal;

  const lineItems = compactLineItems([
    {
      label: `Base package minimum`,
      amount: baseMinimum,
      detail: `${formatCurrency(basePerGuest)} x ${effectiveGuests} guests`,
    },
    nibblesTotal > 0
      ? {
          label: `Nibbles (${(values.selectedNibbles ?? []).length} selections)`,
          amount: nibblesTotal,
          detail: `${(values.selectedNibbles ?? []).length} x ${guestCount} guests`,
        }
      : null,
    mainsTotal > 0
      ? {
          label: `Mains (${(values.selectedRegularMains ?? []).length} selections)`,
          amount: mainsTotal,
          detail: `Per large pan`,
        }
      : null,
    proteinsTotal > 0
      ? {
          label: `Proteins (${(values.selectedProteins ?? []).length} selections)`,
          amount: proteinsTotal,
          detail: `${(values.selectedProteins ?? []).length} x ${guestCount} guests`,
        }
      : null,
    sidesTotal > 0
      ? {
          label: `Sides (${(values.selectedSides ?? []).length} selections)`,
          amount: sidesTotal,
          detail: `${(values.selectedSides ?? []).length} x ${guestCount} guests`,
        }
      : null,
    addOnSoups > 0
      ? {
          label: "Soups",
          amount: addOnSoups,
          detail: `${(values.selectedSoups ?? []).length} selection${(values.selectedSoups ?? []).length > 1 ? "s" : ""}`,
        }
      : null,
    addOnStews > 0
      ? {
          label: "Stews",
          amount: addOnStews,
          detail: `${(values.selectedStews ?? []).length} selection${(values.selectedStews ?? []).length > 1 ? "s" : ""}`,
        }
      : null,
    setupFee > 0 ? { label: "Setup fee", amount: setupFee } : null,
    { label: "Service charge (25%)", amount: serviceCharge },
  ]);

  const meetsMinimums =
    (values.selectedNibbles?.length ?? 0) >= 4 &&
    (values.selectedRegularMains?.length ?? 0) >= 2 &&
    (values.selectedProteins?.length ?? 0) >= 2 &&
    (values.selectedSides?.length ?? 0) >= 2;

  return {
    subtotal: subtotal + serviceCharge,
    serviceCharge,
    effectiveGuests,
    minimumApplied: !meetsMinimums,
    lineItems,
    assumptions: [
      "Mains are priced per large pan. Nibbles, proteins, and sides are priced per guest.",
      "The base package requires at least 4 nibbles, 2 mains, 2 proteins, and 2 sides.",
    ],
  };
}

function buildNibblesEstimate(values: InquiryFormValues): InquiryEstimate {
  const guestCount = Number(values.guestCount || 0);
  const hasGuestCount = guestCount > 0;

  const selectedTotal = hasGuestCount
    ? values.selectedNibbles.reduce((total, itemName) => {
        const itemPrice =
          getPricingItem("nibbles", itemName)?.largePackPrice ?? 0;
        return total + itemPrice * guestCount;
      }, 0)
    : 0;

  const minimumFoodSpend = 1001;
  const belowMinimum = hasGuestCount && selectedTotal < minimumFoodSpend;
  const setupFee =
    getServiceVariant(values.serviceStyle, values.serviceVariant)?.setupFee ??
    getServiceOption(values.serviceStyle)?.setupFee ??
    0;

  // Always reflect actual selections — never silently inflate to the minimum
  const subtotal = selectedTotal + setupFee;
  const serviceCharge = 0.25 * subtotal;

  const lineItems = compactLineItems([
    values.selectedNibbles.length > 0
      ? {
          label: "Selected nibbles",
          amount: selectedTotal,
          detail: hasGuestCount
            ? `${values.selectedNibbles.length} selections x ${guestCount} guests`
            : `${values.selectedNibbles.length} selections — set guest count to price`,
        }
      : null,
    setupFee > 0 ? { label: "Setup fee", amount: setupFee } : null,
    serviceCharge > 0
      ? { label: "Service charge", amount: serviceCharge }
      : null,
  ]);

  return {
    subtotal: subtotal + serviceCharge,
    serviceCharge,
    minimumApplied: belowMinimum,
    lineItems,
    assumptions: [
      "Setup or passed staffing adjustments are confirmed after review.",
      "Nibbles are priced per guest based on the large-pan rate per item.",
      ...(!hasGuestCount
        ? [
            "Set a guest count on the event details step to calculate the full nibbles estimate.",
          ]
        : []),
    ],
  };
}

function buildPickupEstimate(values: InquiryFormValues): InquiryEstimate {
  const lineItems = Object.entries(values.pickupQuantities)
    .filter(([, quantity]) => quantity > 0)
    .map(([key, quantity]) => {
      const [categorySlug, ...itemParts] = key.split(":");
      const itemName = itemParts.join(":").split(" - ")[0].trim();
      const item = getPricingItem(categorySlug, itemName);
      const itemPrice = item?.largePackPrice ?? 0;
      return {
        label: itemName,
        amount: itemPrice * quantity,
        detail: `${quantity} x ${formatCurrency(itemPrice)}`,
      };
    });

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    subtotal,
    serviceCharge: 0,
    minimumApplied: false,
    lineItems,
    assumptions: [
      "Pickup estimates use large-pan pricing only.",
      "Pickup is available Fridays through Sundays.",
      "No setup fee or service charge applies to pickup orders.",
    ],
  };
}

function buildAbulaEstimate(values: InquiryFormValues): InquiryEstimate {
  const guestCount = Number(values.guestCount || 0);
  const subtotal = guestCount * 30;
  const serviceCharge = 0.25 * subtotal;

  return {
    subtotal: subtotal + serviceCharge,
    serviceCharge,
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
  if (!values.serviceStyle) {
    return {
      subtotal: 0,
      serviceCharge: 0,
      minimumApplied: false,
      lineItems: [],
      assumptions: ["Select a service style to see the estimate."],
    };
  }

  if (values.serviceStyle === "pickup") {
    return buildPickupEstimate(values);
  }

  if (values.serviceStyle === "nibbles-only") {
    return buildNibblesEstimate(values);
  }

  if (!values.guestCount) {
    return {
      subtotal: 0,
      serviceCharge: 0,
      minimumApplied: false,
      lineItems: [],
      assumptions: ["Set a guest count to calculate this service estimate."],
    };
  }

  if (PACKAGE_STYLES.has(values.serviceStyle)) {
    return buildPackageEstimate(values);
  }

  if (values.serviceStyle === "abula-on-the-spot") {
    return buildAbulaEstimate(values);
  }

  return {
    subtotal: 0,
    serviceCharge: 0,
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
