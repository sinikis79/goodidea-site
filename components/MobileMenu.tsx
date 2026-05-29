"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

type MobileMenuItem = MenuItem | MenuGroup;

type MobileMenuProps = {
  items: MobileMenuItem[];
};

function isMenuGroup(item: MobileMenuItem): item is MenuGroup {
  return "items" in item;
}

const isExternalHref = (href: string) =>
  href.startsWith("http") || href.startsWith("tel:");

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

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleHashLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    closeMenu();

    if (!href.startsWith("/#") || pathname !== "/") return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
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
      closeMenu();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
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
          className="absolute right-0 top-14 z-[90] w-[17rem] overflow-hidden rounded-3xl border border-[#e6ded0] bg-[#fbf7ef]/95 px-1 py-1 shadow-[0_16px_40px_rgba(43,42,40,0.08)] backdrop-blur-md"
        >
          {items.map((item) => {
            if (isMenuGroup(item)) {
              return (
                <div key={item.label} className="border-b border-[#eadfd3]/70 px-2 py-1.5 last:border-b-0">
                  <p className="rounded-xl px-3 py-1.5 text-[15px] font-black tracking-normal text-[#8a5f42]">
                    {item.label}
                  </p>

                  <div className="mt-0.5 space-y-0 pb-0.5">
                    {item.items.map((child) => {
                      const childClassName = `flex items-center justify-between rounded-xl px-3 py-1.5 text-[14px] font-semibold tracking-[-0.005em] transition ${
                        isActivePath(child.href)
                          ? "bg-[#f3eee5] text-[#3f3a34]"
                          : "text-[#6f6a61] hover:bg-[#f3eee5] hover:text-[#2b2a28] active:bg-[#eee7dc]"
                      }`;

                      if (isExternalHref(child.href)) {
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={closeMenu}
                            className={childClassName}
                          >
                            {child.label}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={(event) => handleHashLinkClick(event, child.href)}
                          className={childClassName}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const itemClassName = `mx-2 flex items-center justify-between rounded-xl px-3 py-1.5 text-[15px] font-black tracking-normal transition ${
              isActivePath(item.href)
                ? "bg-[#f3eee5]/70 text-[#8a5f42]"
                : "text-[#8a5f42] hover:bg-[#f3eee5]/55 active:bg-[#eee7dc]"
            }`;

            if (isExternalHref(item.href)) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
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
                onClick={(event) => handleHashLinkClick(event, item.href)}
                className={itemClassName}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
