import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { services, siteConfig } from "./lib/site";
import { AnalyticsScripts } from "./analytics-scripts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Agencia de software e IA en Panamá y Venezuela | DukeCrea",
    template: "%s | DukeCrea",
  },
  description:
    "Agencia de software, e-commerce, automatización con IA y Ads para empresas en Panamá y Venezuela. Infraestructura digital B2B con operación multi-país.",
  keywords: [
    "DukeCrea",
    "desarrollo de software",
    "páginas web corporativas",
    "WordPress",
    "Shopify",
    "e-commerce",
    "landing pages",
    "automatización con IA",
    "chatbot WhatsApp",
    "SEO GEO",
    "Google Ads",
    "Meta Ads",
    "análisis de datos",
  ],
  authors: [{ name: "Antonio Duque" }, { name: "Noe Rivas" }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PA",
    url: "/",
    siteName: siteConfig.name,
    title: "DukeCrea - Software, automatización e IA para negocios",
    description:
      "Infraestructura web, e-commerce, WordPress, Shopify, software a medida, automatizaciones, SEO/GEO, Ads y paneles inteligentes.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DukeCrea — de procesos manuales a inteligencia artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DukeCrea - Software, automatización e IA para negocios",
    description:
      "Digitaliza tu negocio con sistemas, automatizaciones, Ads, SEO/GEO y marketing con IA.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  description:
    "Firma tecnológica de infraestructura digital: desarrollo web, WordPress, Shopify, software a medida, automatización, Ads, SEO/GEO, paneles e IA.",
  founders: [
    { "@type": "Person", name: "Antonio Duque" },
    { "@type": "Person", name: "Noe Rivas" },
  ],
  areaServed: [
    { "@type": "Country", name: "Panamá" },
    { "@type": "Country", name: "Venezuela" },
  ],
  sameAs: [siteConfig.github, siteConfig.instagram],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soluciones DukeCrea",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        url: `${siteConfig.url}/servicios/${service.slug}`,
        description: service.metaDescription,
      },
    })),
  },
};

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        {children}
        <AnalyticsScripts />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
