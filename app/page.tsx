import Image from "next/image";
import BottomNav from "@/components/BottomNav";
import SiteHeader from "@/components/SiteHeader";
import QuickLinksSection from "@/components/QuickLinksSection";
import NoticeSection from "@/components/NoticeSection";


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

const hours = [
  ["월 · 수 · 금", "10:00 - 19:00"],
  ["화 · 목", "10:00 - 20:00"],
  ["토요일", "10:00 - 14:00"],
  ["휴식시간", "14:00 - 15:00"],
  ["일요일 · 공휴일", "휴진"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="relative isolate overflow-hidden bg-[#f8f5f1]">
        <style>
          {`
            @keyframes hero-soft-reveal {
              from {
                opacity: 0;
                filter: blur(3px);
                transform: translateY(28px);
              }
              to {
                opacity: 1;
                filter: blur(0px);
                transform: translateY(0);
              }
            }

            .hero-reveal {
              opacity: 0;
              animation: hero-soft-reveal 2200ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            .hero-reveal-image {
              animation-duration: 2400ms;
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
        <Image
          src="/images/hero/clinic-entrance.jpg"
          alt="판교다시봄정신건강의학과 공간"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[52%_42%] lg:object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[#2b2a28]/10" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[54%] bg-gradient-to-t from-[#f8f5f1]/88 via-[#f8f5f1]/28 to-transparent" />
        <div className="absolute inset-x-[-10%] bottom-[-3rem] -z-10 h-28 bg-[#f8f5f1] blur-2xl" />

        <div className="mx-auto flex min-h-[590px] max-w-[1400px] items-start px-6 pb-8 pt-28 sm:px-10 sm:py-24 lg:min-h-[760px] lg:items-center lg:px-12 lg:py-28">
          <div className="relative mx-auto max-w-[760px] text-center before:absolute before:inset-x-[-1.5rem] before:inset-y-[-1.25rem] before:-z-10 before:rounded-[2rem] before:bg-[#2b2a28]/18 before:blur-2xl lg:mx-0 lg:max-w-[780px] lg:-translate-y-6 lg:text-left lg:before:hidden">
            <p className="hero-reveal text-[13px] font-black tracking-[0.14em] text-[#f1ece5] [animation-delay:300ms]">
              마음이 쉬어가는 따뜻한 진료 공간
            </p>
            <h1 className="hero-reveal mx-auto mt-6 max-w-[9.5em] text-balance text-[2.45rem] font-extrabold leading-[1.14] tracking-tight text-[#fffcf7] [animation-delay:600ms] sm:text-6xl sm:leading-[1.1] lg:mx-0 lg:text-7xl lg:leading-[1.05]">
              당신의 마음에도
              <br />
              <span className="whitespace-nowrap">다시 봄이 올 수 있도록</span>
            </h1>
            <div className="hero-reveal mx-auto mt-8 flex max-w-[420px] flex-col gap-3 [animation-delay:1000ms] sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
              <a
                href="tel:031-000-0000"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#fffcf7]/70 bg-[#fffcf7] px-6 text-base font-black text-[#4b4741] shadow-[0_18px_40px_rgba(43,42,40,0.18)] transition active:scale-[0.98] hover:bg-[#f1ece5]"
              >
                전화로 상담 문의하기
              </a>
              <a
                href="#hours"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#fffcf7]/60 bg-[#2b2a28]/24 px-6 text-base font-black text-[#fffcf7] shadow-[0_18px_40px_rgba(43,42,40,0.12)] transition active:scale-[0.98] hover:bg-[#2b2a28]/34"
              >
                운영시간 확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      <QuickLinksSection />
      <NoticeSection />

      <section
        id="about"
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"
      >
        <div>
          <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">병원 소개</p>
          <h2 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
            편안하지만 전문적인 상담을 지향합니다.
          </h2>
        </div>
        <div className="border-l-0 border-[#cfc3b5] bg-transparent p-0 lg:border-l lg:pl-10">
          <p className="max-w-[58ch] text-[1.05rem] leading-8 text-[#7b756c] sm:text-lg">
            판교다시봄정신건강의학과는 평가보다 이해를, 빠른 결론보다 충분한
            탐색을 중요하게 생각합니다. 낯선 방문의 긴장이 조금 덜어지도록
            따뜻한 분위기와 명확한 안내를 준비했습니다.
          </p>
        </div>
      </section>

      <section id="services" className="bg-[#f1ece5] py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">서비스</p>
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
          {hours.map(([day, time]) => (
            <div
              key={day}
              className="flex items-center justify-between gap-4 border-b border-[#eee7df] py-4 last:border-0"
            >
              <span className="font-black text-[#4b4741]">{day}</span>
              <span className="text-right font-bold text-[#7b756c]">
                {time}
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
              편안히 찾아오실 수 있도록 안내합니다.
            </h2>
            <div className="mt-7 max-w-[58ch] space-y-4 text-[1.05rem] leading-8 text-[#7b756c] sm:text-lg">
              <p>경기 성남시 분당구 판교역로192번길 16 판교타워</p>
              <p>
                판교역 인근에서 편안히 찾아오실 수 있습니다. 자차 이용 시 건물
                및 인근 주차 안내를 확인해 주세요.
              </p>
            </div>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-[#e5ddd4] bg-[#f8f5f1] p-6 text-left shadow-[0_18px_42px_rgba(73,64,55,0.06)]">
            <div>
              <p className="text-sm font-black text-[#756c61]">MAP</p>
              <p className="mt-3 text-2xl font-black text-[#2b2a28]">
                지도 영역
              </p>
              <p className="mt-3 leading-7 text-[#7b756c]">
                추후 네이버 지도, 카카오 지도, 약도 이미지로 교체할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
