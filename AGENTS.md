<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project targets Next.js 16. APIs, conventions, routing behavior, and build defaults may differ from older Next.js versions. Before writing application code, install dependencies with `npm ci` and read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# DukeCrea Project Protocol

## Git Flow

- `main` is production. Do not commit directly to `main`.
- `antonio` and `noe` are working branches for changes, updates, experiments, and feature work.
- `principal` is the integration and QA branch.
- Merge flow: `antonio` or `noe` -> `principal` -> `main`.
- Before merging into `principal`, push the working branch and verify the diff is focused.
- Before merging `principal` into `main`, verify that there are no conflicts, the UI works, and all required checks pass.

## Required Checks

- Use `npm ci` for reproducible installs.
- Run `npm run lint` before approving changes.
- Run `npm run build` before merging into `principal` or `main`.
- Run `npm audit --audit-level=high` and review any high or critical dependency issues.
- Review desktop and mobile layouts for the Home page and service pages.
- Confirm metadata, sitemap, robots, canonical URLs, CTAs, and external links work.

## Credentials Protocol

- `credenciales de acceso dukecrea.txt` may be opened only when direct access to the hosting server is necessary.
- Do not commit this file.
- Do not paste credentials into chat, logs, reports, commits, or generated files.
- If server access is needed, use the minimum required information and document only the technical result, never the secret values.

## Frontend Standards

- Preserve the existing DukeCrea dark visual identity and improve incrementally instead of rebuilding from scratch.
- Keep Spanish copy polished, readable, and free of mojibake.
- Prefer Server Components by default. Move browser APIs, state, effects, and Motion interactions into focused Client Components.
- Use Tailwind CSS v4 patterns already present in the project.
- Respect `prefers-reduced-motion` for animations.
- Use `next/link` for internal routes and `rel="noopener noreferrer"` for external links opened in a new tab.
- Maintain accessible labels, semantic sections, visible focus states, and strong contrast.

## Codificación UTF-8 Estricta Y Calidad Del Español

Estas reglas son obligatorias para cualquier cambio en frontend, backend, metadatos, APIs, contenido, plantillas, datos estructurados o integraciones. Su objetivo es erradicar mojibakes, caracteres rotos, errores ortográficos, errores gramaticales y textos poco naturales en cualquier contenido que puedan leer visitantes, buscadores, asistentes de IA, vistas previas sociales o sistemas externos.

### Codificación Estricta En UTF-8

- Todo documento HTML, plantilla manual o respuesta HTML generada debe incluir `<meta charset="UTF-8">` como primera etiqueta dentro de `<head>`. En Next.js App Router, antes de aprobar un cambio se debe verificar que el documento renderizado incluya el charset UTF-8 emitido por el framework.
- Todos los archivos fuente que puedan contener texto deben guardarse en UTF-8 sin BOM, incluyendo HTML, CSS, JavaScript, TypeScript, JSX, TSX, JSON, Markdown, SVG, semillas SQL, migraciones y archivos de configuración.
- Las respuestas HTML y JSON generadas por APIs o servidores deben declarar explícitamente UTF-8 en sus cabeceras: `Content-Type: text/html; charset=utf-8` para HTML y `Content-Type: application/json; charset=utf-8` para JSON.
- Las conexiones a bases de datos, importaciones, exportaciones, scripts de datos, migraciones e integraciones externas deben preservar UTF-8 de extremo a extremo. No se deben introducir conversiones que alteren tildes, eñes, diéresis, signos de puntuación o símbolos.

### Prevención De Mojibakes Y Caracteres Rotos

- Queda prohibido usar codificaciones heredadas como ISO-8859-1, Windows-1252, MacRoman o cualquier codificación de texto que no sea UTF-8, salvo que una integración externa documentada obligue a crear un límite temporal de decodificación.
- Todo dato que viaje del backend al frontend debe validarse para evitar doble codificación, decodificación con charset incorrecto, escapes duplicados o transformaciones de texto con pérdida de información.
- Antes de fusionar cambios de contenido, se debe buscar en el código editado y en el HTML renderizado cualquier patrón de caracteres rotos como `Ã`, `Â`, `�`, `â€`, `â€“`, `â€”`, `â€˜`, `â€™`, `â€œ` o `â€�`.
- Se debe preferir siempre el uso directo de caracteres UTF-8 en textos visibles: `á`, `é`, `í`, `ó`, `ú`, `ü`, `ñ`, `Ñ`, `¿`, `?`, `¡` y `!`. Si por una razón técnica específica se usan entidades HTML como `&aacute;` o `&ntilde;`, deben usarse de forma consistente y verificarse en el resultado renderizado.

### Calidad Del Contenido En Español

- Todo texto visible para el usuario debe estar escrito en español latino pulido, con ortografía, gramática, puntuación, capitalización y tono comercial correctos.
- Debe respetarse rigurosamente el uso de tildes, diéresis, la letra eñe y los signos de apertura y cierre propios del español en títulos, menús, botones, cuerpos de contenido, metadatos, alertas, formularios, mensajes de validación, textos alternativos, JSON-LD, etiquetas visibles en sitemap y vistas previas sociales.
- Deben evitarse traducciones literales, anglicismos innecesarios y spanglish poco natural. Cuando mejore la claridad, se deben usar equivalentes naturales en español, por ejemplo `análisis de datos` en lugar de `data análisis` y `redes sociales` en lugar de abreviaturas no explicadas.
- Encabezados, CTAs, nombres de servicios, preguntas frecuentes, metadatos, datos estructurados y estados de error deben revisarse como contenido editorial, no solo como cadenas de código.
- Si se detecta un mojibake o un problema de calidad textual, se debe corregir la causa raíz en la codificación o en el texto fuente, y luego volver a revisar tanto los archivos fuente como la página renderizada antes de aprobar el cambio.
