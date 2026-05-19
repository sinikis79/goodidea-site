const quickLinks = [
  {
    title: "전화 상담",
    description: "방문 전 궁금한 점을 바로 문의하세요.",
    href: "tel:031-000-0000",
    icon: "phone",
  },
  {
    title: "오시는 길",
    description: "주소와 주차 안내를 확인할 수 있습니다.",
    href: "#location",
    icon: "pin",
  },
  {
    title: "진료 시간",
    description: "예약 가능한 시간대를 미리 살펴보세요.",
    href: "#hours",
    icon: "clock",
  },
  {
    title: "블로그",
    description: "병원 소식과 이야기를 확인하세요.",
    href: "#",
    icon: "news",
  },
];

function QuickIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 sm:h-8 sm:w-8"
    >
      {name === "phone" && (
        <path
          {...common}
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.8a2 2 0 0 1-.45 2.11L8.05 9.9a16 16 0 0 0 6.05 6.05l1.27-1.27a2 2 0 0 1 2.11-.45c.9.31 1.84.53 2.8.66A2 2 0 0 1 22 16.92Z"
        />
      )}
      {name === "pin" && (
        <>
          <path
            {...common}
            d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z"
          />
          <circle {...common} cx="12" cy="10" r="2.5" />
        </>
      )}
      {name === "clock" && (
        <>
          <circle {...common} cx="12" cy="12" r="9" />
          <path {...common} d="M12 7.5V12l3.2 2" />
        </>
      )}
      {name === "news" && (
        <>
          <path
            {...common}
            d="M5 4.5h11.5A2.5 2.5 0 0 1 19 7v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5Z"
          />
          <path {...common} d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" />
        </>
      )}
    </svg>
  );
}

export default function QuickLinksSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-6 pt-4 sm:px-8 sm:pb-14 sm:pt-10 lg:pb-16 lg:pt-12">
      <style>{`
        @keyframes ql-reveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ql-card {
          animation: ql-reveal 1100ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .ql-card { animation: none; }
        }
      `}</style>
      <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
        {quickLinks.map((item, index) => (
          <div
            key={item.title}
            className="ql-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <a
              href={item.href}
              className="group flex h-full min-h-[128px] flex-col items-center justify-center rounded-2xl border border-[#e6ded4] bg-[#fffaf2]/95 p-4 text-center shadow-[0_10px_26px_rgba(73,64,55,0.022)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d8cec2] hover:bg-[#fffcf7] hover:shadow-[0_16px_38px_rgba(73,64,55,0.05)] active:translate-y-[1px] active:scale-[0.995] sm:min-h-[184px] sm:items-start sm:justify-start sm:bg-[#fffcf7]/92 sm:p-6 sm:text-left sm:shadow-[0_12px_34px_rgba(73,64,55,0.035)]"
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe5d7] text-[#7b6047] transition-colors duration-500 group-hover:bg-[#f4eadc] sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent sm:text-[#6a7059] sm:group-hover:bg-transparent"
              >
                <QuickIcon name={item.icon} />
              </span>
              <h2 className="mt-2.5 text-[1rem] font-black leading-[1.25] text-[#2b2a28] sm:mt-5 sm:text-[1.35rem]">
                {item.title}
              </h2>
              <p className="mt-2.5 hidden flex-1 text-base leading-7 text-[#7b756c] sm:block">
                {item.description}
              </p>
              <span
                className="mt-3 hidden self-end text-2xl leading-none text-[#4b4741] transition-transform duration-500 group-hover:translate-x-1 sm:block"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
