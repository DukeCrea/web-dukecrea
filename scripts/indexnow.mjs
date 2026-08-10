#!/usr/bin/env node
/**
 * Avisa a los buscadores que soportan IndexNow (Bing, Yandex, Seznam, Naver)
 * de que las URLs del sitemap cambiaron.
 *
 * Sin esto hay que esperar a que el rastreador pase por su cuenta, que en un
 * dominio nuevo y sin autoridad puede tardar semanas. Con esto, minutos.
 *
 * Uso:
 *   node scripts/indexnow.mjs            → envía todas las URLs del sitemap
 *   node scripts/indexnow.mjs <url> ...  → envía solo esas URLs
 *
 * La clave vive en public/<clave>.txt: el buscador la descarga desde el propio
 * dominio para comprobar que quien avisa es el dueño del sitio.
 */

import { readdir } from "node:fs/promises";

const HOST = "dukecrea.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function findKey() {
  const files = await readdir(new URL("../public/", import.meta.url));
  const keyFile = files.find((file) => /^[a-f0-9]{8,128}\.txt$/i.test(file));
  if (!keyFile) throw new Error("No encuentro el archivo de clave en public/");
  return keyFile.replace(/\.txt$/i, "");
}

async function urlsFromSitemap() {
  const response = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!response.ok) throw new Error(`sitemap.xml devolvió ${response.status}`);
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

const key = await findKey();
const urlList = process.argv.slice(2).length ? process.argv.slice(2) : await urlsFromSitemap();

if (urlList.length === 0) {
  console.error("No hay URLs que enviar.");
  process.exit(1);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList,
  }),
});

// 200 = aceptado, 202 = aceptado pero la clave aún se está validando.
console.log(`IndexNow: HTTP ${response.status} · ${urlList.length} URLs enviadas`);
if (![200, 202].includes(response.status)) {
  console.error(await response.text());
  process.exit(1);
}
