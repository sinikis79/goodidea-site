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
  const [moreOpen, setMoreOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const morePanelRef = useRef<HTMLDivElement>(null);

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
      const inButton = moreButtonRef.current?.contains(target);
      const inPanel = morePanelRef.current?.contains(target);
      console.log("[더보기 outside pointerdown] inButton:", inButton, "inPanel:", inPanel, "target:", target);
      if (inButton || inPanel) {
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
    <header className="relative sticky top-0 z-[100] border-b border-[#e5ddd4] bg-[#fffcf7]/95 backdrop-blur pointer-events-auto">
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

        <div className="hidden items-center gap-6 text-sm font-bold text-[#7b756c] lg:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition hover:text-[#2b2a28]"
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              ref={moreButtonRef}
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();
                const el = document.elementFromPoint(e.clientX, e.clientY);
                console.log("[더보기 pointerdown] target:", e.target, "elementFromPoint:", el);
              }}
              onClick={(e) => {
                console.log("[더보기 clicked] moreOpen:", moreOpen, "target:", e.target, "currentTarget:", e.currentTarget);
                setMoreOpen((v) => !v);
              }}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              className={`relative z-[120] cursor-pointer bg-transparent p-0 font-bold transition pointer-events-auto ${moreOpen ? "text-[#2b2a28]" : "hover:text-[#2b2a28]"}`}
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
                    className="block rounded-xl px-4 py-2.5 text-sm font-extrabold text-[#2b2a28] transition hover:bg-[#f1ece5]"
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
