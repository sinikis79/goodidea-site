import Image from "next/image";
import Link from "next/link";
import { notices } from "@/lib/notices";

export default function NoticeSection() {
  return (
    <section className="bg-[#f8f5f1] pb-10 pt-4 sm:pb-16 sm:pt-8 lg:pb-20 lg:pt-10">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-[#e3dbd1] bg-[#f1ece5] px-6 py-8 shadow-[0_18px_46px_rgba(73,64,55,0.04)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          <Image
            src="/images/ui/bamboo-shadow.png"
            alt=""
            aria-hidden="true"
            width={720}
            height={720}
            className="pointer-events-none absolute right-[-12%] top-[0%] hidden h-[32rem] w-auto select-none opacity-[0.55] sm:block lg:right-[-6%] lg:h-[44rem]"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-stretch lg:gap-14">
            <div className="lg:border-r lg:border-[#d6ccbf] lg:pr-12">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#8a8073]">
                Notice
              </p>
              <h2 className="mt-4 text-[2rem] font-black leading-[1.18] tracking-tight sm:text-[2.2rem]">
                공지사항
              </h2>
              <p className="mt-4 text-[0.95rem] leading-[1.9] text-[#7b756c]">
                진료 일정과 휴무 안내를 확인하실 수 있습니다.
              </p>
              <Link
                href="/notice"
                className="mt-8 inline-flex min-h-12 items-center gap-8 rounded-md border border-[#b9ad9e] px-5 text-sm font-black text-[#756c61] transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#8a8073] hover:text-[#4b4741] active:scale-[0.99]"
              >
                전체 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="border-t border-[#d9d0c5] lg:border-t-0 lg:py-3">
              {notices.slice(0, 4).map((notice) => (
                <Link
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="group flex items-center gap-4 border-b border-[#d9d0c5] py-5 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#fffcf7]/28 sm:gap-7 sm:py-6 lg:py-7"
                >
                  <span className="w-[6.2rem] shrink-0 text-[0.88rem] font-bold text-[#6f745d] sm:w-32 sm:text-[0.95rem]">
                    {notice.date.replaceAll("-", ".")}
                  </span>
                  <span className="min-w-0 flex-1 line-clamp-1 text-[1rem] font-extrabold leading-[1.4] text-[#2b2a28] group-hover:text-[#1a1918] sm:text-[1.18rem]">
                    {notice.title}
                  </span>
                  <span
                    className="shrink-0 text-xl leading-none text-[#8a8073] transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
