import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";

const processSteps = [
  {
    number: "01",
    label: "상담",
    title: "상담 및 초기 면담",
    summary: [
      "처음 내원하시면 현재 가장 힘든 부분과 최근의 변화들에 대해 편안하게 이야기를 나눕니다.",
      "말을 잘 정리해 오지 않아도 괜찮습니다. 의료진이 필요한 질문을 천천히 드리며 현재 상태를 함께 파악합니다.",
    ],
    points: ["최근 감정 변화", "수면 및 생활 리듬", "스트레스와 관계 문제", "이전 치료 경험", "필요 시 심리검사 여부"],
  },
  {
    number: "02",
    label: "이해",
    title: "현재 상태에 대한 이해",
    summary: [
      "상담 내용을 바탕으로 어떤 어려움이 반복되고 있는지 함께 정리합니다.",
      "증상만 따로 보는 것이 아니라 개인의 성향, 환경, 관계, 생활 리듬까지 함께 살피며 회복의 실마리를 찾습니다.",
    ],
    points: ["감정의 흐름", "생활 패턴", "관계와 환경", "신체 증상", "치료 방향"],
  },
  {
    number: "03",
    label: "치료",
    title: "개인에 맞는 치료 진행",
    summary: [
      "현재 상태와 속도에 맞추어 상담, 약물, 생활 조정 등 필요한 치료를 조율합니다.",
      "치료는 모두에게 같은 방식으로 진행되지 않습니다. 충분히 설명드리고 동의할 수 있는 방향으로 함께 선택합니다.",
    ],
    points: ["무리하지 않는 속도", "상담 치료", "약물 치료", "생활 리듬 조정", "현실적인 목표"],
  },
  {
    number: "04",
    label: "점검",
    title: "변화와 회복 점검",
    summary: [
      "치료 과정 속에서 좋아지는 부분과 조정이 필요한 부분을 함께 확인합니다.",
      "때로는 예상하지 못했던 어려움이 드러나기도 합니다. 그럴 때마다 치료 방향을 다시 조정하며 회복의 속도를 맞춥니다.",
    ],
    points: ["감정 기복 감소", "수면 회복", "불안 완화", "일상 기능 회복", "치료 방향 조정"],
  },
  {
    number: "05",
    label: "유지",
    title: "안정적인 일상으로의 회복",
    summary: [
      "충분히 안정되었다고 판단되면 치료 간격을 조절하거나 마무리를 준비합니다.",
      "회복은 증상이 없어지는 것만이 아니라 스스로를 조금 더 이해하고, 일상을 편안하게 이어가는 과정에 있습니다.",
    ],
    points: ["치료 간격 조정", "재발 예방", "자기 이해", "일상 유지", "필요 시 재상담"],
  },
];

function ProcessHero() {
  return (
    <section className="bg-[#f8f5f1] px-5 pb-8 pt-14 sm:px-8 sm:pb-12 sm:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">
          진료과정
        </p>
        <h1 className="mt-5 text-[2.15rem] font-black leading-[1.25] tracking-tight text-[#6f4329] sm:text-[3.2rem] sm:leading-[1.18] lg:text-[3.75rem]">
          진료과정
        </h1>
        <p className="mt-5 max-w-[25em] text-[1.28rem] font-bold leading-[1.55] text-[#4b3b32] sm:text-[1.75rem]">
          처음부터 모든 이야기를 잘 해야 하는 것은 아닙니다.
        </p>
        <p className="mt-5 max-w-[38rem] text-[0.98rem] leading-8 text-[#7b6b5f] sm:text-[1.05rem]">
          조금 천천히, 편안한 속도로 이야기를 나누며 현재의 어려움을 함께 이해해갑니다.
        </p>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  return (
    <section className="hidden bg-[#f8f5f1] px-8 py-6 lg:block">
      <div className="mx-auto max-w-[1400px] rounded-2xl border border-[#eadfd3] bg-[#fffaf2]/68 p-6">
        <div className="grid grid-cols-5 gap-0">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center px-2 text-center"
            >
              <span className="flex h-[5.2rem] w-[5.2rem] shrink-0 flex-col items-center justify-center rounded-full border border-[#e6d6c7] bg-[#f1e6d8] text-[#8a5f42]">
                <span className="text-[0.78rem] font-black leading-none text-[#b68a68]">
                  {step.number}
                </span>
                <span className="mt-1 text-[0.98rem] font-black leading-none text-[#4b3b32]">
                  {step.label}
                </span>
              </span>
              {index < processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[calc(50%+2.6rem)] top-[2.6rem] w-[calc(100%-5.2rem)] border-t border-dashed border-[#cdb49e]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileProcessCard({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <article className="process-reveal rounded-2xl border border-[#eadfd3] bg-[#fffaf2]/70 p-5">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#f1e6d8] px-3 py-1 text-[#8a5f42]">
        <span className="text-[0.78rem] font-black text-[#b68a68]">
          {step.number}
        </span>
        <span className="text-[0.86rem] font-black text-[#4b3b32]">
          {step.label}
        </span>
      </div>

      <h2 className="mt-4 text-[1.15rem] font-black leading-[1.35] text-[#4b3b32]">
        {step.title}
      </h2>

      <p className="mt-3 text-[0.95rem] leading-7 text-[#6f6258]">
        {step.summary[0]}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {step.points.map((point) => (
          <span
            key={point}
            className="rounded-full border border-[#eadfd3] bg-[#fffaf2] px-3 py-1 text-[0.82rem] font-semibold text-[#6f6258]"
          >
            {point}
          </span>
        ))}
      </div>
    </article>
  );
}

function DesktopProcessCard({ step }: { step: (typeof processSteps)[number] }) {
  return (
    <article className="process-reveal grid grid-cols-[6rem_1fr_20rem] gap-10 border-t border-[#eadfd3] py-10 first:border-t-0">
      <div>
        <span className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-[#e6d6c7] bg-[#f1e6d8] text-[#8a5f42]">
          <span className="text-[0.95rem] font-black leading-none text-[#b68a68]">
            {step.number}
          </span>
          <span className="mt-1 text-[1.12rem] font-black leading-none text-[#4b3b32]">
            {step.label}
          </span>
        </span>
      </div>
      <div>
        <h2 className="text-[1.45rem] font-black leading-[1.3] text-[#6f4329] sm:text-[1.8rem]">
          {step.title}
        </h2>
        <div className="mt-4 max-w-[42rem] space-y-3 text-[0.98rem] leading-8 text-[#6f6258]">
          {step.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#eadfd3] bg-[#fffaf2]/58 p-5">
        <p className="text-[0.9rem] font-black text-[#8a5f42]">함께 확인하는 내용</p>
        <ul className="mt-3 space-y-2 text-[0.92rem] leading-6 text-[#6f6258]">
          {step.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b68a68]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function CareProcessPage() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />
      <style>{`
        @keyframes process-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .process-reveal {
          animation: process-fade-up 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .process-reveal { animation: none; }
        }
      `}</style>
      <ProcessHero />
      <ProcessTimeline />
      <section className="bg-[#f8f5f1] px-5 py-8 sm:px-8 sm:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="space-y-4 lg:hidden">
            {processSteps.map((step) => (
              <MobileProcessCard key={step.number} step={step} />
            ))}
          </div>

          <div className="hidden lg:block">
            {processSteps.map((step) => (
              <DesktopProcessCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
