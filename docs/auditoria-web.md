# Auditoría web DukeCrea — Arquitectura, copy y técnicas

> Objetivo: pasar de una **home-catálogo** (todo en una página) a un **sistema de páginas** enfocado, con copy que cierra y dirige al público correcto. Documento guía para implementar por fases.

---

## 1. Resumen ejecutivo

**Diagnóstico:** la home mete 11 secciones en una sola página (Hero → Stats → Tecnologías → Servicios → Casos → Equipo → Proceso → Stack → Planes → FAQ → Contacto). Eso funciona como catálogo, no como landing: cansa, diluye el mensaje y esconde el CTA.

**Los 3 arreglos de mayor impacto:**
1. **Acortar la home** y repartir el contenido en páginas dedicadas.
2. **Reescribir el copy** de "infraestructura técnica" a "resultado de negocio".
3. **Un CTA claro y repetido** (diagnóstico gratis) como único cierre.

**Meta medible:** subir la tasa de contacto (leads/visita) y el tiempo hasta el primer clic de acción.

---

## 2. Público objetivo

Se venden a 4 segmentos (todos válidos), así que la estrategia es **un mensaje madre amplio en la home** y **segmentación en las páginas internas**:

| Segmento | Qué le duele | Qué quiere oír |
|---|---|---|
| PYMES / dueños de negocio | Procesos manuales, pierden leads, caos operativo | "Vende más y trabaja menos" |
| E-commerce / tiendas | Ventas estancadas, ads caros, sin datos | "Más ventas y ROI medible" |
| Emprendedores / marca personal | No tienen web/sistema profesional | "Tu presencia digital lista y bien hecha" |
| Empresas medianas / B2B | Necesitan software, integraciones, paneles | "Sistemas a medida que escalan contigo" |

**Mensaje madre (home):** *Digitalizamos tu negocio para que venda más, opere mejor y escale — con web, automatización, ads y software a medida.*

**Regla de copy:** hablar de **resultados y tiempo/dinero**, no de tecnología. La tecnología es el "cómo", no el titular.

---

## 3. Nueva arquitectura de información (IA)

De **1 página larga** → **sistema de páginas**:

| Página | Contenido | Rol |
|---|---|---|
| **Home** (corta) | Hero + prueba social breve + 3 servicios estrella (teaser) + 1 caso + CTA | Enganchar y dirigir |
| **/servicios** | Índice + páginas por servicio (ya existen `/servicios/[slug]`) | Profundidad + SEO |
| **/proceso** | "Cómo trabajamos" con **scrollytelling** | Confianza |
| **/casos** | Casos de éxito / portafolio | Prueba |
| **/planes** | Precios + FAQ de precios | Decisión |
| **/nosotros** | Equipo + stack + historia | Cercanía |
| **/contacto** | Formulario (el panel de leads sigue igual) | Cierre |

**Beneficio SEO:** cada página apunta a intenciones de búsqueda distintas (una URL por tema) → más tráfico orgánico que una sola home.

---

## 4. Home nueva (estructura recomendada, corta)

1. **Hero** — titular de resultado + subtítulo + CTA primario + prueba de confianza (banner animado se queda).
2. **Prueba social** — stats con count-up (15+ proyectos, 5+ años…) o logos.
3. **Servicios estrella** — 3-4 en bento grid, cada uno enlaza a su página. NO los 16.
4. **1 caso destacado** — resultado concreto + enlace a /casos.
5. **Banda "de lo manual a la IA"** — el video hero + CTA.
6. **Cierre** — CTA fuerte al diagnóstico + formulario corto o enlace a /contacto.

Todo lo demás (proceso, planes, equipo, stack, FAQ completa) → a sus páginas.

---

## 5. Copywriting

### Principios
- Titular = **beneficio**, no arquitectura. ("vende más", no "infraestructura digital").
- Subtítulo = a quién y cómo, en 1 frase clara.
- Cada sección = 1 idea + 1 CTA.
- Evitar jerga ("trazabilidad", "ecosistemas B2B") en la home; reservarla para páginas técnicas.

### Reescritura de titulares clave
**Hero — actual:** "Infraestructura digital para vender, operar y escalar"
- ✅ "Vende más y trabaja menos con sistemas y automatización a tu medida"
- ✅ "Digitalizamos tu negocio para que venda solo mientras tú operas"
- ✅ "De procesos manuales a un negocio que se opera solo"

**Subtítulo — actual:** "Diseñamos ecosistemas B2B que conectan web, e-commerce…"
- ✅ "Web, tienda online, automatizaciones y software a medida para vender más y ahorrar horas cada semana."

**Sección automatización — actual:** "Del anuncio al CRM sin perder trazabilidad"
- ✅ "Ningún lead se pierde: del anuncio a tu WhatsApp y CRM, automático"

### Biblioteca de CTAs cerradores
- "Agenda tu diagnóstico gratis — sin compromiso"
- "Descubre en 15 min cuánto puedes automatizar"
- "Quiero vender más este trimestre →"
- "Hablemos de tu próximo salto de ventas"
- "Cotiza tu proyecto en 24 h"
- Micro-copy de apoyo: "Diagnóstico inicial gratis · Sin compromiso · Respuesta en 24 h"

---

## 6. Técnicas / tecnologías "cool" (modernas y livianas)

| Técnica | Dónde aplicarla | Nota |
|---|---|---|
| **Scrollytelling / pinned** (sticky scroll) | /proceso | Efecto Desorbitante, en marca lima. `position: sticky` o GSAP ScrollTrigger (ya instalado) |
| **Bento grid** | Servicios | Grillas tipo Apple, jerarquía visual |
| **View Transitions API** | Entre páginas | Transiciones suaves ahora que dividimos |
| **Scroll horizontal** | Casos/portafolio | Recorrido lateral |
| **Count-up animado** | Stats | Números que suben al entrar en vista |
| **Botones magnéticos / tilt** | CTAs | Micro-interacción premium |
| **Marquee** | Stack (ya existe TechTicker) | Mantener |

**Rendimiento (obligatorio):** todo con `prefers-reduced-motion`, carga diferida, y animaciones solo en viewport. Nada que bloquee el render inicial.

---

## 7. Roadmap priorizado

| Fase | Qué | Impacto | Esfuerzo |
|---|---|---|---|
| **1** | Acortar home + crear /proceso, /casos, /planes, /nosotros, /contacto (mover contenido existente) | 🔥 Alto | Medio |
| **2** | Reescribir copy (hero, secciones, CTAs) con enfoque de resultado | 🔥 Alto | Bajo |
| **3** | Scrollytelling en /proceso + bento grid en servicios | Medio | Medio |
| **4** | View Transitions entre páginas + count-up + botones magnéticos | Medio | Bajo-Medio |
| **5** | Casos reales (con métricas) + testimonios | Alto (prueba) | Depende de contenido |

---

## 8. Métricas para medir el éxito
- **Tasa de contacto** (leads / visitas) — la principal.
- Clics al CTA primario.
- Scroll depth (¿llegan al cierre?).
- Tiempo de carga (Lighthouse ≥ 90).
- Posiciones SEO por página nueva.

---

## 9. Riesgos / cuidados
- No perder el **banner animado del hero** (a Duke le gusta) ni el rendimiento.
- Mantener redirecciones si cambian URLs (SEO).
- Copy en **español latino pulido**, sin mojibake (ver AGENTS.md).
- Reusar componentes existentes; no reconstruir desde cero.
