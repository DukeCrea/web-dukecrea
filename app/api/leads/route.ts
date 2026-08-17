import { createLead } from "@/app/lib/leads";

export const runtime = "nodejs";

const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 8;
const maxRequestBytes = 32 * 1024;
const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function jsonResponse(payload: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "local"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();

  if (rateLimitBuckets.size > 500) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(bucketKey);
    }
  }

  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return { limited: false, retryAfter: 0 };
  }

  current.count += 1;

  if (current.count > maxRequestsPerWindow) {
    return {
      limited: true,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  return { limited: false, retryAfter: 0 };
}

function hasFilledHoneypot(body: unknown) {
  if (!body || typeof body !== "object") return false;
  const { website } = body as { website?: unknown };
  return typeof website === "string" && website.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse(
        { ok: false, message: "El formulario debe enviarse como JSON válido." },
        { status: 415 },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
      return jsonResponse(
        { ok: false, message: "La solicitud supera el tamaño permitido." },
        { status: 413 },
      );
    }

    const body = await request.json();

    if (hasFilledHoneypot(body)) {
      return jsonResponse({ ok: true }, { status: 202 });
    }

    const rateLimit = checkRateLimit(getClientKey(request));

    if (rateLimit.limited) {
      return jsonResponse(
        {
          ok: false,
          message: "Recibimos muchas solicitudes seguidas. Inténtalo nuevamente en unos minutos.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfter),
          },
        },
      );
    }

    const lead = await createLead(body);

    return jsonResponse(
      {
        ok: true,
        lead: {
          id: lead.id,
          status: lead.status,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No pudimos registrar la solicitud. Inténtalo nuevamente.";

    return jsonResponse(
      {
        ok: false,
        message,
      },
      { status: 400 },
    );
  }
}
