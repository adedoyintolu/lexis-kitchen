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
  premium?: boolean;
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
  | "sides"
  | "soups"
  | "stews";

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
  priceLabel?: string;
  basePerGuest?: number;
  minimumGuests?: number;
  pricingSummary: string;
  setupFee?: number;
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
  setupFee?: number;
};

export type InquiryFormValues = {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  startTime: string;
  endTime: string;
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
  selectedSoups: string[];
  selectedStews: string[];
  pickupQuantities: Record<string, number>;
  notes: string;
  address: string;
  state: string;
  venueInstructions?: string;
  budget: number | "";
  hasStairs: "yes" | "no";
  stairsDetails?: string;
  hasParkingRestrictions: "yes" | "no";
  parkingRestrictions?: string;
  zipCode: string;
};

export type InquiryEstimateLineItem = {
  label: string;
  amount: number;
  detail?: string;
};

export type InquiryEstimate = {
  subtotal: number;
  serviceCharge: number;
  effectiveGuests?: number;
  minimumApplied: boolean;
  lineItems: InquiryEstimateLineItem[];
  assumptions: string[];
};

export type InformationStepField = {
  title: string;
  content: ReactNode;
};
