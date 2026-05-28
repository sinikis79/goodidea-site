import Image from "next/image";
import TypingText from "@/components/TypingText";
import BottomNav from "@/components/BottomNav";
import SiteHeader from "@/components/SiteHeader";
import QuickLinksSection from "@/components/QuickLinksSection";
import InteriorPreviewSection from "@/components/InteriorPreviewSection";
import NoticeSection from "@/components/NoticeSection";
import { getPublicHospitalSettings } from "@/lib/hospital-settings";
import { getPublicInteriorImages } from "@/lib/interior-images";
import { getPublicOperatingHours } from "@/lib/operating-hours";
import { toPhoneHref } from "@/lib/phone";

export const dynamic = "force-dynamic";

const services = [
  {
    title: "우울·불안",
    description: "가라앉은 기분, 긴장, 걱정이 일상을 방해할 때 함께 살핍니다.",
    keywords: ["우울감", "불안", "공황", "긴장"],
    imageSrc: "/images/services/depression.jpg",
    imageClass: "object-center",
    overlayClass: "bg-[#2b2a28]/0",
  },
  {
    title: "스트레스·번아웃",
    description: "일과 관계 속에서 소진된 마음의 회복 방향을 정리합니다.",
    keywords: ["번아웃", "직장 스트레스", "대인관계", "수면"],
    imageSrc: "/images/services/stress-burnout.jpg",
    imageClass: "object-left",
    overlayClass: "bg-[#8a8073]/10",
  },
  {
    title: "청소년 상담",
    description: "학업, 또래 관계, 감정 조절의 어려움을 균형 있게 다룹니다.",
    keywords: ["학업 스트레스", "또래관계", "감정조절", "보호자 상담"],
    imageSrc: "/images/services/adolescent.jpg",
    imageClass: "object-right",
    overlayClass: "bg-[#756c61]/10",
  },
  {
    title: "수면 문제",
    description: "잠들기 어려움, 자주 깨는 문제, 생활 리듬을 함께 점검합니다.",
    keywords: ["불면", "수면리듬", "피로감", "생활습관"],
    imageSrc: "/images/services/sleep.jpg",
    imageClass: "object-[50%_62%]",
    overlayClass: "bg-[#2b2a28]/5",
  },
  {
    title: "주의집중",
    description: "집중력 저하와 충동성, 일상 관리의 어려움을 살펴봅니다.",
    keywords: ["ADHD", "집중력", "충동성", "일상관리"],
    imageSrc: "/images/services/attention.jpg",
    imageClass: "object-[35%_50%]",
    overlayClass: "bg-[#8a8073]/5",
  },
  {
    title: "가족·관계",
    description: "반복되는 갈등과 대화 방식을 안전하게 조율합니다.",
    keywords: ["가족갈등", "부부상담", "관계패턴", "대화방식"],
    imageSrc: "/images/services/family-relationship.jpg",
    imageClass: "object-[70%_50%]",
    overlayClass: "bg-[#756c61]/5",
  },
];

