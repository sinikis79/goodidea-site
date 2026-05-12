const bottomNavItems = [
  { label: "전화", href: "tel:031-000-0000", icon: "phone" },
  { label: "오시는길", href: "#location", icon: "map" },
  { label: "상담", href: "#services", icon: "chat" },
  { label: "진료시간", href: "#hours", icon: "clock" },
  { label: "블로그", href: "#about", icon: "blog" },
] as const;

function BottomNavIcon({
  name,
}: {
  name: (typeof bottomNavItems)[number]["icon"];
}) {
  const common = {
    className: "h-7 w-7",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  if (name === "phone") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6.6 4.8 9 4.2l2 4.4-1.5 1.2a10.8 10.8 0 0 0 4.7 4.7l1.2-1.5 4.4 2-.6 2.4c-.2.8-.9 1.3-1.7 1.3A14.2 14.2 0 0 1 4.2 6.5c0-.8.6-1.5 1.4-1.7Z" />
      </svg>
    );
  }

  if (name === "map") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 21s6-5.1 6-10a6 6 0 0 0-12 0c0 4.9 6 10 6 10Z" />
        <path d="M12 13.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
      </svg>
    );
  }

  if (name === "chat") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v4A3.5 3.5 0 0 1 15.5 14H11l-4.5 4v-4.2A3.5 3.5 0 0 1 5 11V6.5Z" />
        <path d="M9 8.5h6" />
        <path d="M9 11h3.8" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M12 7.5V12l3 1.8" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="M6.5 4.5h8.3L18 7.8v11.7h-11.5v-15Z" />
      <path d="M14.5 4.8V8h3.2" />
      <path d="M9 11h6" />
      <path d="M9 14h6" />
      <path d="M9 17h3.5" />
    </svg>
  );
}

export default function BottomNav() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#cfc3b5] bg-[#fffcf7]/95 px-2 pt-3 pb-[calc(0.875rem+env(safe-area-inset-bottom))] shadow-[0_-10px_30px_rgba(73,64,55,0.11)] backdrop-blur md:hidden">
      <nav
        aria-label="모바일 상담 바로가기"
        className="mx-auto grid max-w-xl grid-cols-5 gap-0"
      >
        {bottomNavItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex min-h-[80px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-transparent px-1 text-center text-[13px] font-bold leading-tight text-[#4b4741] transition-[transform,background-color,border-color,color] duration-200 ease-out active:scale-[0.98] active:border-[#cfc3b5] active:bg-[#f1ece5]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f1ece5] text-[#756c61]">
              <BottomNavIcon name={item.icon} />
            </span>
            <span className="block w-full truncate">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
