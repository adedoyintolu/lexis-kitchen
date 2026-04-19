import { ReactNode } from "react";

export type InquiryAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  external: boolean;
};

export type ServiceStyle = {
  slug: string;
  label: string;
  title: string;
  description: string;
  highlights: string[];
  meta: string;
};

export type PricingItem = {
  name: string;
  largePackPrice?: number;
  smallPackPrice?: number;
  note?: string;
};

export type PricingCategory = {
  slug: string;
  label: string;
  title: string;
  description: string;
  items: PricingItem[];
};

export type MenuCollectionItem = {
  name: string;
  description: string;
  tag?: string;
};

export type MenuCollection = {
  slug: string;
  label: string;
  title: string;
  description: string;
  items: MenuCollectionItem[];
};

export type InquirySelectionBucketKey =
  | "nibbles"
  | "regularMains"
  | "premiumMains"
  | "proteins"
  | "sides";

export type InquirySelectionBucket = {
  key: InquirySelectionBucketKey;
  title: string;
  description: string;
  categorySlug: string;
  pricingModel: "per-guest" | "per-pan";
  includedCount?: number;
  optional?: boolean;
  helperText: string;
};

export type InquiryServiceVariant = {
  slug: string;
  title: string;
  description: string;
  priceLabel: string;
  basePerGuest?: number;
  minimumGuests?: number;
  pricingSummary: string;
};

export type InquiryServiceOption = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  badge: string;
  minimumGuests?: number;
  maximumGuests?: number;
  basePerGuest?: number;
  baseMinimumFoodSpend?: number;
  basePricingLabel: string;
  leadNote: string;
  variants?: InquiryServiceVariant[];
  availabilityNote?: string;
};

export type InquiryFormValues = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: number | "";
  venue: string;
  city: string;
  serviceStyle: string;
  serviceVariant: string;
  selectedNibbles: string[];
  selectedRegularMains: string[];
  selectedPremiumMains: string[];
  selectedProteins: string[];
  selectedSides: string[];
  pickupQuantities: Record<string, number>;
  notes: string;
};

export type InquiryEstimateLineItem = {
  label: string;
  amount: number;
  detail?: string;
};

export type InquiryEstimate = {
  subtotal: number;
  effectiveGuests?: number;
  minimumApplied: boolean;
  lineItems: InquiryEstimateLineItem[];
  assumptions: string[];
};

export type InformationStepField = {
  title: string;
  content: ReactNode;
};
