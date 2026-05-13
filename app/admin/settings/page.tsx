import { mockSettings } from "@/lib/admin/mockData";

type FieldRowProps = {
  label: string;
  value: string | null;
  placeholder?: string;
};

function FieldRow({ label, value, placeholder = "미입력" }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
      <p className="w-32 shrink-0 text-[12px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
        {label}
      </p>
      <div className="flex-1 rounded-xl border border-[#e5ddd4] bg-[#f5f1eb] px-4 py-2.5">
        <p
          className={`text-[13px] font-bold leading-relaxed ${
            value ? "text-[#2b2a28]" : "text-[#c0b8ad]"
          }`}
        >
          {value ?? placeholder}
        </p>
      </div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const s = mockSettings;

  return (
    <div>
      <div className="mb-6">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
          Settings
        </p>
        <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
          기본정보 설정
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6">
          <h2 className="mb-5 text-[13px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
            병원 정보
          </h2>
          <div className="flex flex-col gap-4">
            <FieldRow label="병원명" value={s.name} />
            <FieldRow label="주소" value={s.address} />
            <FieldRow label="전화번호" value={s.phone} />
            <FieldRow label="팩스" value={s.fax} />
            <FieldRow label="소개문구" value={s.description} />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6">
          <h2 className="mb-5 text-[13px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
            진료시간
          </h2>
          <div className="flex flex-col gap-4">
            <FieldRow label="평일" value={s.hours_weekday} />
            <FieldRow label="토요일" value={s.hours_saturday} />
            <FieldRow label="일요일/공휴일" value={s.hours_sunday} />
            <FieldRow label="점심시간" value={s.hours_lunch} />
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6">
          <h2 className="mb-5 text-[13px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
            외부 링크
          </h2>
          <div className="flex flex-col gap-4">
            <FieldRow label="카카오 채널" value={s.kakao_url} placeholder="미등록" />
            <FieldRow label="네이버 지도" value={s.naver_map_url} placeholder="미등록" />
          </div>
        </section>

        <button
          type="button"
          disabled
          title="Supabase 연결 후 활성화"
          className="cursor-not-allowed self-start rounded-xl border border-[#e5ddd4] bg-[#f5f1eb] px-5 py-2.5 text-[13px] font-bold text-[#c0b8ad]"
        >
          저장 (Supabase 연결 후 활성화)
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          Mock 데이터 — 저장 기능은 Supabase 연결 후 활성화됩니다.
        </p>
      </div>
    </div>
  );
}
