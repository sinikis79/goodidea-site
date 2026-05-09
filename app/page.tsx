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
    overlayClass: "bg-[#2f2a24]/0",
  },
  {
    title: "스트레스·번아웃",
    description: "일과 관계 속에서 소진된 마음의 회복 방향을 정리합니다.",
    keywords: ["번아웃", "직장 스트레스", "대인관계", "수면"],
    imageSrc: "/images/services/stress-burnout.jpg",
    imageClass: "object-left",
    overlayClass: "bg-[#6f8b74]/10",
  },
  {
    title: "청소년 상담",
    description: "학업, 또래 관계, 감정 조절의 어려움을 균형 있게 다룹니다.",
    keywords: ["학업 스트레스", "또래관계", "감정조절", "보호자 상담"],
    imageSrc: "/images/services/adolescent.jpg",
    imageClass: "object-right",
    overlayClass: "bg-[#8a735b]/10",
  },
  {
    title: "수면 문제",
    description: "잠들기 어려움, 자주 깨는 문제, 생활 리듬을 함께 점검합니다.",
    keywords: ["불면", "수면리듬", "피로감", "생활습관"],
    imageSrc: "/images/services/sleep.jpg",
    imageClass: "object-[50%_62%]",
    overlayClass: "bg-[#2f2a24]/5",
  },
  {
    title: "주의집중",
    description: "집중력 저하와 충동성, 일상 관리의 어려움을 살펴봅니다.",
    keywords: ["ADHD", "집중력", "충동성", "일상관리"],
    imageSrc: "/images/services/attention.jpg",
    imageClass: "object-[35%_50%]",
    overlayClass: "bg-[#6f8b74]/5",
  },
  {
    title: "가족·관계",
    description: "반복되는 갈등과 대화 방식을 안전하게 조율합니다.",
    keywords: ["가족갈등", "부부상담", "관계패턴", "대화방식"],
    imageSrc: "/images/services/family-relationship.jpg",
    imageClass: "object-[70%_50%]",
    overlayClass: "bg-[#8a735b]/5",
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
    <main className="min-h-screen bg-[#fffaf3] pb-44 text-[#2f2a24] md:pb-0">
      <header className="sticky top-0 z-40 border-b border-[#eadfce] bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#" className="min-w-0">
            <span className="block text-2xl font-black leading-none tracking-tight text-[#6f8b74] sm:text-3xl">
              좋은마음
            </span>
            <span className="mt-1 block text-base font-extrabold leading-tight text-[#55504a] sm:text-xl">
              정신건강의학과
            </span>
          </a>

          <div className="hidden items-center gap-7 text-sm font-bold text-[#6e5e4d] lg:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-[#2f2a24]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <details className="group relative">
            <summary className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-[#eadfce] bg-white shadow-[0_14px_36px_rgba(83,62,39,0.08)] transition active:scale-[0.98] hover:border-[#d8c8b2] [&::-webkit-details-marker]:hidden">
              <span className="sr-only">메뉴 열기</span>
              <span className="flex flex-col gap-1.5">
                <span className="h-0.5 w-6 rounded-full bg-[#2f2a24]" />
                <span className="h-0.5 w-6 rounded-full bg-[#2f2a24]" />
                <span className="h-0.5 w-6 rounded-full bg-[#2f2a24]" />
              </span>
            </summary>
            <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-3xl border border-[#eadfce] bg-white p-2 shadow-[0_18px_50px_rgba(83,62,39,0.14)]">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 text-base font-extrabold text-[#3b342c] transition hover:bg-[#fffaf3]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:px-8 sm:py-[4.5rem] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <div className="max-w-[640px]">
            <p className="text-sm font-black text-[#6f8b74]">
              마음이 쉬어가는 따뜻한 진료 공간
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.26] tracking-tight text-[#2f2a24] sm:text-5xl sm:leading-[1.18] lg:text-6xl">
              좋은 사람을 만나
              <br />
              좋은 일이 생기는 곳
            </h1>
            <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-[#665849] sm:text-lg">
              충분히 듣고, 차분히 살피며, 일상으로 돌아갈 힘을 함께 찾습니다.
              처음 방문하는 순간부터 불필요한 긴장을 덜 수 있도록 명확한 안내와
              조용한 공간을 준비했습니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:031-000-0000"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#6f8b74] bg-[#6f8b74] px-6 text-base font-black text-white shadow-[0_18px_40px_rgba(111,139,116,0.22)] transition active:scale-[0.98] hover:bg-[#627d67]"
              >
                전화로 상담 문의하기
              </a>
              <a
                href="#hours"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-[#d8c8b2] bg-white px-6 text-base font-black text-[#4d4237] shadow-[0_18px_40px_rgba(83,62,39,0.06)] transition active:scale-[0.98] hover:border-[#bda98d]"
              >
                운영시간 확인하기
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-[#eadfce] bg-[#f7f1e8] shadow-[0_24px_70px_rgba(83,62,39,0.12)] lg:translate-y-8">
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

      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          {quickLinks.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-[#eadfce] bg-white p-6 shadow-[0_18px_42px_rgba(83,62,39,0.07)] transition active:scale-[0.98] hover:-translate-y-1"
            >
              <h2 className="text-xl font-black text-[#342e27]">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#756554]">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"
      >
        <div>
          <p className="text-sm font-black text-[#6f8b74]">병원 소개</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            편안하지만 전문적인 상담을 지향합니다.
          </h2>
        </div>
        <div className="border-l-0 border-[#d8c8b2] bg-transparent p-0 lg:border-l lg:pl-10">
          <p className="text-lg leading-8 text-[#665849]">
            좋은마음 정신건강의학과는 평가보다 이해를, 빠른 결론보다 충분한
            탐색을 중요하게 생각합니다. 낯선 방문의 긴장이 조금 덜어지도록
            따뜻한 분위기와 명확한 안내를 준비했습니다.
          </p>
        </div>
      </section>

      <section id="services" className="bg-[#f5efe5] py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black text-[#6f8b74]">서비스</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              필요한 순간에 맞는 상담을 제공합니다.
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-[#e1d3c0] bg-[#fffdf9] shadow-[0_18px_42px_rgba(83,62,39,0.07)]"
              >
                <div className="relative overflow-hidden border-b border-[#e1d3c0] bg-[#f7f1e8]">
                  <Image
                    src={service.imageSrc}
                    alt={`${service.title} 진료과목 이미지`}
                    width={1280}
                    height={720}
                    className={`aspect-[16/10] w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04] ${service.imageClass}`}
                  />
                  <div className={`absolute inset-0 ${service.overlayClass}`} />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-2xl font-black text-[#342e27]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[#6e5e4d]">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-[#eadfce] bg-white px-3 py-1.5 text-xs font-black text-[#8a735b]"
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
        className="mx-auto grid max-w-[1400px] gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      >
        <div>
          <p className="text-sm font-black text-[#6f8b74]">운영시간</p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            예약제로 여유 있게 운영합니다.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#665849]">
            첫 방문 전 전화로 가능한 시간을 확인해 주세요. 일정 변경이나
            휴무는 예약 시 다시 안내드립니다.
          </p>
        </div>

        <div className="rounded-2xl border border-[#eadfce] bg-white p-5 shadow-[0_18px_42px_rgba(83,62,39,0.07)] sm:p-7">
          {hours.map(([day, time]) => (
            <div
              key={day}
              className="flex items-center justify-between gap-4 border-b border-[#f0e6d8] py-4 last:border-0"
            >
              <span className="font-black text-[#4a4036]">{day}</span>
              <span className="text-right font-bold text-[#756554]">
                {time}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="location" className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <div>
            <p className="text-sm font-black text-[#6f8b74]">오시는 길</p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              편안히 찾아오실 수 있도록 안내합니다.
            </h2>
            <div className="mt-7 space-y-4 text-lg leading-8 text-[#665849]">
              <p>경기도 성남시 분당구 마음로 12, 좋은빌딩 3층</p>
              <p>
                마음역 2번 출구에서 도보 6분 거리입니다. 자차 이용 시 건물
                뒤편 공영주차장을 이용하실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-[#eadfce] bg-[#fffaf3] p-6 text-left shadow-[0_18px_42px_rgba(83,62,39,0.07)]">
            <div>
              <p className="text-sm font-black text-[#8a735b]">MAP</p>
              <p className="mt-3 text-2xl font-black text-[#3b342c]">
                지도 영역
              </p>
              <p className="mt-3 leading-7 text-[#756554]">
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
