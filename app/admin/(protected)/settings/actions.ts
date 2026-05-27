"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_OPERATING_HOURS = 5;

function getFileExtension(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension && /^[a-z0-9]+$/.test(extension) ? extension : "jpg";
}

export async function saveOperatingHoursAction(formData: FormData) {
  const supabase = getSupabaseAdminClient();
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
      throw new Error(error.message);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function addOperatingHourAction(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);

  if (!label || !value) {
    throw new Error("진료시간 라벨과 내용을 입력해주세요.");
  }

  const { count, error: countError } = await supabase
    .from("operating_hours")
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw new Error(countError.message);
  }

  if ((count ?? 0) >= MAX_OPERATING_HOURS) {
    throw new Error("진료시간은 최대 5줄까지 등록할 수 있습니다.");
  }

  const { error } = await supabase.from("operating_hours").insert({
    label,
    value,
    order: order || (count ?? 0) + 1,
    visible: true,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function saveLocationSettingsAction(formData: FormData) {
  const supabase = getSupabaseAdminClient();
  const locationTitle = String(formData.get("location_title") ?? "").trim();
  const locationDescription = String(
    formData.get("location_description") ?? "",
  ).trim();
  const currentImageUrl = String(
    formData.get("current_location_image_url") ?? "",
  ).trim();
  const image = formData.get("location_image");
  let locationImageUrl = currentImageUrl || null;

  if (!locationTitle) {
    throw new Error("오시는 길 제목을 입력해주세요.");
  }

  if (image instanceof File && image.size > 0) {
    const extension = getFileExtension(image);
    const filePath = `location-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("location-images")
      .upload(filePath, image, {
        contentType: image.type || "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("location-images")
      .getPublicUrl(filePath);

    locationImageUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("hospital_settings")
    .update({
      location_title: locationTitle,
      location_description: locationDescription,
      location_image_url: locationImageUrl,
      location_image_alt: locationImageUrl ? "오시는 길 지도 이미지" : null,
    })
    .eq("id", 1);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
  redirect("/admin/settings?status=location-saved");
}
