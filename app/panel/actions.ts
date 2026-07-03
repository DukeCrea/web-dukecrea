"use server";

import { createHash } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { updateLeadStatus } from "../lib/leads";

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
