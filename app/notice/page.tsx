import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { notices } from "@/lib/notices";

export default function NoticePage() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">공지사항</p>
        <h1 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
          진료 일정 및 휴무 안내
        </h1>
        <p className="mt-4 text-[1.05rem] leading-8 text-[#7b756c]">
          진료 일정 변경 및 휴무 안내를 확인하실 수 있습니다.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {notices.map((notice) => (
            <Link
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="flex min-h-[120px] flex-col rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5 shadow-[0_18px_42px_rgba(73,64,55,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(73,64,55,0.11)] active:scale-[0.98] sm:p-6"
            >
              <p className="line-clamp-2 text-[1rem] font-black leading-[1.35] text-[#2b2a28]">
                {notice.title}
              </p>
              <p className="mt-auto pt-4 text-[13px] text-[#a09488]">{notice.date}</p>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
