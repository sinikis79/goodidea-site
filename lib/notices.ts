export type Notice = {
  id: string;
  title: string;
  date: string;
  content: string;
  imageSrc?: string;
};

export const notices: Notice[] = [
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
