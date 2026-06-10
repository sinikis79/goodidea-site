"use client";

import {
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { DEFAULT_PHONE_NUMBER } from "@/lib/phone";

const KAKAO_CHANNEL_URL = "https://pf.kakao.com/_lLxnGX/chat";

type PhoneContactLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

const getPhoneNumber = (href: string) =>
  href.replace(/^tel:/, "").trim() || DEFAULT_PHONE_NUMBER;

const isMobilePhoneContext = () => {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(max-width: 767px)").matches;
};

export default function PhoneContactLink({
  children,
  href,
  onClick,
  ...props
}: PhoneContactLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = getPhoneNumber(href);
  const canUsePortal = typeof document !== "undefined";

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isMobilePhoneContext()) {
      onClick?.(event);
      return;
    }

    event.preventDefault();
    onClick?.(event);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDialog();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    function resetDialogState() {
      setIsOpen(false);
    }

    window.addEventListener("pagehide", resetDialogState);
    window.addEventListener("pageshow", resetDialogState);

    return () => {
      window.removeEventListener("pagehide", resetDialogState);
      window.removeEventListener("pageshow", resetDialogState);
    };
  }, []);

  const dialog = isOpen ? (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b2a28]/24 px-5 backdrop-blur-[2px]"
      role="dialog"
      onMouseDown={closeDialog}
    >
      <div
        className="w-full max-w-[420px] rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] p-6 text-center shadow-[0_22px_60px_rgba(43,42,40,0.16)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <p className="text-[0.9rem] font-black text-[#8a5f42]">
          전화 상담
        </p>
        <p className="mt-3 text-[1.8rem] font-black leading-tight text-[#2b2a28]">
          {phoneNumber}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            href="/#hours"
            className="flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border border-[#d8cec2] bg-[#f8f5f1] px-3 text-sm font-black text-[#4b4741] transition active:scale-[0.98] hover:bg-[#f1ece5] sm:px-4"
            onClick={closeDialog}
          >
            운영시간 확인하기
          </Link>
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center whitespace-nowrap rounded-xl border border-[#d8cec2] bg-[#8a8073] px-3 text-sm font-black text-[#fffaf2] transition active:scale-[0.98] hover:bg-[#756c61] sm:px-4"
            onClick={closeDialog}
          >
            카톡 상담하기
          </a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <a href={href} onClick={handleClick} {...props}>
        {children}
      </a>

      {canUsePortal && dialog ? createPortal(dialog, document.body) : null}
    </>
  );
}
