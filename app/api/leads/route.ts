import { createLead } from "@/app/lib/leads";

export const runtime = "nodejs";

function jsonResponse(payload: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(payload), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init?.headers,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
