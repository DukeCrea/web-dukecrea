import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Dominios de medición autorizados a ejecutar scripts.
 *
 * Sin esta lista la política bloquea el archivo de Google Analytics y el de
 * Clarity, y la web parece no recibir visitas aunque las tenga. Se enumeran uno
 * por uno a propósito: abrir `script-src` a `https:` dejaría entrar cualquier
 * script de terceros, que es justo lo que esta cabecera debe impedir.
 */
const analyticsScriptHosts = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://www.clarity.ms",
  "https://*.clarity.ms",
  "https://va.vercel-scripts.com",
].join(" ");

const contentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${analyticsScriptHosts}${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self';
  connect-src 'self' https:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  poweredByHeader: false,
  /**
   * `www` servía la web con estado 200 igual que el dominio raíz, así que el
   * sitio existía en dos direcciones a la vez. Los canonical apuntan al raíz,
   * pero un 308 evita que los buscadores tengan que deducirlo y que la
   * autoridad se reparta entre los dos hosts.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.dukecrea.com" }],
        destination: "https://dukecrea.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
