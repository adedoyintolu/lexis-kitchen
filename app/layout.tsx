import Navbar from "@/components/layout/navbar";
import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
