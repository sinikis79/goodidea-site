import Image from "next/image";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { label: "소개", href: "#about" },
  { label: "서비스", href: "#services" },
  { label: "운영시간", href: "#hours" },
  { label: "오시는 길", href: "#location" },
];

const quickLinks = [
  {
    title: "전화 상담",
    description: "방문 전 궁금한 점을 바로 문의하세요.",
    href: "tel:031-000-0000",
  },
  {
    title: "오시는 길",
    description: "주소와 주차 안내를 확인할 수 있습니다.",
    href: "#location",
  },
  {
    title: "진료 시간",
    description: "예약 가능한 시간대를 미리 살펴보세요.",
    href: "#hours",
  },
  {
    title: "상담 안내",
    description: "처음 방문하는 분을 위한 흐름입니다.",
    href: "#services",
  },
];

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
      <header className="sticky top-0 z-40 border-b border-[#e5ddd4] bg-[#fffcf7]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-4 sm:gap-4 sm:px-8">
          <a
            href="#"
            className="relative flex h-[60px] w-[250px] max-w-[calc(100vw-96px)] shrink-0 items-center sm:w-[280px]"
          >
            <Image
              src="/images/common/logo-horizontal.png"
              alt="판교다시봄정신건강의학과"
              width={720}
              height={160}
              priority
              className="max-h-14 w-full object-contain object-left"
            />
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-[#7b756c] lg:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-[#2b2a28]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <details className="group relative">
            <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_14px_36px_rgba(73,64,55,0.08)] transition active:scale-[0.98] hover:border-[#cfc3b5] [&::-webkit-details-marker]:hidden">
              <span className="sr-only">메뉴 열기</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
                <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
                <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
              </span>
            </summary>
            <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] p-2 shadow-[0_18px_50px_rgba(73,64,55,0.13)]">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-extrabold text-[#2b2a28] transition hover:bg-[#f1ece5]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <section className="bg-[#fffcf7]">
        <style>
          {`
            @keyframes hero-soft-reveal {
              from {
                opacity: 0;
                transform: translateY(14px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .hero-reveal {
              opacity: 0;
              animation: hero-soft-reveal 950ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            .hero-reveal-image {
              animation-duration: 1100ms;
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
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 lg:py-28">
          <div className="max-w-[680px]">
            <p className="hero-reveal text-[13px] font-black tracking-[0.08em] text-[#8a8073] [animation-delay:180ms]">
              마음이 쉬어가는 따뜻한 진료 공간
            </p>
            <h1 className="hero-reveal mt-6 max-w-[11ch] text-[2.55rem] font-extrabold leading-[1.18] tracking-tight text-[#2b2a28] [animation-delay:320ms] sm:text-5xl sm:leading-[1.16] lg:text-6xl lg:leading-[1.12]">
              당신의 마음에도
              <br />
              다시 봄이 올 수 있도록
            </h1>
            <div className="hero-reveal mt-9 flex flex-col gap-3 [animation-delay:500ms] sm:flex-row">
              <a
                href="tel:031-000-0000"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#8a8073] bg-[#8a8073] px-6 text-base font-black text-[#fffcf7] shadow-[0_18px_40px_rgba(73,64,55,0.18)] transition active:scale-[0.98] hover:bg-[#756c61]"
              >
                전화로 상담 문의하기
              </a>
              <a
                href="#hours"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#cfc3b5] bg-[#fffcf7] px-6 text-base font-black text-[#4b4741] shadow-[0_18px_40px_rgba(73,64,55,0.06)] transition active:scale-[0.98] hover:border-[#8a8073]"
              >
                운영시간 확인하기
              </a>
            </div>
          </div>

          <div className="hero-reveal hero-reveal-image relative overflow-hidden rounded-[2rem] border border-[#e5ddd4] bg-[#f1ece5] shadow-[0_24px_70px_rgba(73,64,55,0.11)] [animation-delay:80ms] lg:translate-y-8">
            <Image
              src="/images/hero/main-hero.jpg"
              alt="따뜻한 햇살이 드는 상담 공간"
              width={1280}
              height={720}
              priority
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          {quickLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6 shadow-[0_18px_42px_rgba(73,64,55,0.06)] transition active:scale-[0.98] hover:-translate-y-1 sm:p-7"
            >
              <h2 className="text-[1.35rem] font-black leading-[1.25] text-[#2b2a28]">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#7b756c]">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </section>

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
            좋은마음 정신건강의학과는 평가보다 이해를, 빠른 결론보다 충분한
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
              <p>경기도 성남시 분당구 마음로 12, 좋은빌딩 3층</p>
              <p>
                마음역 2번 출구에서 도보 6분 거리입니다. 자차 이용 시 건물
                뒤편 공영주차장을 이용하실 수 있습니다.
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