export default async function Home() {
  const hours = await getPublicOperatingHours();
  const interiorImages = await getPublicInteriorImages();
  const hospitalSettings = await getPublicHospitalSettings();
  const phoneHref = toPhoneHref(hospitalSettings.phone);
  const locationDescriptionLines = hospitalSettings.location_description
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader phoneHref={phoneHref} />

      <section className="relative isolate overflow-hidden bg-[#171812] text-[#fffcf7]">
        <style>
          {`
            @keyframes hero-soft-reveal {
              from {
                opacity: 0;
                filter: blur(1.5px);
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0);
              }
            }

            .hero-reveal {
              opacity: 0;
              animation: hero-soft-reveal 3200ms cubic-bezier(0.19, 1, 0.22, 1) forwards;
            }

            .hero-reveal-image {
              animation-duration: 3400ms;
            }

            @media (prefers-reduced-motion: reduce) {
              .hero-reveal {
                opacity: 1;
                transform: none;
                animation: none;
              }
            }
          `}
        </style>
        <video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[52%_45%] lg:object-center"
          loop
          muted
          playsInline
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 -z-10 bg-[#15140f]/24" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(255,244,220,0.15),transparent_32%),radial-gradient(ellipse_at_50%_0%,rgba(255,250,235,0.09),transparent_50%),radial-gradient(circle_at_50%_42%,rgba(248,245,241,0.08),transparent_34%),linear-gradient(to_bottom,rgba(23,24,18,0.08),rgba(23,24,18,0.30)_58%,rgba(248,245,241,0.55)_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(122deg,transparent_4%,transparent_48%,rgba(255,226,184,0.06)_66%,rgba(218,156,88,0.03)_82%,transparent_100%)] opacity-60" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-gradient-to-t from-[#f8f5f1] via-[#f8f5f1]/55 to-transparent" />
        <div className="absolute inset-x-[-10%] bottom-[-3.25rem] -z-10 h-28 bg-[#f8f5f1] blur-2xl" />

        <div className="mx-auto flex min-h-[520px] max-w-[1400px] items-center justify-center px-6 pb-20 pt-16 sm:min-h-[640px] sm:px-10 sm:py-24 lg:min-h-[720px] lg:px-12">
          <div className="relative mx-auto max-w-[860px] text-center">
            <p className="hero-reveal text-[0.84rem] font-black tracking-[0.14em] text-[#e3e4d2] [animation-delay:420ms]">
              마음이 쉬어가는 따뜻한 진료 공간
            </p>
            <h1 className="mx-auto mt-5 max-w-[10.5em] text-balance text-[1.86rem] font-extrabold leading-[1.28] tracking-[0.01em] text-[#fffaf2] sm:mt-7 sm:text-[2.95rem] sm:leading-[1.22] lg:text-[4rem] lg:leading-[1.16]">
              <TypingText
                text={"당신의 마음에도\n다시 봄이 올 수 있도록"}
                charDelayMs={120}
                startDelayMs={640}
                lineBreakPauseMs={560}
              />
            </h1>
            <div className="hero-reveal mx-auto mt-7 flex max-w-[310px] flex-col gap-2.5 [animation-delay:1500ms] sm:max-w-none sm:flex-row sm:justify-center">
              <a
                href={phoneHref}
                className="flex min-h-11 items-center justify-center rounded-xl border border-[#fff7ec]/70 bg-[#fffaf2]/90 px-4 text-[0.86rem] font-black text-[#4b4741] shadow-[0_5px_12px_rgba(23,24,18,0.055)] transition active:scale-[0.98] hover:bg-[#fffcf7] sm:min-w-[140px]"
              >
                전화로 상담 문의하기
              </a>
              <a
                href="#hours"
                className="flex min-h-11 items-center justify-center rounded-xl border border-[#fffaf2]/42 bg-[#fffaf2]/9 px-4 text-[0.86rem] font-black text-[#fffaf2] shadow-[0_5px_12px_rgba(23,24,18,0.045)] backdrop-blur-[2px] transition active:scale-[0.98] hover:bg-[#fffaf2]/14 sm:min-w-[140px]"
              >
                운영시간 확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="판교다시봄 정신건강의학과 브랜드 구분 영역"
        className="bg-[#f8f5f1] px-6 pb-9 pt-8 sm:px-10 sm:pb-11 sm:pt-10"
      >
        <style>
          {`
            @keyframes brand-divider-reveal {
              from {
                opacity: 0;
                transform: translateY(4px);
              }
              to {
                opacity: 0.5;
                transform: translateY(0);
              }
            }

            .brand-divider-logo {
              opacity: 0;
              transform: translateY(4px);
              animation: brand-divider-reveal 900ms ease-out 2600ms forwards;
            }

            @media (prefers-reduced-motion: reduce) {
              .brand-divider-logo {
                opacity: 0.5;
                transform: none;
                animation: none;
              }
            }
          `}
        </style>
        <div className="mx-auto flex max-w-[1400px] justify-center">
          <Image
            src="/images/common/logoA-transparent.png"
            alt="판교다시봄 정신건강의학과"
            width={1256}
            height={352}
            className="brand-divider-logo h-auto w-[280px] opacity-50 sm:w-[360px]"
          />
        </div>
      </section>

      <QuickLinksSection phoneHref={phoneHref} />
      <InteriorPreviewSection images={interiorImages} />
      <NoticeSection />

      <section
        id="about"
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.52fr_0.48fr] lg:items-center lg:gap-12"
      >
        <div className="max-w-[680px]">
          <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">
            병원소개
          </p>
          <h2 className="mt-4 text-[1.85rem] font-black leading-[1.28] tracking-tight text-[#2b2a28] sm:text-[2.35rem] sm:leading-[1.24] lg:text-[2.65rem]">
            아무도 몰랐던 마음 깊은 곳까지,
            <br className="hidden sm:block" />
            따뜻하게 바라봅니다.
          </h2>
          <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#6f6258] sm:text-[1.08rem] sm:leading-9">
            <p>
              혼자 견디기 어려웠던 마음의 무게,
              <br />
              이제는 조금 내려 놓으셔도 괜찮습니다.
            </p>
            <p>
              당신의 마음을 다시 귀 기울여 듣고,
              <br />
              따뜻한 시선을 회복할 수 있도록 함께 하겠습니다.
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-[#ded5ca] bg-[#fffcf7] shadow-[0_18px_42px_rgba(73,64,55,0.055)]">
          <Image
            src="/images/about/about-hero.png"
            alt="판교다시봄 정신건강의학과 병원 소개 이미지"
            width={1200}
            height={960}
            className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
          />
        </div>
      </section>

      <section id="services" className="bg-[#f1ece5] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">진료과목</p>
            <h2 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
              필요한 순간에 맞는 상담을 제공합니다.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-[#ded5ca] bg-[#fffcf7] shadow-[0_18px_42px_rgba(73,64,55,0.06)]"
              >
                <div className="relative overflow-hidden border-b border-[#ded5ca] bg-[#f1ece5]">
                  <Image
                    src={service.imageSrc}
                    alt={`${service.title} 진료과목 이미지`}
                    width={1280}
                    height={720}
                    className={`aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] ${service.imageClass}`}
                  />
                  <div className={`absolute inset-0 ${service.overlayClass}`} />
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-[1.45rem] font-black leading-[1.25] text-[#2b2a28]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.98rem] leading-7 text-[#7b756c]">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-[#e5ddd4] bg-[#fffcf7] px-3 py-1.5 text-xs font-black text-[#756c61]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="hours"
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      >
        <div>
          <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">운영시간</p>
          <h2 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
            예약제로 여유 있게 운영합니다.
          </h2>
          <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-8 text-[#7b756c] sm:text-lg">
            첫 방문 전 전화로 가능한 시간을 확인해 주세요. 일정 변경이나
            휴무는 예약 시 다시 안내드립니다.
          </p>
        </div>

        <div className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6 shadow-[0_18px_42px_rgba(73,64,55,0.06)] sm:p-8">
          {hours.map((hour) => (
            <div
              key={hour.id}
              className="flex items-center justify-between gap-4 border-b border-[#eee7df] py-4 last:border-0"
            >
              <span className="font-black text-[#4b4741]">{hour.label}</span>
              <span className="text-right font-bold text-[#7b756c]">
                {hour.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="location" className="bg-[#fffcf7] py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div>
            <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">오시는 길</p>
            <h2 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
              {hospitalSettings.location_title}
            </h2>
            <div className="mt-7 max-w-[58ch] space-y-4 text-[1.05rem] leading-8 text-[#7b756c] sm:text-lg">
              {hospitalSettings.address ? <p>{hospitalSettings.address}</p> : null}
              {locationDescriptionLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          {hospitalSettings.location_image_url ? (
            <div className="overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#f8f5f1] shadow-[0_18px_42px_rgba(73,64,55,0.06)]">
              <Image
                src={hospitalSettings.location_image_url}
                alt={
                  hospitalSettings.location_image_alt ?? "오시는 길 지도 이미지"
                }
                width={960}
                height={640}
                unoptimized
                className="aspect-[3/2] w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-2xl border border-[#e5ddd4] bg-[#f8f5f1] p-6 text-left shadow-[0_18px_42px_rgba(73,64,55,0.06)]">
              <div>
                <p className="text-sm font-black text-[#756c61]">MAP</p>
                <p className="mt-3 text-2xl font-black text-[#2b2a28]">
                  지도 영역
                </p>
                <p className="mt-3 leading-7 text-[#7b756c]">
                  관리자에서 약도 또는 지도 이미지를 등록할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <BottomNav phoneHref={phoneHref} />
    </main>
  );
}
