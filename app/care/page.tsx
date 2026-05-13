import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";

export default function CarePage() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />
      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="text-[13px] font-black uppercase tracking-[0.14em] text-[#8a8073]">준비 중</p>
        <h1 className="mt-4 text-[1.85rem] font-black leading-[1.22] tracking-tight sm:text-[2.35rem]">
          진료과정
        </h1>
      </section>
      <BottomNav />
    </main>
  );
}
