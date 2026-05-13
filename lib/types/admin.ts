export type AdminNotice = {
  id: string;
  title: string;
  content: string;
  category: "general" | "event" | "important";
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminDoctor = {
  id: string;
  name: string;
  title: string;
  specialty: string;
  education: string;
  career: string;
  image_url: string | null;
  order: number;
  visible: boolean;
};

export type HospitalSettings = {
  name: string;
  address: string;
  phone: string;
  fax: string | null;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
  hours_lunch: string;
  kakao_url: string | null;
  naver_map_url: string | null;
  description: string;
};

export type DashboardStats = {
  notices_total: number;
  notices_published: number;
  doctors_total: number;
  doctors_visible: number;
};
