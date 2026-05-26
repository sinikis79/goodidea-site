import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { getPublicNoticePage } from "@/lib/notices";

type NoticePageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function NoticePage({ searchParams }: NoticePageProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page ?? 1);
  const { notices, page, totalPages } = await getPublicNoticePage(
    currentPage,
    12,
  );
  const hasPrevious = page > 1;
  const hasNext = page < totalPages;

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

        {totalPages > 1 ? (
          <nav
            aria-label="공지사항 페이지 이동"
            className="mt-10 flex items-center justify-center gap-3"
          >
            <Link
              href={hasPrevious ? `/notice?page=${page - 1}` : "#"}
              aria-disabled={!hasPrevious}
              className={`inline-flex h-11 min-w-24 items-center justify-center rounded-xl border px-4 text-[13px] font-black transition ${
                hasPrevious
                  ? "border-[#d8cfc3] text-[#5f5146] hover:bg-[#f3eee5]"
                  : "pointer-events-none border-[#ece4da] text-[#c7beb3]"
              }`}
            >
              이전
            </Link>
            <span className="min-w-20 text-center text-[13px] font-black text-[#8a8073]">
              {page} / {totalPages}
            </span>
            <Link
              href={hasNext ? `/notice?page=${page + 1}` : "#"}
              aria-disabled={!hasNext}
              className={`inline-flex h-11 min-w-24 items-center justify-center rounded-xl border px-4 text-[13px] font-black transition ${
                hasNext
                  ? "border-[#d8cfc3] text-[#5f5146] hover:bg-[#f3eee5]"
                  : "pointer-events-none border-[#ece4da] text-[#c7beb3]"
              }`}
            >
              다음
            </Link>
          </nav>
        ) : null}
      </section>

      <BottomNav />
    </main>
  );
}
