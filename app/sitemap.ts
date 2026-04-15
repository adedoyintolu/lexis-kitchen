import { routes } from "@/routes";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://inquiry.lexkitchen.com";

  const sitemapEntries = Object.keys(routes).map((routeKey) => ({
    url: `${baseUrl}${routes[routeKey as keyof typeof routes]}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: routeKey === "" ? 1 : 0.8,
  }));

  return sitemapEntries;
}
