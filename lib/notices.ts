import "server-only";

import { createClient } from "@supabase/supabase-js";

export type Notice = {
  id: string;
  title: string;
  date: string;
  content: string;
  imageSrc?: string;
};

export const fallbackNotices: Notice[] = [
  {
    id: "2025-12-schedule",
    title: "2025년 12월 진료안내",
    date: "2025-11-20",
    content: "12월 진료 일정을 안내드립니다. 세부 일정은 예약 시 다시 안내드립니다.",
  },
  {
    id: "christmas-holiday",
    title: "성탄절 휴진 안내",
    date: "2025-12-25",
    content: "12월 25일(수) 성탄절은 휴진합니다. 이용에 불편을 드려 죄송합니다.",
  },
  {
    id: "clinic-hours",
    title: "진료시간 안내",
    date: "2025-11-01",
    content: "당원 진료 시간을 안내드립니다. 예약제로 운영하오니 방문 전 전화 문의 부탁드립니다.",
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

function toPublicNotice(notice: {
  id: string;
  title: string;
  content: string;
  display_date: string | null;
  created_at: string;
  image_url: string | null;
}) {
  return {
    id: notice.id,
    title: notice.title,
    date: notice.display_date ?? notice.created_at.slice(0, 10),
    content: notice.content,
    imageSrc: notice.image_url ?? undefined,
  };
}

export async function getPublicNotices(limit?: number) {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return fallbackNotices.slice(0, limit);
  }

  let query = supabase
    .from("notices")
    .select("id,title,content,display_date,created_at,image_url")
    .eq("published", true)
    .order("display_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    return fallbackNotices.slice(0, limit);
  }

  return data.map(toPublicNotice);
}

export async function getPublicNoticePage(page: number, pageSize = 12) {
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const from = (safePage - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    const fallbackPage = fallbackNotices.slice(from, to + 1);

    return {
      notices: fallbackPage,
      page: safePage,
      pageSize,
      totalCount: fallbackNotices.length,
      totalPages: Math.max(1, Math.ceil(fallbackNotices.length / pageSize)),
    };
  }

  const { data, error, count } = await supabase
    .from("notices")
    .select("id,title,content,display_date,created_at,image_url", {
      count: "exact",
    })
    .eq("published", true)
    .order("display_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    const fallbackPage = fallbackNotices.slice(from, to + 1);

    return {
      notices: fallbackPage,
      page: safePage,
      pageSize,
      totalCount: fallbackNotices.length,
      totalPages: Math.max(1, Math.ceil(fallbackNotices.length / pageSize)),
    };
  }

  const totalCount = count ?? data.length;

  return {
    notices: data.map(toPublicNotice),
    page: safePage,
    pageSize,
    totalCount,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
  };
}

export async function getPublicNoticeById(id: string) {
  const supabase = getPublicSupabaseClient();

  if (!supabase) {
    return fallbackNotices.find((notice) => notice.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("notices")
    .select("id,title,content,display_date,created_at,image_url")
    .eq("id", id)
    .eq("published", true)
    .maybeSingle();

  if (error) {
    return fallbackNotices.find((notice) => notice.id === id) ?? null;
  }

  return data ? toPublicNotice(data) : null;
}
