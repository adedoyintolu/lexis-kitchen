import Navbar from "@/components/layout/navbar";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://inquiry.lexkitchen.com"),
  title: {
    default: "SavorByLexi | Event Catering Inquiry",
    template: "%s | SavorByLexi",
  },
  description:
    "A premium inquiry experience for SavorByLexi catering, pricing, food tasting requests, and menu previews.",
  openGraph: {
    title: "SavorByLexi",
    description:
      "Event catering inquiries, pricing, menu previews, and food tasting bookings.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SavorByLexi",
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
