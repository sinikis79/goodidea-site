"use client";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

const desktopNavItems = [
  { label: "공지사항", href: "/notice" },
  { label: "의료진", href: "/doctors" },
  { label: "진료과목", href: "/services" },
  { label: "병원 소개", href: "/#about" },
  { label: "오시는 길", href: "/#location" },
];

const mobileNavItems = [
  { label: "공지사항", href: "/notice" },
  { label: "의료진 소개", href: "/doctors" },
  { label: "진료과목", href: "/services" },
  { label: "병원 소개", href: "/#about" },
  { label: "오시는 길", href: "/#location" },
  { label: "진료과정", href: "/care" },
  { label: "병원 둘러보기", href: "/space" },
  { label: "검사항목", href: "/tests" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#e5ddd4] bg-[#fffcf7]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-8">
        <Link
          href="/"
          className="flex h-[70px] max-w-[calc(100vw-76px)] shrink-0 items-center gap-2"
        >
          <Image
            src="/images/common/logo-symbol.png"
            alt=""
            width={160}
            height={160}
            priority
            className="h-[48px] w-[48px] shrink-0 object-contain"
          />
          <Image
            src="/images/common/logo-wordmark.png"
            alt="판교다시봄정신건강의학과"
            width={760}
            height={180}
            priority
            className="h-[50px] w-[330px] max-w-[calc(100vw-120px)] object-contain object-left sm:w-[360px]"
          />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold text-[#7b756c] lg:flex">
          {desktopNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#2b2a28]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <MobileMenu items={mobileNavItems} />
        </div>
      </nav>
    </header>
  );
}
