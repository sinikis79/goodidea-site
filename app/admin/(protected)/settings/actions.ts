"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { refreshAdminSession } from "@/lib/admin/session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_OPERATING_HOURS = 5;

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function saveOperatingHoursAction(formData: FormData) {
  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/settings?status=hours-error");
  }

  const ids = formData.getAll("id").map(String);

  for (const id of ids) {
    const label = String(formData.get(`label-${id}`) ?? "").trim();
    const value = String(formData.get(`value-${id}`) ?? "").trim();
    const order = Number(formData.get(`order-${id}`) ?? 0);
    const visible = formData.get(`visible-${id}`) === "on";

    if (!label || !value) {
      continue;
    }

    const { error } = await supabase
      .from("operating_hours")
      .update({ label, value, order, visible })
      .eq("id", id);

    if (error) {
      redirect("/admin/settings?status=hours-error");
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  await refreshAdminSession();
  redirect("/admin/settings?status=hours-saved");
}

export async function addOperatingHourAction(formData: FormData) {
  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/settings?status=hours-error");
  }

  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!label || !value) {
    redirect("/admin/settings?status=hours-required");
  }

  const { count, error: countError } = await supabase
    .from("operating_hours")
    .select("id", { count: "exact", head: true });

  if (countError) {
    redirect("/admin/settings?status=hours-error");
  }

  if ((count ?? 0) >= MAX_OPERATING_HOURS) {
    redirect("/admin/settings?status=hours-limit");
  }

  const { error } = await supabase.from("operating_hours").insert({
    label,
    value,
    order: order || (count ?? 0) + 1,
    visible: true,
  });

  if (error) {
    redirect("/admin/settings?status=hours-error");
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  await refreshAdminSession();
  redirect("/admin/settings?status=hours-saved");
}

export async function saveLocationSettingsAction(formData: FormData) {
  let supabase;

  try {
    supabase = getSupabaseAdminClient();
  } catch {
    redirect("/admin/settings?status=location-save-error");
  }

  const currentImageUrl = String(
    formData.get("current_location_image_url") ?? "",
  ).trim();
  const locationTitle = String(formData.get("location_title") ?? "").trim();
  const locationDescription = String(
    formData.get("location_description") ?? "",
  ).trim();
  const image = formData.get("location_image");
  let locationImageUrl = currentImageUrl || null;

  if (!locationTitle || !locationDescription) {
    redirect("/admin/settings?status=location-text-required");
  }

  if (image instanceof File && image.size > 0) {
    const extension = getFileExtension(image);
    const filePath = `location-${Date.now()}.${extension}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("location-images")
        .upload(filePath, image, {
          contentType: image.type || "image/jpeg",
          upsert: false,
        });

      if (uploadError) {
        redirect("/admin/settings?status=location-upload-error");
      }
    } catch {
      redirect("/admin/settings?status=location-upload-error");
    }

    const { data } = supabase.storage
      .from("location-images")
      .getPublicUrl(filePath);

    locationImageUrl = data.publicUrl;
  }

  if (!locationImageUrl) {
    redirect("/admin/settings?status=location-image-required");
  }

  try {
    const { error } = await supabase
      .from("hospital_settings")
      .update({
        location_title: locationTitle,
        location_description: locationDescription,
        location_image_url: locationImageUrl,
        location_image_alt: "오시는 길 지도 이미지",
      })
      .eq("id", 1);

    if (error) {
      redirect("/admin/settings?status=location-save-error");
    }
  } catch {
    redirect("/admin/settings?status=location-save-error");
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  await refreshAdminSession();
  redirect("/admin/settings?status=location-saved");
}
