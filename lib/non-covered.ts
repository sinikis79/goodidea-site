import "server-only";

import { createClient } from "@supabase/supabase-js";

export type NonCoveredSettings = {
  intro_text: string;
  note_text: string;
};

export type NonCoveredItem = {
  id: string;
  category: string;
  name: string;
  price: string;
  note: string;
  order: number;
  visible: boolean;
  created_at?: string;
  updated_at?: string;
};

export const fallbackNonCoveredSettings: NonCoveredSettings = {
  intro_text:
    "의료법 제45조에 의거하여 판교다시봄 정신건강의학과의 비급여 진료비용을 고지합니다.",
  note_text:
    "* 위 항목은 건강보험 요양급여 비용 기준에 포함되지 않는 비급여 항목입니다.",
};

export const fallbackNonCoveredItems: NonCoveredItem[] = [
  {
    id: "certificate-general",
    category: "제증명 수수료",
    name: "일반진단서",
    price: "20,000",
    note: "",
    order: 1,
    visible: true,
  },
  {
    id: "certificate-english",
    category: "제증명 수수료",
    name: "영문진단서",
    price: "20,000",
    note: "",
    order: 2,
    visible: true,
  },
  {
    id: "certificate-work",
    category: "제증명 수수료",
    name: "근로능력평가용 진단서",
    price: "10,000",
    note: "",
    order: 3,
    visible: true,
  },
  {
    id: "certificate-disability",
    category: "제증명 수수료",
    name: "장애정도 심사용진단서",
    price: "40,000",
    note: "",
    order: 4,
    visible: true,
  },
  {
    id: "certificate-military",
    category: "제증명 수수료",
    name: "병무용진단서",
    price: "20,000",
    note: "",
    order: 5,
    visible: true,
  },
  {
    id: "certificate-opinion",
    category: "제증명 수수료",
    name: "소견서",
    price: "10,000",
    note: "",
    order: 6,
    visible: true,
  },
  {
    id: "certificate-visit",
    category: "제증명 수수료",
    name: "통원/진료확인서",
    price: "3,000",
    note: "",
    order: 7,
    visible: true,
  },
  {
    id: "record-copy-1-5",
    category: "제증명 수수료",
    name: "의무기록사본(1-5매)",
    price: "1,000",
    note: "장당",
    order: 8,
    visible: true,
  },
  {
    id: "record-copy-6",
    category: "제증명 수수료",
    name: "의무기록사본(6매 이상)",
    price: "100",
    note: "장당",
    order: 9,
    visible: true,
  },
  {
    id: "certificate-copy",
    category: "제증명 수수료",
    name: "제증명서 사본",
    price: "1,000",
    note: "",
    order: 10,
    visible: true,
  },
  {
    id: "cat",
    category: "검사료",
    name: "종합주의력검사(CAT)",
    price: "100,000",
    note: "",
    order: 11,
    visible: true,
  },
  {
    id: "asi",
    category: "검사료",
    name: "불안민감성척도",
    price: "75,000",
    note: "",
    order: 12,
    visible: true,
  },
  {
    id: "kpai",
    category: "검사료",
    name: "한국판성격평가척도(KPAI)",
    price: "60,000",
    note: "",
    order: 13,
    visible: true,
  },
  {
    id: "edmt",
    category: "검사료",
    name: "이화방어기제검사(EDMT)",
    price: "60,000",
    note: "",
    order: 14,
    visible: true,
  },
  {
    id: "depression",
    category: "검사료",
    name: "신경증우울평가",
    price: "75,000",
    note: "",
    order: 15,
    visible: true,
  },
  {
    id: "anxiety",
    category: "검사료",
    name: "신경증불안평가",
    price: "75,000",
    note: "",
    order: 16,
    visible: true,
  },
  {
    id: "hrv",
    category: "검사료",
    name: "자율신경계이상검사/심박변이도검사",
    price: "30,000",
    note: "",
    order: 17,
    visible: true,
  },
];

function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

function sortNonCoveredItems(items: NonCoveredItem[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getPublicNonCoveredFees() {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return {
      settings: fallbackNonCoveredSettings,
      items: sortNonCoveredItems(fallbackNonCoveredItems),
    };
  }

  const [settingsResult, itemsResult] = await Promise.all([
    supabase
      .from("non_covered_settings")
      .select("intro_text,note_text")
      .eq("id", 1)
      .maybeSingle(),
    supabase
      .from("non_covered_items")
      .select("id,category,name,price,note,order,visible,created_at,updated_at")
      .eq("visible", true)
      .order("order", { ascending: true })
      .order("created_at", { ascending: true }),
  ]);

  return {
    settings:
      settingsResult.error || !settingsResult.data
        ? fallbackNonCoveredSettings
        : {
            intro_text:
              settingsResult.data.intro_text ||
              fallbackNonCoveredSettings.intro_text,
            note_text:
              settingsResult.data.note_text ||
              fallbackNonCoveredSettings.note_text,
          },
    items:
      itemsResult.error || !itemsResult.data || itemsResult.data.length === 0
        ? sortNonCoveredItems(fallbackNonCoveredItems)
        : itemsResult.data,
  };
}
