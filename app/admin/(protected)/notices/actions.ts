"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { refreshAdminSession } from "@/lib/admin/session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function revalidateNoticePaths() {
  revalidatePath("/");
  revalidatePath("/notice");
  revalidatePath("/notice/[id]", "page");
  revalidatePath("/admin/notices");
}

export async function createTextNoticeAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "general");
  const displayDate = String(formData.get("display_date") ?? "").trim();
  const published = formData.get("published") === "on";

  if (!title || !content) {
    redirect("/admin/notices?status=notice-required");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/notices?status=notice-error");
  }

  const { error } = await supabase.from("notices").insert({
    title,
    content,
    notice_type: "text",
    category,
    display_date: displayDate || null,
    published,
  });

  if (error) {
    redirect("/admin/notices?status=notice-error");
  }

  revalidateNoticePaths();
  await refreshAdminSession();
  redirect("/admin/notices?status=notice-created");
}

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function createImageNoticeAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "general");
  const displayDate = String(formData.get("display_date") ?? "").trim();
  const published = formData.get("published") === "on";
  const image = formData.get("image");

  if (!title || !(image instanceof File) || image.size === 0) {
    redirect("/admin/notices?status=notice-image-required");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/notices?status=notice-error");
  }

  const extension = getFileExtension(image);
  const filePath = `notice-${Date.now()}.${extension}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("notice-images")
      .upload(filePath, image, {
        contentType: image.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      redirect("/admin/notices?status=notice-upload-error");
    }
  } catch {
    redirect("/admin/notices?status=notice-upload-error");
  }

  const { data } = supabase.storage
    .from("notice-images")
    .getPublicUrl(filePath);

  const { error } = await supabase.from("notices").insert({
    title,
    content,
    notice_type: "image",
    image_url: data.publicUrl,
    image_alt: title,
    category,
    display_date: displayDate || null,
    published,
  });

  if (error) {
    redirect("/admin/notices?status=notice-error");
  }

  revalidateNoticePaths();
  await refreshAdminSession();
  redirect("/admin/notices?status=notice-created");
}

export async function updateNoticeStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/notices?status=notice-error");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/notices?status=notice-error");
  }

  const { error } = await supabase
    .from("notices")
    .update({
      published: formData.get("published") === "on",
      category: String(formData.get("category") ?? "general"),
      display_date: String(formData.get("display_date") ?? "") || null,
    })
    .eq("id", id);

  if (error) {
    redirect("/admin/notices?status=notice-error");
  }

  revalidateNoticePaths();
  await refreshAdminSession();
  redirect("/admin/notices?status=notice-saved");
}

export async function deleteNoticeAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/notices?status=notice-error");
  }

  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/notices?status=notice-error");
  }

  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) {
    redirect("/admin/notices?status=notice-error");
  }

  revalidateNoticePaths();
  await refreshAdminSession();
  redirect("/admin/notices?status=notice-deleted");
}
