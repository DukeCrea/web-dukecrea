const baseUrl = (process.env.AUDIT_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const productionUrl = "https://dukecrea.com";
const mojibakePattern = /(?:Ã.|Â.|â€|â€“|â€”|â€˜|â€™|â€œ|â€�|�)/;

function matches(html, pattern) {
  return pattern.test(html);
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

async function getText(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { response, text: await response.text() };
}

const sitemapResponse = await getText(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.response.ok) {
  throw new Error(`No se pudo leer el sitemap: HTTP ${sitemapResponse.response.status}`);
}

const paths = [...sitemapResponse.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
  match[1].replace(productionUrl, "") || "/",
);

const failures = [];

for (const path of paths) {
  const { response, text: html } = await getText(`${baseUrl}${path === "/" ? "" : path}`);
  const pageFailures = [];
  const contentType = response.headers.get("content-type") || "";

  if (response.status !== 200) pageFailures.push(`HTTP ${response.status}`);
  if (!/text\/html;\s*charset=utf-8/i.test(contentType)) pageFailures.push("Content-Type sin UTF-8");
  if (count(html, /<h1(?:\s|>)/gi) !== 1) pageFailures.push("cantidad de H1 distinta de 1");
  if (!matches(html, /<title>[^<]{10,}<\/title>/i)) pageFailures.push("title ausente o demasiado corto");
  if (!matches(html, /<meta\s+name="description"\s+content="[^"]{40,}"/i)) pageFailures.push("description ausente o demasiado corta");
  if (!matches(html, /<link\s+rel="canonical"\s+href="https:\/\/dukecrea\.com/i)) pageFailures.push("canonical ausente");
  if (!matches(html, /<meta\s+property="og:image"\s+content="https:\/\/dukecrea\.com\/og\.jpg"/i)) pageFailures.push("og:image ausente");
  if (matches(html, /<meta\s+name="robots"\s+content="[^"]*noindex/i)) pageFailures.push("URL del sitemap marcada noindex");
  if (mojibakePattern.test(html)) pageFailures.push("posible mojibake");

  const jsonLdBlocks = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (jsonLdBlocks.length === 0) pageFailures.push("JSON-LD ausente");
  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1].replaceAll("&quot;", '"').replaceAll("&amp;", "&"));
    } catch {
      pageFailures.push("JSON-LD inválido");
      break;
    }
  }

  if (pageFailures.length > 0) failures.push({ path, failures: pageFailures });
}

for (const path of ["/privacidad", "/cookies", "/terminos", "/panel"]) {
  const { response, text } = await getText(`${baseUrl}${path}`);
  if (response.status !== 200 || !/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(text)) {
    failures.push({ path, failures: ["la ruta privada/legal debe responder 200 con noindex"] });
  }
}

if (failures.length > 0) {
  console.error(JSON.stringify({ audited: paths.length, failures }, null, 2));
  process.exit(1);
}

console.log(`SEO técnico local: ${paths.length} URL indexables verificadas sin fallos.`);
