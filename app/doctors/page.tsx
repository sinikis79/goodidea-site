import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { getPublicDoctorImages } from "@/lib/doctors";

export default async function DoctorsPage() {
  const doctors = await getPublicDoctorImages();

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

        <div className="mx-auto mt-10 w-full max-w-[1040px] sm:mt-12">
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
          <div
            className={`grid gap-5 ${
              doctors.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-[680px]"
            }`}
          >
            {doctors.map((doctor, index) => (
              <Image
                key={doctor.id}
                src={doctor.image_url}
                alt={`판교다시봄 정신건강의학과 의료진 소개 ${index + 1}`}
                width={1200}
                height={1500}
                unoptimized
                className="doctor-photo-reveal w-full rounded-2xl object-contain"
                style={{ animationDelay: `${320 + index * 120}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
