import "server-only";

import { createClient } from "@supabase/supabase-js";

export type PublicInteriorImage = {
  id: string;
  title: string;
  image_url: string;
  image_alt: string;
  order: number;
};

export const fallbackInteriorImages: PublicInteriorImage[] = [
  {
    id: "interior-1",
    title: "상담 공간",
    image_url: "/images/interior/interior-1.jpg",
    image_alt: "판교다시봄 정신건강의학과 내부 공간 1",
    order: 1,
  },
  {
    id: "interior-2",
    title: "진료 공간",
    image_url: "/images/interior/interior-2.jpg",
    image_alt: "판교다시봄 정신건강의학과 내부 공간 2",
    order: 2,
  },
  {
    id: "interior-3",
    title: "대기 공간",
    image_url: "/images/interior/interior-3.jpg",
    image_alt: "판교다시봄 정신건강의학과 내부 공간 3",
    order: 3,
  },
  {
    id: "interior-4",
    title: "검사 공간",
    image_url: "/images/interior/interior-4.jpg",
    image_alt: "판교다시봄 정신건강의학과 내부 공간 4",
    order: 4,
  },
];

export async function getPublicInteriorImages() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return fallbackInteriorImages;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("interior_images")
    .select("id,title,image_url,image_alt,order")
    .eq("visible", true)
    .order("order", { ascending: true })
    .limit(12);

  if (error) {
    return fallbackInteriorImages;
  }

  return data ?? [];
}
