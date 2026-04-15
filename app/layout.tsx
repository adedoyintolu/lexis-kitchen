import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inquiry.lexkitchen.com"),
  title: {
    default: "Lexi's Kitchen | Event Catering Inquiry",
    template: "%s | Lexi's Kitchen",
  },
  description:
    "A premium inquiry experience for Lexi's Kitchen catering, pricing, food tasting requests, and menu previews.",
  openGraph: {
    title: "Lexi's Kitchen",
    description:
      "Event catering inquiries, pricing, menu previews, and food tasting bookings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lexi's Kitchen",
    description:
      "Event catering inquiries, pricing, menu previews, and food tasting bookings.",
  },
  category: "Food and Drink",
};

export const viewport: Viewport = {
  themeColor: "#f5f1ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
