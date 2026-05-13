import type {
  AdminNotice,
  AdminDoctor,
  HospitalSettings,
  DashboardStats,
} from "@/lib/types/admin";

export const mockNotices: AdminNotice[] = [
  {
    id: "2025-12-schedule",
    title: "2025년 12월 진료안내",
    content: "12월 진료 일정을 안내드립니다. 세부 일정은 예약 시 다시 안내드립니다.",
    category: "general",
    published: true,
    created_at: "2025-11-20T09:00:00Z",
    updated_at: "2025-11-20T09:00:00Z",
  },
  {
    id: "christmas-holiday",
    title: "성탄절 휴진 안내",
    content: "12월 25일(수) 성탄절은 휴진합니다. 이용에 불편을 드려 죄송합니다.",
    category: "important",
    published: true,
    created_at: "2025-12-01T09:00:00Z",
    updated_at: "2025-12-01T09:00:00Z",
  },
  {
    id: "clinic-hours",
    title: "진료시간 안내",
    content: "당원 진료 시간을 안내드립니다. 예약제로 운영하오니 방문 전 전화 문의 부탁드립니다.",
    category: "general",
    published: true,
    created_at: "2025-11-01T09:00:00Z",
    updated_at: "2025-11-01T09:00:00Z",
  },
  {
    id: "new-year-2026",
    title: "2026년 신정 휴진 안내 (초안)",
    content: "1월 1일 신정 휴진 예정입니다.",
    category: "event",
    published: false,
    created_at: "2025-12-15T09:00:00Z",
    updated_at: "2025-12-15T09:00:00Z",
  },
];

export const mockDoctors: AdminDoctor[] = [
  {
    id: "doctor-1",
    name: "오승영",
    title: "원장",
    specialty: "정신건강의학과 전문의",
    education:
      "경희대학교 의과대학 졸업\n경희대학교 의과대학원 졸업\n경희대학교병원 인턴 수료\n경희대학교병원 정신건강의학과 레지던트 수료",
    career: "현 판교다시봄정신건강의학과 원장",
    image_url: "/images/doctors/doctor-1.jpg",
    order: 1,
    visible: true,
  },
  {
    id: "doctor-2",
    name: "나혜수",
    title: "원장",
    specialty: "정신건강의학과 전문의",
    education:
      "한국과학기술원 졸업\n가천대학교 의학전문대학원 졸업\n가천대학교 길병원 인턴 수료\n가천대학교 길병원 정신건강의학과 레지던트 수료",
    career: "현 판교다시봄정신건강의학과 원장",
    image_url: "/images/doctors/doctor-2.jpg",
    order: 2,
    visible: true,
  },
];

export const mockSettings: HospitalSettings = {
  name: "판교다시봄정신건강의학과",
  address: "경기도 성남시 분당구 판교로 000, 000호",
  phone: "031-000-0000",
  fax: null,
  hours_weekday: "09:00 – 18:00",
  hours_saturday: "09:00 – 13:00",
  hours_sunday: "휴진",
  hours_lunch: "13:00 – 14:00",
  kakao_url: null,
  naver_map_url: null,
  description: "마음을 이해하는 진료는 사람을 깊이 바라보는 것에서 시작됩니다.",
};

export const mockStats: DashboardStats = {
  notices_total: mockNotices.length,
  notices_published: mockNotices.filter((n) => n.published).length,
  doctors_total: mockDoctors.length,
  doctors_visible: mockDoctors.filter((d) => d.visible).length,
};
