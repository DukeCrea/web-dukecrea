import type { Metadata } from "next";

import { siteConfig } from "./site";

export const CONTENT_LAST_UPDATED = "2026-08-17";
export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export const defaultSocialImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "DukeCrea: software, automatización, marketing y datos para empresas",
};

export function buildMetadata({
  title,
  description,
  path,
  locale = "es_PA",
  index = true,
}: {
  title: string;
  description: string;
  path: string;
  locale?: "es_PA" | "es_VE";
  index?: boolean;
}): Metadata {
  const canonical = path === "/" ? "/" : path;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultSocialImage.url],
    },
    robots: index
      ? undefined
      : {
          index: false,
          follow: true,
        },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.url}${items.at(-1)?.path || "/"}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
