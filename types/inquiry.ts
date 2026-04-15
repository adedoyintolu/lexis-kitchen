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
