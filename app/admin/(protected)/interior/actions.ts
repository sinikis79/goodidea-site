"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

function revalidateInteriorPaths() {
  revalidatePath("/");
  revalidatePath("/admin/interior");
}

export async function addInteriorImageAction(formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const order = Number(formData.get("order") ?? 0);
  const extension = getFileExtension(image);
  const filePath = `interior-${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("interior-images")
    .upload(filePath, image, {
      contentType: image.type || "image/jpeg",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage
    .from("interior-images")
    .getPublicUrl(filePath);

  const { error } = await supabase.from("interior_images").insert({
    title: "",
    image_url: data.publicUrl,
    image_alt: "판교다시봄 정신건강의학과 내부 공간",
    order,
    visible: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateInteriorPaths();
  redirect("/admin/interior?status=added");
}

export async function updateInteriorImageAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("interior_images")
    .update({
      order: Number(formData.get("order") ?? 0),
      visible: formData.get("visible") === "on",
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateInteriorPaths();
  redirect("/admin/interior?status=saved");
}

export async function deleteInteriorImageAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("interior_images").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidateInteriorPaths();
  redirect("/admin/interior?status=deleted");
}
