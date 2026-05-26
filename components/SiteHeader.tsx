"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_xxxxxx/chat";
const PHONE_NUMBER = "tel:031-000-0000";
const BLOG_URL = "#";

const navGroups = [
  {
    key: "about",
    label: "병원소개",
    items: [
      { label: "병원소개", href: "/#about" },
      { label: "의료진 소개", href: "/doctors" },
      { label: "병원 둘러보기", href: "/#interior" },
    ],
  },
  {
    key: "care",
    label: "진료안내",
    items: [
      { label: "진료과목", href: "/#services" },
      { label: "진료과정", href: "/care/process" },
      { label: "검사항목", href: "/tests" },
    ],
  },
  {
    key: "reservation",
    label: "예약하기",
    items: [
      { label: "카톡 예약하기", href: KAKAO_CHANNEL_URL },
      { label: "전화 예약", href: PHONE_NUMBER },
    ],
  },
];

const standaloneNavItems = [
  { label: "공지/휴무안내", href: "/notice" },
  { label: "블로그", href: BLOG_URL },
  { label: "오시는 길", href: "/#location" },
];

const mobileNavItems = [...navGroups, ...standaloneNavItems];

const isExternalHref = (href: string) =>
  href.startsWith("http") || href.startsWith("tel:");

export default function SiteHeader() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isActivePath = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isGroupActive = (items: { href: string }[]) =>
    items.some((item) => isActivePath(item.href));

  useEffect(() => {
    function onScroll() {
      setHasScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[60] border-b backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-out pointer-events-auto ${
        hasScrolled
          ? "bg-[#f8f5ee]/95 border-[#e7e1d5] shadow-[0_4px_18px_rgba(43,42,40,0.04)]"
          : "bg-[#f8f5ee]/75 border-transparent shadow-none"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-8">
        <Link
          href="/"
          aria-label="판교다시봄 정신건강의학과 홈으로 이동"
          className="relative z-[90] flex h-[70px] max-w-[calc(100vw-76px)] shrink-0 items-center gap-2 pointer-events-auto"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
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
            alt="판교다시봄 정신건강의학과"
            width={760}
            height={180}
            priority
            className="h-[50px] w-[330px] max-w-[calc(100vw-120px)] object-contain object-left sm:w-[360px]"
          />
        </Link>

        <div
          className="hidden items-center gap-7 text-sm font-bold lg:flex"
          onMouseLeave={() => setActiveMenu(null)}
        >
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative py-3"
              onMouseEnter={() => setActiveMenu(group.key)}
              onFocusCapture={() => setActiveMenu(group.key)}
              onBlurCapture={(event) => {
                const nextTarget = event.relatedTarget as Node | null;
                if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
                  setActiveMenu(null);
                }
              }}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={activeMenu === group.key}
                className={`cursor-default bg-transparent p-0 text-sm font-bold transition ${
                  activeMenu === group.key || isGroupActive(group.items)
                    ? "text-[#2b2a28]"
                    : "text-[#7b786f] hover:text-[#2b2a28] focus:text-[#2b2a28]"
                }`}
              >
                {group.label}
              </button>
              <div
                className={`absolute left-1/2 top-10 z-50 w-48 -translate-x-1/2 rounded-2xl border border-[#e5ddd4] bg-[#fffcf7]/98 p-1.5 shadow-[0_18px_48px_rgba(73,64,55,0.10)] transition duration-200 ease-out ${
                  activeMenu === group.key
                    ? "visible pointer-events-auto translate-y-0 opacity-100"
                    : "invisible pointer-events-none translate-y-1 opacity-0"
                }`}
              >
                {group.items.map((item) => {
                  const itemClassName = `block rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                    isActivePath(item.href)
                      ? "bg-[#f3eee5] text-[#2b2a28]"
                      : "text-[#7b786f] hover:bg-[#f1ece5] hover:text-[#2b2a28] focus:bg-[#f1ece5] focus:text-[#2b2a28]"
                  }`;

                  if (isExternalHref(item.href)) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className={itemClassName}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveMenu(null)}
                      className={itemClassName}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {standaloneNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setActiveMenu(null)}
              onFocus={() => setActiveMenu(null)}
              onClick={() => setActiveMenu(null)}
              className={`transition ${
                isActivePath(item.href)
                  ? "text-[#2b2a28]"
                  : "text-[#7b786f] hover:text-[#2b2a28]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          <MobileMenu key={pathname} items={mobileNavItems} />
        </div>
      </nav>
    </header>
  );
}
