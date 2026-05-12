'use client';

import { useEffect, useRef, useState } from 'react';

const quickLinks = [
  { title: "전화 상담", description: "방문 전 궁금한 점을 바로 문의하세요.", href: "tel:031-000-0000" },
  { title: "오시는 길", description: "주소와 주차 안내를 확인할 수 있습니다.", href: "#location" },
  { title: "진료 시간", description: "예약 가능한 시간대를 미리 살펴보세요.", href: "#hours" },
  { title: "상담 안내", description: "처음 방문하는 분을 위한 흐름입니다.", href: "#services" },
];

export default function QuickLinksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
      <style>{`
        .card-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
                      transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .card-item--visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .card-item { opacity: 1; transform: none; transition: none; }
        }
      `}</style>
      <div ref={ref} className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item, index) => (
          <div
            key={item.title}
            className={`card-item${isVisible ? ' card-item--visible' : ''}`}
            style={{ transitionDelay: reducedMotion ? '0ms' : `${index * 100}ms` }}
          >
            <a
              href={item.href}
              className="flex h-full flex-col rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6 shadow-[0_18px_42px_rgba(73,64,55,0.06)] transition hover:shadow-[0_22px_52px_rgba(73,64,55,0.11)] active:scale-[0.98] hover:-translate-y-1 sm:p-7"
            >
              <h2 className="text-[1.35rem] font-black leading-[1.25] text-[#2b2a28]">{item.title}</h2>
              <p className="mt-3 flex-1 text-base leading-7 text-[#7b756c]">{item.description}</p>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
