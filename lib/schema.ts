import { businessInfo, pricingCategories, serviceStyles } from "@/data/inquiry";

export function buildInquiryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CateringService",
    name: businessInfo.name,
    areaServed: businessInfo.shortAddress,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    url: "https://lexiskitchen.example.com",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catering offerings",
      itemListElement: serviceStyles.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
    makesOffer: pricingCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MenuItem",
          name: item.name,
        },
      })),
    ),
  };
}
