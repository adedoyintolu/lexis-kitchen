// import inquiryImage from "@/assets/home-sections/inquiry.jpg";
import menuImage from "@/assets/home-sections/menu.jpg";
import pricingImage from "@/assets/home-sections/pricing.jpg";
import tastingImage from "@/assets/home-sections/tasting.jpg";
import { routes } from "@/routes";
import { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  // {
  //   title: "Event inquiry",
  //   href: routes.inquiry,
  //   background: inquiryImage,
  // },
  {
    title: "Book food tasting",
    href: "https://calendly.com/lexis-kitchen/food-tasting",
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
