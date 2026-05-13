"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  items: MenuItem[];
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (href.startsWith("/#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPageShow(e: PageTransitionEvent) {
      if (e.persisted) setIsOpen(false);
    }
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent) {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative z-[70] shrink-0">
      <button
        ref={buttonRef}
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_14px_36px_rgba(73,64,55,0.08)] transition active:scale-[0.98] hover:border-[#cfc3b5]"
      >
        <span className="flex flex-col gap-1.5">
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
        </span>
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="absolute right-0 top-14 z-[90] w-52 overflow-hidden rounded-3xl border border-[#e6ded0] bg-[#fbf7ef]/95 px-1.5 py-1.5 shadow-[0_16px_40px_rgba(43,42,40,0.08)] backdrop-blur-md"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-bold tracking-[-0.01em] transition ${
                isActivePath(item.href)
                  ? "bg-[#f3eee5] text-[#2b2a28]"
                  : "text-[#7b786f] hover:bg-[#f3eee5] hover:text-[#2b2a28] active:bg-[#eee7dc]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
