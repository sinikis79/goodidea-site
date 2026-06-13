import SiteHeader from "@/components/SiteHeader";
import BottomNav from "@/components/BottomNav";
import { getPublicNonCoveredFees } from "@/lib/non-covered";

export default async function NonCoveredPage() {
  const { settings, items: nonCoveredItems } = await getPublicNonCoveredFees();

  return (
    <main className="min-h-screen bg-[#f8f5f1] pb-44 text-[#2b2a28] md:pb-0">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-20">
        <div className="max-w-[760px]">
          <p className="text-[13px] font-black tracking-[0.08em] text-[#8a8073]">
            비급여안내
          </p>
          <h1 className="mt-5 text-[2.15rem] font-black leading-[1.25] tracking-tight text-[#6f4329] sm:text-[3.2rem] sm:leading-[1.18] lg:text-[3.75rem]">
            비급여 진료비용 안내
          </h1>
          <p className="mt-5 text-[0.98rem] leading-8 text-[#7b6b5f] sm:text-[1.05rem]">
            {settings.intro_text}
          </p>
        </div>

        <div className="mt-9 overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] shadow-[0_18px_42px_rgba(73,64,55,0.06)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-[0.92rem] text-[#4b4741]">
              <thead className="bg-[#f1ece5] text-[#6f4329]">
                <tr>
                  <th className="w-[11rem] border-b border-[#e5ddd4] px-5 py-4 font-black">
                    대분류
                  </th>
                  <th className="border-b border-[#e5ddd4] px-5 py-4 font-black">
                    항목
                  </th>
                  <th className="w-[9rem] border-b border-[#e5ddd4] px-5 py-4 text-right font-black">
                    금액(원)
                  </th>
                  <th className="w-[8rem] border-b border-[#e5ddd4] px-5 py-4 font-black">
                    비고
                  </th>
                </tr>
              </thead>
              <tbody>
                {nonCoveredItems.map((item, index) => {
                  const isFirstInCategory =
                    index === 0 ||
                    item.category !== nonCoveredItems[index - 1].category;

                  return (
                    <tr
                      key={`${item.category}-${item.name}`}
                      className="border-b border-[#eee7df] last:border-b-0"
                    >
                      <td className="px-5 py-3.5 align-top font-bold text-[#7b6047]">
                        {isFirstInCategory ? item.category : ""}
                      </td>
                      <td className="px-5 py-3.5 align-top font-bold">
                        {item.name}
                      </td>
                      <td className="px-5 py-3.5 text-right align-top font-bold tabular-nums">
                        {item.price}
                      </td>
                      <td className="px-5 py-3.5 align-top text-[#7b756c]">
                        {item.note}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-5 text-[0.9rem] leading-7 text-[#7b756c]">
          {settings.note_text}
        </p>
      </section>

      <BottomNav />
    </main>
  );
}
