export type NoticeType = "text" | "image";

export type AdminNotice = {
  id: string;
  title: string;
  content: string;
  notice_type: NoticeType;
  image_url: string | null;
  image_alt: string | null;
  display_date: string | null;
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

export type AdminOperatingHour = {
  id: string;
  label: string;
  value: string;
  order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminInteriorImage = {
  id: string;
  title: string;
  image_url: string;
  image_alt: string;
  order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
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
  location_title: string;
  location_description: string;
  location_image_url: string | null;
  location_image_alt: string | null;
  description: string;
};

export type DashboardStats = {
  notices_total: number;
  notices_published: number;
  doctors_total: number;
  doctors_visible: number;
  interior_images_total: number;
  interior_images_visible: number;
};
