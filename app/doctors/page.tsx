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

        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {doctors.map((doctor) => (
            <article
              key={doctor.id}
              className="overflow-hidden rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_18px_42px_rgba(73,64,55,0.06)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ede9e3]">
                <Image
                  src={doctor.imageSrc}
                  alt={`${doctor.name} ${doctor.title}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="p-7 sm:p-9">
                <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">
                  {doctor.title}
                </p>
                <h2 className="mt-1.5 text-[1.65rem] font-black tracking-tight sm:text-[1.85rem]">
                  {doctor.name}
                </h2>

                <div className="my-6 h-px bg-[#e5ddd4]" />

                <p className="whitespace-pre-line text-[0.95rem] leading-[2] text-[#7b756c]">
                  {doctor.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
