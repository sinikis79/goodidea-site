"use client";

import { useState } from "react";

type MenuItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  items: MenuItem[];
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details
      className="group relative"
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary
        aria-expanded={isOpen}
        className="flex h-12 w-12 cursor-pointer list-none items-center justify-center rounded-full border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_14px_36px_rgba(73,64,55,0.08)] transition active:scale-[0.98] hover:border-[#cfc3b5] [&::-webkit-details-marker]:hidden"
      >
        <span className="sr-only">{isOpen ? "메뉴 닫기" : "메뉴 열기"}</span>
        <span className="flex flex-col gap-1.5">
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
          <span className="h-0.5 w-6 rounded-full bg-[#2b2a28]" />
        </span>
      </summary>
      <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] p-2 shadow-[0_18px_50px_rgba(73,64,55,0.13)]">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="block rounded-2xl px-4 py-3 text-base font-extrabold text-[#2b2a28] transition hover:bg-[#f1ece5]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </details>
  );
}
