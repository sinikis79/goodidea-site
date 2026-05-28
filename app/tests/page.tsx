import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";

export default function TestsPage() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />
      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-20">
        <div className="overflow-hidden rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_18px_42px_rgba(73,64,55,0.06)]">
          <Image
            src="/images/tests/tests-overview.png"
            alt="검사항목 안내"
            width={1536}
            height={1024}
            priority
            className="h-auto w-full"
          />
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
