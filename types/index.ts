import { StaticImageData } from "next/image";

export type NavItem = {
  title: string;
  href: string;
  isExternal?: boolean;
  background: StaticImageData;
};
