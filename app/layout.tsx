import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dukecrea.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DukeCrea — Agencia de digitalización | Software, automatización e IA en Panamá",
    template: "%s | DukeCrea",
  },
  description:
    "Somos la agencia que ayuda a PYMEs de Panamá a digitalizar sus operaciones: tiendas online, automatización de ventas y contratos, contabilidad fiscal (DGI, ITBMS) y marketing con IA. Menos trabajo manual, más ventas.",
  keywords: [
    "digitalizar negocio Panamá",
    "desarrollo de software Panamá",
    "tienda online Panamá",
    "automatización de procesos",
    "bots de Telegram",
    "sistema contable DGI ITBMS",
    "e-commerce Laravel",
    "automatización con IA",
    "DukeCrea",
  ],
  authors: [
    { name: "Antonio Duque" },
    { name: "Noe Rivas" },
  ],
  creator: "DukeCrea",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_PA",
    url: siteUrl,
    siteName: "DukeCrea",
    title: "DukeCrea — Agencia de digitalización de negocios",
    description:
      "Tiendas online, automatización de operaciones, contabilidad fiscal y marketing con IA para PYMEs de Panamá.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DukeCrea — Agencia de digitalización de negocios",
    description:
      "Software a medida, automatización e IA para digitalizar tu negocio en Panamá.",
  },
  robots: {
    index: true,
    follow: true,
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
  name: "DukeCrea",
  url: siteUrl,
  email: "duque629@gmail.com",
  description:
    "Agencia de digitalización de negocios: desarrollo de software a medida, tiendas online, automatización de procesos y soluciones con IA para PYMEs.",
  founders: [
    { "@type": "Person", name: "Antonio Duque" },
    { "@type": "Person", name: "Noe Rivas" },
  ],
  areaServed: [
    { "@type": "Country", name: "Panamá" },
    { "@type": "Country", name: "Venezuela" },
  ],
  knowsAbout: [
    "Desarrollo web",
    "E-commerce",
    "Automatización de procesos",
    "Bots de Telegram",
    "Contabilidad fiscal",
    "Inteligencia artificial",
    "Laravel",
    "Next.js",
    "Python",
  ],
  sameAs: ["https://github.com/DukeCrea", "https://www.instagram.com/dukecrea"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
