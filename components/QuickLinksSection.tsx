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
    title: "상담 안내",
    description: "처음 방문하는 분을 위한 흐름입니다.",
    href: "#services",
    icon: "chat",
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
      className="h-8 w-8 text-[#6a7059]"
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
      {name === "chat" && (
        <path
          {...common}
          d="M21 11.5a8.4 8.4 0 0 1-9 8.35 8.8 8.8 0 0 1-3.6-.95L3 20l1.35-4.55A8.2 8.2 0 0 1 3 11.5a8.5 8.5 0 0 1 18 0Z"
        />
      )}
    </svg>
  );
}

export default function QuickLinksSection() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-12 pt-8 sm:px-8 sm:pb-[4.5rem] sm:pt-12">
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
      <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {quickLinks.map((item, index) => (
          <div
            key={item.title}
            className="ql-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <a
              href={item.href}
              className="group flex h-full min-h-[154px] flex-col rounded-2xl border border-[#e6ded4] bg-[#fffcf7]/92 p-5 shadow-[0_12px_34px_rgba(73,64,55,0.035)] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-[#d8cec2] hover:shadow-[0_16px_38px_rgba(73,64,55,0.06)] active:scale-[0.99] sm:min-h-[184px] sm:p-6"
            >
              <QuickIcon name={item.icon} />
              <h2 className="mt-5 text-[1.35rem] font-black leading-[1.25] text-[#2b2a28]">{item.title}</h2>
              <p className="mt-2.5 flex-1 text-base leading-7 text-[#7b756c]">{item.description}</p>
              <span
                className="mt-3 self-end text-2xl leading-none text-[#4b4741] transition-transform duration-500 group-hover:translate-x-1"
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
