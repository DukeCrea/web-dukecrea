import type { MetadataRoute } from "next";
import { services, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/venezuela`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    ...services.map((service) => ({
      url: `${siteConfig.url}/servicios/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: service.category === "dev" ? 0.9 : 0.85,
    })),
  ];
}
