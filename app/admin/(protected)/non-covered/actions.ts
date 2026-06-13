"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { refreshAdminSession } from "@/lib/admin/session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function revalidateNonCoveredPaths() {
  revalidatePath("/care/non-covered");
  revalidatePath("/admin/non-covered");
}

function getItemPayload(formData: FormData) {
  return {
    category: String(formData.get("category") ?? "").trim(),
    name: String(formData.get("name") ?? "").trim(),
    price: String(formData.get("price") ?? "").trim(),
    note: String(formData.get("note") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
    visible: formData.get("visible") === "on",
  };
}

export async function saveNonCoveredSettingsAction(formData: FormData) {
  const introText = String(formData.get("intro_text") ?? "").trim();
  const noteText = String(formData.get("note_text") ?? "").trim();

  if (!introText || !noteText) {
    redirect("/admin/non-covered?status=settings-required");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/non-covered?status=settings-error");
  }

  const { error } = await supabase.from("non_covered_settings").upsert({
    id: 1,
    intro_text: introText,
    note_text: noteText,
  });

  if (error) {
    redirect("/admin/non-covered?status=settings-error");
  }

  revalidateNonCoveredPaths();
  await refreshAdminSession();
  redirect("/admin/non-covered?status=settings-saved");
}

export async function addNonCoveredItemAction(formData: FormData) {
  const payload = getItemPayload(formData);

  if (!payload.category || !payload.name || !payload.price) {
    redirect("/admin/non-covered?status=item-required");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/non-covered?status=item-error");
  }

  const { error } = await supabase.from("non_covered_items").insert(payload);

  if (error) {
    redirect("/admin/non-covered?status=item-error");
  }

  revalidateNonCoveredPaths();
  await refreshAdminSession();
  redirect("/admin/non-covered?status=item-added");
}

export async function updateNonCoveredItemAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const payload = getItemPayload(formData);

  if (!id || !payload.category || !payload.name || !payload.price) {
    redirect("/admin/non-covered?status=item-required");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/non-covered?status=item-error");
  }

  const { error } = await supabase
    .from("non_covered_items")
    .update(payload)
    .eq("id", id);

  if (error) {
    redirect("/admin/non-covered?status=item-error");
  }

  revalidateNonCoveredPaths();
  await refreshAdminSession();
  redirect("/admin/non-covered?status=item-saved");
}

export async function deleteNonCoveredItemAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    redirect("/admin/non-covered?status=item-error");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/non-covered?status=item-error");
  }

  const { error } = await supabase.from("non_covered_items").delete().eq("id", id);

  if (error) {
    redirect("/admin/non-covered?status=item-error");
  }

  revalidateNonCoveredPaths();
  await refreshAdminSession();
  redirect("/admin/non-covered?status=item-deleted");
}
