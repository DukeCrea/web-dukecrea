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

const siteUrl = "https://web-dukecrea.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DukeCrea — Desarrollador Full-Stack | Node.js, Python, React & IA",
    template: "%s | DukeCrea",
  },
  description:
    "Construyo soluciones digitales escalables: aplicaciones web, bots de Telegram y automatización con IA. Especializado en Node.js, Python, React y Next.js.",
  keywords: [
    "desarrollador full-stack",
    "Node.js",
    "Python",
    "React",
    "Next.js",
    "automatización IA",
    "bots Telegram",
    "DukeCrea",
  ],
  authors: [{ name: "DukeCrea", url: "https://github.com/DukeCrea" }],
  creator: "DukeCrea",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "DukeCrea",
    title: "DukeCrea — Desarrollador Full-Stack",
    description:
      "Construyo soluciones digitales escalables: aplicaciones web, bots de Telegram y automatización con IA.",
  },
  twitter: {
    card: "summary",
    title: "DukeCrea — Desarrollador Full-Stack",
    description:
      "Soluciones digitales escalables con Node.js, Python, React y automatización con IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "DukeCrea",
  url: siteUrl,
  email: "duque629@gmail.com",
  jobTitle: "Desarrollador Full-Stack",
  knowsAbout: ["Node.js", "Python", "React", "Next.js", "TypeScript", "Automatización con IA"],
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
