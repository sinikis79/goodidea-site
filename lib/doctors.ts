import "server-only";

import { createClient } from "@supabase/supabase-js";

export type PublicDoctorImage = {
  id: string;
  image_url: string;
  order: number;
};

export const fallbackDoctorImages: PublicDoctorImage[] = [
  {
    id: "main-doctor-profile",
    image_url: "/images/doctors/main-doctor-profile.png",
    order: 1,
  },
];

export async function getPublicDoctorImages() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return fallbackDoctorImages;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("doctors")
    .select("id,image_url,order")
    .eq("visible", true)
    .not("image_url", "is", null)
    .order("order", { ascending: true })
    .limit(4);

  if (error || !data?.length) {
    return fallbackDoctorImages;
  }

  return data.filter((doctor) => doctor.image_url);
}
