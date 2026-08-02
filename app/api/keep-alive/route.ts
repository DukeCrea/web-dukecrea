import { pingLeadsStore } from "@/app/lib/leads";

export const runtime = "nodejs";

/**
 * El plan gratuito de Supabase pausa los proyectos tras unos días sin actividad,
 * y un proyecto pausado deja de registrar los leads que llegan.
 * Un cron diario (ver `vercel.json`) toca la base para mantenerla despierta.
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim();

  if (cronSecret) {
    const authorization = request.headers.get("authorization");

    if (authorization !== `Bearer ${cronSecret}`) {
      return Response.json({ ok: false }, { status: 401 });
    }
  }

  try {
    await pingLeadsStore();
    return Response.json({ ok: true, checkedAt: new Date().toISOString() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No pudimos consultar la base de datos.";

    return Response.json({ ok: false, message }, { status: 503 });
  }
}
