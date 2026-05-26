import "server-only";

import { createClient } from "@supabase/supabase-js";

export type OperatingHour = {
  id: string;
  label: string;
  value: string;
  order: number;
  visible: boolean;
};

export const fallbackOperatingHours: OperatingHour[] = [
  {
    id: "weekday",
    label: "월 · 수 · 금",
    value: "10:00 - 19:00",
    order: 1,
    visible: true,
  },
  {
    id: "evening",
    label: "화 · 목",
    value: "10:00 - 20:00",
    order: 2,
    visible: true,
  },
  {
    id: "saturday",
    label: "토요일",
    value: "10:00 - 14:00",
    order: 3,
    visible: true,
  },
  {
    id: "break",
    label: "휴식시간",
    value: "14:00 - 15:00",
    order: 4,
    visible: true,
  },
  {
    id: "holiday",
    label: "일요일 · 공휴일",
    value: "휴진",
    order: 5,
    visible: true,
  },
];

export async function getPublicOperatingHours() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return fallbackOperatingHours;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("operating_hours")
    .select("id,label,value,order,visible")
    .eq("visible", true)
    .order("order", { ascending: true })
    .limit(5);

  if (error || !data?.length) {
    return fallbackOperatingHours;
  }

  return data;
}
