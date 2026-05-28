import "server-only";

import { createClient } from "@supabase/supabase-js";

export type PublicHospitalSettings = {
  name: string;
  address: string;
  phone: string;
  location_title: string;
  location_description: string;
  location_image_url: string | null;
  location_image_alt: string | null;
};

export const fallbackHospitalSettings: PublicHospitalSettings = {
  name: "판교다시봄 정신건강의학과",
  address: "경기 성남시 분당구 판교역로192번길 16 판교타워",
  phone: "031-000-0000",
  location_title: "편안히 찾아오실 수 있도록 안내합니다.",
  location_description:
    "판교역 인근에서 편안히 찾아오실 수 있습니다. 자차 이용 시 건물 및 인근 주차 안내를 확인해 주세요.",
  location_image_url: null,
  location_image_alt: null,
};

export async function getPublicHospitalSettings(): Promise<PublicHospitalSettings> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return fallbackHospitalSettings;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("hospital_settings")
    .select(
      "name,address,phone,location_description,location_image_url,location_image_alt",
    )
    .eq("id", 1)
    .single();

  if (error || !data) {
    return fallbackHospitalSettings;
  }

  return {
    ...fallbackHospitalSettings,
    ...data,
    location_title: fallbackHospitalSettings.location_title,
    location_description:
      data.location_description ||
      fallbackHospitalSettings.location_description,
  };
}
