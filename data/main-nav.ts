import inquiryImage from "@/assets/home-sections/inquiry.jpeg";
import menuImage from "@/assets/home-sections/menu.jpeg";
import pricingImage from "@/assets/home-sections/pricing.jpeg";
import tastingImage from "@/assets/home-sections/tasting.jpeg";
import { routes } from "@/routes";
import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    title: "Event inquiry",
    href: routes.inquiry,
    background: inquiryImage,
  },
  {
    title: "Book food tasting",
    href: "https://doodle.com/bp/lexis1/book-food-tasting",
    isExternal: true,
    background: tastingImage,
  },
  {
    title: "View pricing",
    href: routes.pricing,
    background: pricingImage,
  },
  {
    title: "View menu",
    href: routes.menu,
    background: menuImage,
  },
];
