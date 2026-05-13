import { mockDoctors } from "@/lib/admin/mockData";

export default function AdminDoctorsPage() {
  const doctors = mockDoctors;

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
            Content
          </p>
          <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
            의료진 관리
          </h1>
        </div>
        <button
          type="button"
          disabled
          title="Supabase 연결 후 활성화"
          className="cursor-not-allowed rounded-xl border border-[#e5ddd4] bg-[#f5f1eb] px-4 py-2.5 text-[13px] font-bold text-[#c0b8ad]"
        >
          + 의료진 추가
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0ebe2] text-[13px] font-black text-[#a89e90]">
                  {doctor.order}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-[#2b2a28]">{doctor.name}</p>
                    <span className="text-[12px] text-[#a89e90]">{doctor.title}</span>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        doctor.visible
                          ? "bg-[#e8f0e8] text-[#3d6b3d]"
                          : "bg-[#f0ebe2] text-[#a89e90]"
                      }`}
                    >
                      {doctor.visible ? "노출" : "숨김"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-[#a89e90]">{doctor.specialty}</p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  disabled
                  title="Supabase 연결 후 활성화"
                  className="cursor-not-allowed rounded-lg border border-[#e5ddd4] px-3 py-1.5 text-[12px] font-bold text-[#c0b8ad]"
                >
                  수정
                </button>
                <button
                  type="button"
                  disabled
                  title="Supabase 연결 후 활성화"
                  className="cursor-not-allowed rounded-lg border border-[#e5ddd4] px-3 py-1.5 text-[12px] font-bold text-[#c0b8ad]"
                >
                  순서
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#f5f1eb] px-4 py-3">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
                  학력
                </p>
                <p className="whitespace-pre-line text-[13px] leading-6 text-[#7b786f]">
                  {doctor.education}
                </p>
              </div>
              <div className="rounded-xl bg-[#f5f1eb] px-4 py-3">
                <p className="mb-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
                  경력
                </p>
                <p className="whitespace-pre-line text-[13px] leading-6 text-[#7b786f]">
                  {doctor.career}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          Mock 데이터 — 수정·순서 변경은 Supabase 연결 후 활성화됩니다.
        </p>
      </div>
    </div>
  );
}
