"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

const primaryNavItems = [
  { label: "공지사항", href: "/notice" },
  { label: "의료진 소개", href: "/doctors" },
  { label: "진료과목", href: "/services" },
  { label: "병원 소개", href: "/#about" },
  { label: "오시는 길", href: "/#location" },
];

const secondaryNavItems = [
  { label: "진료과정", href: "/care" },
  { label: "병원 둘러보기", href: "/space" },
  { label: "검사항목", href: "/tests" },
];

const allNavItems = [...primaryNavItems, ...secondaryNavItems];

export default function SiteHeader() {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const morePanelRef = useRef<HTMLDivElement>(null);

  const isActivePath = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const anySecondaryActive = secondaryNavItems.some((item) => isActivePath(item.href));

  useEffect(() => {
    function onScroll() {
      setHasScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) setMoreOpen(false);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        moreButtonRef.current?.contains(target) ||
        morePanelRef.current?.contains(target)
      ) {
        return;
      }
      setMoreOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMoreOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

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
          aria-label="판교다시봄정신건강의학과 홈으로 이동"
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
            alt="판교다시봄정신건강의학과"
            width={760}
            height={180}
            priority
            className="h-[50px] w-[330px] max-w-[calc(100vw-120px)] object-contain object-left sm:w-[360px]"
          />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-bold lg:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition ${
                isActivePath(item.href)
                  ? "text-[#2b2a28]"
                  : "text-[#7b786f] hover:text-[#2b2a28]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              ref={moreButtonRef}
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`cursor-pointer bg-transparent p-0 text-sm font-bold transition pointer-events-auto ${
                moreOpen || anySecondaryActive
                  ? "text-[#2b2a28]"
                  : "text-[#7b786f] hover:text-[#2b2a28]"
              }`}
            >
              더보기
            </button>
            {moreOpen && (
              <div
                ref={morePanelRef}
                className="absolute right-0 top-8 w-44 overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-1.5 shadow-[0_18px_50px_rgba(73,64,55,0.13)]"
              >
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={`block rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                      isActivePath(item.href)
                        ? "bg-[#f3eee5] text-[#2b2a28]"
                        : "text-[#7b786f] hover:bg-[#f1ece5] hover:text-[#2b2a28]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden">
          <MobileMenu key={pathname} items={allNavItems} />
        </div>
      </nav>
    </header>
  );
}
