import { routes } from "@/routes";
import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    title: "Event Inquiry",
    href: routes.inquiry,
  },
  {
    title: "Book Food Tasting",
    href: "https://calendly.com/lexis-kitchen/food-tasting",
    isExternal: true,
  },
  {
    title: "View Pricing",
    href: routes.pricing,
  },
  {
    title: "View Menu",
    href: routes.menu,
  },
];
