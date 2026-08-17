import type { MetadataRoute } from "next";
import { caseStudies, resourceArticles, solutionHubs } from "./lib/content";
import { industrias } from "./lib/industrias";
import { CONTENT_LAST_UPDATED } from "./lib/seo";
import { services, siteConfig } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const socialImage = `${siteConfig.url}/og.jpg`;
  const entry = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: string = CONTENT_LAST_UPDATED,
  ) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    images: [socialImage],
  });

  return [
    entry("", 1),
    entry("/servicios", 0.95),
    entry("/casos", 0.9),
    entry("/recursos", 0.9, "weekly"),
    entry("/nosotros", 0.8),
    entry("/contacto", 0.85),
    entry("/venezuela", 0.95),
    ...solutionHubs.map((hub) => entry(`/soluciones/${hub.slug}`, 0.9)),
    ...industrias.map((industria) => entry(`/industrias/${industria.slug}`, 0.95)),
    ...services.map((service) => entry(`/servicios/${service.slug}`, service.category === "dev" ? 0.9 : 0.85)),
    ...caseStudies.map((item) => entry(`/casos/${item.slug}`, 0.82, "yearly")),
    ...resourceArticles.map((article) => entry(`/recursos/${article.slug}`, 0.88, "monthly", article.updatedAt)),
  ];
}
