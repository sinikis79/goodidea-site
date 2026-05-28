"use server";

import { revalidatePath } from "next/cache";
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
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("notices").insert({
    title,
    content,
    notice_type: "text",
    category,
    display_date: displayDate || null,
    published,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateNoticePaths();
  await refreshAdminSession();
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
    return;
  }

  const supabase = getSupabaseAdminClient();
  const extension = getFileExtension(image);
  const filePath = `notice-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("notice-images")
    .upload(filePath, image, {
      contentType: image.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
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
    throw new Error(error.message);
  }

  revalidateNoticePaths();
  await refreshAdminSession();
}

export async function updateNoticeStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("notices")
    .update({
      published: formData.get("published") === "on",
      category: String(formData.get("category") ?? "general"),
      display_date: String(formData.get("display_date") ?? "") || null,
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateNoticePaths();
  await refreshAdminSession();
}

export async function deleteNoticeAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("notices").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateNoticePaths();
  await refreshAdminSession();
}
