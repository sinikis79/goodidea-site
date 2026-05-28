"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { refreshAdminSession } from "@/lib/admin/session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_DOCTORS = 4;

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function addDoctorImageAction(formData: FormData) {
  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/doctors?status=doctor-error");
  }

  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    redirect("/admin/doctors?status=doctor-image-required");
  }

  const { count, error: countError } = await supabase
    .from("doctors")
    .select("id", { count: "exact", head: true });

  if (countError) {
    redirect("/admin/doctors?status=doctor-error");
  }

  if ((count ?? 0) >= MAX_DOCTORS) {
    redirect("/admin/doctors?status=doctor-limit");
  }

  const order = Number(formData.get("order") ?? (count ?? 0) + 1);
  const extension = getFileExtension(image);
  const filePath = `doctor-${Date.now()}.${extension}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from("doctor-images")
      .upload(filePath, image, {
        contentType: image.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      redirect("/admin/doctors?status=doctor-upload-error");
    }
  } catch {
    redirect("/admin/doctors?status=doctor-upload-error");
  }

  const { data } = supabase.storage
    .from("doctor-images")
    .getPublicUrl(filePath);

  const { error: insertError } = await supabase.from("doctors").insert({
    name: "의료진 소개",
    title: "이미지",
    specialty: "의료진 소개 이미지",
    education: "",
    career: "",
    image_url: data.publicUrl,
    order,
    visible: true,
  });

  if (insertError) {
    redirect("/admin/doctors?status=doctor-error");
  }

  revalidatePath("/doctors");
  revalidatePath("/admin/doctors");
  await refreshAdminSession();
  redirect("/admin/doctors?status=doctor-created");
}

export async function updateDoctorImageMetaAction(formData: FormData) {
  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/doctors?status=doctor-error");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect("/admin/doctors?status=doctor-error");
  }

  const { error } = await supabase
    .from("doctors")
    .update({
      order: Number(formData.get("order") ?? 0),
      visible: formData.get("visible") === "on",
    })
    .eq("id", id);

  if (error) {
    redirect("/admin/doctors?status=doctor-error");
  }

  revalidatePath("/doctors");
  revalidatePath("/admin/doctors");
  await refreshAdminSession();
  redirect("/admin/doctors?status=doctor-saved");
}
