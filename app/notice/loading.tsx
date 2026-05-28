import BottomNav from "@/components/BottomNav";
import SiteHeader from "@/components/SiteHeader";

const skeletonCards = Array.from({ length: 8 }, (_, index) => index);

export default function NoticeLoading() {
  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
        <div className="h-4 w-20 rounded-full bg-[#e7dfd5]" />
        <div className="mt-5 h-10 w-full max-w-[26rem] rounded-2xl bg-[#e7dfd5] sm:h-12" />
        <div className="mt-5 h-6 w-full max-w-[30rem] rounded-full bg-[#ede6dd]" />

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skeletonCards.map((item) => (
            <div
              key={item}
              className="min-h-[120px] rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5 shadow-[0_18px_42px_rgba(73,64,55,0.04)] sm:p-6"
            >
              <div className="h-5 w-4/5 rounded-full bg-[#e7dfd5]" />
              <div className="mt-3 h-5 w-2/3 rounded-full bg-[#eee7df]" />
              <div className="mt-8 h-4 w-24 rounded-full bg-[#ede6dd]" />
            </div>
          ))}
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
