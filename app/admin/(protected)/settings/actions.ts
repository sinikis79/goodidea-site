"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MAX_OPERATING_HOURS = 5;

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
