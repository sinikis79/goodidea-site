"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "대시보드", href: "/admin" },
  { label: "공지사항 관리", href: "/admin/notices" },
  { label: "의료진 관리", href: "/admin/doctors" },
  { label: "병원 둘러보기", href: "/admin/interior" },
  { label: "비급여안내", href: "/admin/non-covered" },
  { label: "기본정보 설정", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[#e5ddd4] bg-[#eee8de] px-3 py-6">
      <div className="mb-8 px-3">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
          Admin
        </p>
        <p className="mt-1 text-[15px] font-black leading-snug text-[#2b2a28]">
          판교다시봄
        </p>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-xl px-3 py-2.5 text-[13px] font-bold transition ${
              isActive(item.href)
                ? "bg-[#f3eee5] text-[#2b2a28]"
                : "text-[#7b786f] hover:bg-[#e5ddd4] hover:text-[#2b2a28]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-3">
        <Link
          href="/admin/logout"
          className="mb-4 block rounded-xl border border-[#d8cfc3] px-3 py-2 text-center text-[12px] font-black text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
        >
          로그아웃
        </Link>
        <p className="text-[11px] text-[#a89e90]">Mock 데이터 모드</p>
        <p className="text-[11px] text-[#c0b8ad]">Supabase 미연결</p>
      </div>
    </aside>
  );
}
