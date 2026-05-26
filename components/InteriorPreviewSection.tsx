"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDE_INTERVAL_MS = 2500;

const interiorImages = [
  "/images/interior/interior-1.jpg",
  "/images/interior/interior-2.jpg",
  "/images/interior/interior-3.jpg",
  "/images/interior/interior-4.jpg",
];

export default function InteriorPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || interiorImages.length <= 1) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % interiorImages.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

  return (
    <section
      id="interior"
      className="bg-[#f8f5f1] px-5 pb-10 pt-4 sm:px-8 sm:pb-16 sm:pt-8"
    >
      <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-center lg:gap-10">
        <div className="max-w-2xl lg:max-w-[430px]">
          <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">
            병원 둘러보기
          </p>
          <h2 className="mt-3 text-[1.55rem] font-black leading-[1.25] tracking-tight text-[#2b2a28] sm:text-[2.15rem] lg:text-[2rem]">
            편안하게 머무를 수 있는 공간을 소개합니다.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-7 text-[#7b756c] sm:text-[1.05rem]">
            차분한 상담 공간을 미리 확인해보세요.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#e6ded4] bg-[#fffcf7]/92 shadow-[0_16px_42px_rgba(73,64,55,0.045)]">
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/8] lg:aspect-[16/10]">
            <div
              className={`flex h-full ${
                reducedMotion
                  ? ""
                  : "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              }`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {interiorImages.map((src, index) => {
                const hasImageError = failedImages.has(index);

                return (
                  <div
                    key={src}
                    className="relative h-full min-w-full bg-[#f3eee5]"
                  >
                    {!hasImageError && (
                      <Image
                        src={src}
                        alt={`판교다시봄 정신건강의학과 내부 공간 ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 62vw"
                        className="object-cover"
                        onError={() => {
                          setFailedImages((current) => {
                            const next = new Set(current);
                            next.add(index);
                            return next;
                          });
                        }}
                      />
                    )}

                    {hasImageError && (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#fffaf2,#efe5d7)] px-6 text-center">
                        <div>
                          <p className="text-[0.78rem] font-black tracking-[0.16em] text-[#9a8067]">
                            COMING SOON
                          </p>
                          <p className="mt-3 text-[1.15rem] font-black text-[#5f5146] sm:text-[1.35rem]">
                            사진 준비 중입니다
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 px-5 py-3 sm:py-4">
            {interiorImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`병원 둘러보기 ${index + 1}번째 사진 보기`}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-6 bg-[#8a6a4f]"
                    : "w-1.5 bg-[#d8cec2] hover:bg-[#b9aa9b]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
