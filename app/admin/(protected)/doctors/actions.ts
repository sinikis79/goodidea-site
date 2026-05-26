"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_DOCTORS = 4;

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function addDoctorImageAction(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return;
  }

  const { count, error: countError } = await supabase
    .from("doctors")
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw new Error(countError.message);
  }

  if ((count ?? 0) >= MAX_DOCTORS) {
    return;
  }

  const order = Number(formData.get("order") ?? (count ?? 0) + 1);
  const extension = getFileExtension(image);
  const filePath = `doctor-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("doctor-images")
    .upload(filePath, image, {
      contentType: image.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
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
    throw new Error(insertError.message);
  }

  revalidatePath("/doctors");
  revalidatePath("/admin/doctors");
}

export async function updateDoctorImageMetaAction(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { error } = await supabase
    .from("doctors")
    .update({
      order: Number(formData.get("order") ?? 0),
      visible: formData.get("visible") === "on",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/doctors");
  revalidatePath("/admin/doctors");
}
