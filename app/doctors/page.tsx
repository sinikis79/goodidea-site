import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";

const doctors = [
  {
    id: "doctor-1",
    name: "오승영",
    title: "원장",
    imageSrc: "/images/doctors/doctor-1.jpg",
    description: `정신건강의학과 전문의

경희대학교 의과대학 졸업
경희대학교 의과대학원 졸업
경희대학교병원 인턴 수료
경희대학교병원 정신건강의학과 레지던트 수료`,
  },
  {
    id: "doctor-2",
    name: "나혜수",
    title: "원장",
    imageSrc: "/images/doctors/doctor-2.jpg",
    description: `정신건강의학과 전문의

한국과학기술원 졸업
가천대학교 의학전문대학원 졸업
가천대학교 길병원 인턴 수료
가천대학교 길병원 정신건강의학과 레지던트 수료`,
  },
];

export default function DoctorsPage() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-[13px] font-black uppercase tracking-[0.14em] text-[#8a8073]">
            Psychiatrist
          </p>
          <h1 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
            의료진 소개
          </h1>
          <p className="mt-5 text-[1.05rem] leading-8 text-[#7b756c] sm:text-lg">
            마음을 이해하는 진료는 사람을 깊이 바라보는 것에서 시작됩니다.
          </p>
        </div>

        <div className="mx-auto mt-10 w-full max-w-[680px] sm:mt-12">
          <style>
            {`
              @keyframes doctor-photo-reveal {
                0% {
                  opacity: 0;
                  filter: brightness(0.88);
                  transform: translateY(12px);
                }
                40% {
                  opacity: 0.45;
                  filter: brightness(0.93);
                }
                70% {
                  opacity: 0.78;
                  filter: brightness(0.97);
                }
                100% {
                  opacity: 1;
                  filter: brightness(1);
                  transform: translateY(0);
                }
              }

              .doctor-photo-reveal {
                opacity: 0;
                filter: brightness(0.88);
                transform: translateY(12px);
                animation: doctor-photo-reveal 2000ms cubic-bezier(0.25, 0.1, 0.25, 1) 320ms forwards;
              }

              @media (prefers-reduced-motion: reduce) {
                .doctor-photo-reveal {
                  opacity: 1;
                  filter: brightness(1);
                  transform: none;
                  animation: none;
                }
              }
            `}
          </style>
          <Image
            src="/images/doctors/main-doctor-profile.png"
            alt="남유림 원장"
            width={1200}
            height={800}
            className="doctor-photo-reveal w-full rounded-2xl object-contain"
          />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
