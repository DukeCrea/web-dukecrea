"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  addLeadNote,
  createManualLead,
  deleteLead,
  updateLeadDetails,
  updateLeadStatus,
} from "../lib/leads";
import { createTrabajo, deleteTrabajo, updateTrabajo } from "../lib/trabajos";

const cookieName = "dukecrea_panel";

function getPanelPassword() {
  const configured = process.env.DUKECREA_PANEL_PASSWORD?.trim();
  if (configured) return configured;
  return process.env.NODE_ENV === "production" ? "" : "dukecrea-local";
}

function getSessionValue() {
  const password = getPanelPassword();
  if (!password) return "";
  return createHash("sha256").update(`dukecrea-panel:${password}`).digest("hex");
}

export async function panelPasswordConfigured() {
  return Boolean(getPanelPassword());
}

export async function isPanelAuthorized() {
  const sessionValue = getSessionValue();
  if (!sessionValue) return false;
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value === sessionValue;
}

export async function loginPanel(formData: FormData) {
  const password = String(formData.get("password") || "");
  const sessionValue = getSessionValue();

  if (!sessionValue) {
    redirect("/panel?error=config");
  }

  if (password !== getPanelPassword()) {
    redirect("/panel?error=invalid");
  }

  const cookieStore = await cookies();
  cookieStore.set(cookieName, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/panel",
    maxAge: 60 * 60 * 8,
  });

  redirect("/panel");
}

export async function logoutPanel() {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/panel",
    maxAge: 0,
  });

  redirect("/panel");
}

export async function setLeadStatus(formData: FormData) {
  const authorized = await isPanelAuthorized();
  if (!authorized) {
    redirect("/panel?error=session");
  }

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  await updateLeadStatus(id, status);
  revalidatePath("/panel");
  redirect(`/panel?status=${encodeURIComponent(status)}`);
}

/**
 * Envuelve una acción del panel: exige sesión y convierte cualquier fallo en un
 * mensaje visible, en vez de la pantalla de error de Next.
 *
 * `redirect` funciona lanzando una excepción, así que hay que dejarla pasar o
 * cada redirección correcta se reportaría como error.
 */
async function accionProtegida(destino: string, tarea: () => Promise<void>) {
  const authorized = await isPanelAuthorized();
  if (!authorized) {
    redirect("/panel?error=session");
  }

  try {
    await tarea();
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") throw error;
    if (typeof error === "object" && error && "digest" in error) {
      const digest = String((error as { digest?: unknown }).digest || "");
      if (digest.startsWith("NEXT_REDIRECT")) throw error;
    }
    const mensaje = error instanceof Error ? error.message : "No pudimos completar la acción.";
    redirect(`${destino}${destino.includes("?") ? "&" : "?"}aviso=${encodeURIComponent(mensaje)}`);
  }
}

function texto(formData: FormData, campo: string) {
  return String(formData.get(campo) || "");
}

export async function crearLeadManual(formData: FormData) {
  let destino = "/panel";

  await accionProtegida("/panel", async () => {
    const lead = await createManualLead({
      name: texto(formData, "name"),
      company: texto(formData, "company"),
      email: texto(formData, "email"),
      phone: texto(formData, "phone"),
      projectType: texto(formData, "projectType"),
      need: texto(formData, "need"),
      budget: texto(formData, "budget"),
      message: texto(formData, "message"),
      origin: texto(formData, "origin"),
      status: texto(formData, "status"),
      valueUsd: texto(formData, "valueUsd"),
      nextAction: texto(formData, "nextAction"),
      nextActionAt: texto(formData, "nextActionAt"),
    });
    destino = `/panel/leads/${lead.id}`;
  });

  revalidatePath("/panel");
  redirect(destino);
}

export async function guardarSeguimiento(formData: FormData) {
  const id = texto(formData, "id");

  await accionProtegida(`/panel/leads/${id}`, async () => {
    await updateLeadDetails(id, {
      status: texto(formData, "status"),
      valueUsd: texto(formData, "valueUsd"),
      nextAction: texto(formData, "nextAction"),
      nextActionAt: texto(formData, "nextActionAt"),
    });
  });

  revalidatePath(`/panel/leads/${id}`);
  revalidatePath("/panel");
  redirect(`/panel/leads/${id}`);
}

export async function agregarNota(formData: FormData) {
  const id = texto(formData, "id");

  await accionProtegida(`/panel/leads/${id}`, async () => {
    await addLeadNote(id, texto(formData, "nota"));
  });

  revalidatePath(`/panel/leads/${id}`);
  redirect(`/panel/leads/${id}`);
}

export async function borrarLead(formData: FormData) {
  const id = texto(formData, "id");

  await accionProtegida(`/panel/leads/${id}`, async () => {
    await deleteLead(id);
  });

  revalidatePath("/panel");
  redirect("/panel");
}

function datosTrabajo(formData: FormData) {
  return {
    leadId: texto(formData, "leadId"),
    cliente: texto(formData, "cliente"),
    titulo: texto(formData, "titulo"),
    estado: texto(formData, "estado"),
    montoUsd: texto(formData, "montoUsd"),
    cobradoUsd: texto(formData, "cobradoUsd"),
    fechaInicio: texto(formData, "fechaInicio"),
    fechaEntrega: texto(formData, "fechaEntrega"),
    notas: texto(formData, "notas"),
  };
}

export async function crearTrabajo(formData: FormData) {
  const destino = texto(formData, "volverA") || "/panel/trabajos";

  await accionProtegida(destino, async () => {
    await createTrabajo(datosTrabajo(formData));
  });

  revalidatePath("/panel/trabajos");
  redirect(destino);
}

export async function actualizarTrabajo(formData: FormData) {
  const id = texto(formData, "id");

  await accionProtegida("/panel/trabajos", async () => {
    await updateTrabajo(id, datosTrabajo(formData));
  });

  revalidatePath("/panel/trabajos");
  redirect("/panel/trabajos");
}

export async function borrarTrabajo(formData: FormData) {
  const id = texto(formData, "id");

  await accionProtegida("/panel/trabajos", async () => {
    await deleteTrabajo(id);
  });

  revalidatePath("/panel/trabajos");
  redirect("/panel/trabajos");
}
