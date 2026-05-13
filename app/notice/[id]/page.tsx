import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { notices } from "@/lib/notices";

export async function generateStaticParams() {
  return notices.map((n) => ({ id: n.id }));
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = notices.find((n) => n.id === id);
  if (!notice) notFound();

  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href="/notice"
          className="inline-flex items-center gap-1.5 text-sm font-black text-[#8a8073] transition hover:text-[#4b4741]"
        >
          ← 공지사항
        </Link>

        <p className="mt-6 text-[13px] text-[#a09488]">{notice.date}</p>
        <h1 className="mt-3 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
          {notice.title}
        </h1>

        <div className="mt-8 border-t border-[#e5ddd4] pt-8">
          <p className="whitespace-pre-wrap text-[1.05rem] leading-8 text-[#4b4741]">
            {notice.content}
          </p>

          {notice.imageSrc && (
            <a
              href={notice.imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block"
            >
              <Image
                src={notice.imageSrc}
                alt={notice.title}
                width={1200}
                height={800}
                className="h-auto w-full rounded-2xl border border-[#e5ddd4]"
              />
            </a>
          )}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
