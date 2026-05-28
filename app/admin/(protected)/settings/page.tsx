import Image from "next/image";
import { mockOperatingHours, mockSettings } from "@/lib/admin/mockData";
import type { AdminOperatingHour, HospitalSettings } from "@/lib/types/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  addOperatingHourAction,
  saveLocationSettingsAction,
  saveOperatingHoursAction,
} from "./actions";

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

async function getOperatingHours(): Promise<AdminOperatingHour[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("operating_hours")
      .select("id,label,value,order,visible,created_at,updated_at")
      .order("order", { ascending: true });

    if (error) {
      return mockOperatingHours;
    }

    return data ?? mockOperatingHours;
  } catch {
    return mockOperatingHours;
  }
}

async function getHospitalSettings(): Promise<HospitalSettings> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("hospital_settings")
      .select(
        "name,address,phone,fax,hours_weekday,hours_saturday,hours_sunday,hours_lunch,kakao_url,naver_map_url,location_title,location_description,location_image_url,location_image_alt,description",
      )
      .eq("id", 1)
      .single();

    if (error || !data) {
      return mockSettings;
    }

    return {
      ...mockSettings,
      ...data,
      location_title: data.location_title || mockSettings.location_title,
    };
  } catch {
    return mockSettings;
  }
}

type AdminSettingsPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const statusMessage: Record<string, string> = {
  "hours-saved": "진료시간이 저장되었습니다.",
  "hours-required": "진료시간 라벨과 내용을 입력해주세요.",
  "hours-limit": "진료시간은 최대 5줄까지 등록할 수 있습니다.",
  "hours-error": "진료시간 저장에 실패했습니다. 잠시 후 다시 시도해주세요.",
  "location-saved": "오시는 길 정보가 저장되었습니다.",
  "location-title-required": "오시는 길 제목을 입력해주세요.",
  "location-upload-error":
    "지도 이미지 업로드에 실패했습니다. 이미지 용량과 Supabase Storage 설정을 확인해주세요.",
  "location-save-error": "오시는 길 정보 저장에 실패했습니다.",
};

const errorStatuses = new Set([
  "hours-required",
  "hours-limit",
  "hours-error",
  "location-title-required",
  "location-upload-error",
  "location-save-error",
]);

export default async function AdminSettingsPage({
  searchParams,
}: AdminSettingsPageProps) {
  const s = await getHospitalSettings();
  const operatingHours = await getOperatingHours();
  const params = await searchParams;
  const message = params?.status ? statusMessage[params.status] : null;
  const isError = params?.status ? errorStatuses.has(params.status) : false;
  const canAddOperatingHour = operatingHours.length < 5;

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

      {message ? (
        <div
          className={`mb-4 rounded-xl border px-5 py-3 text-[13px] font-black ${
            isError
              ? "border-[#f0d7c8] bg-[#fff3ed] text-[#b06a45]"
              : "border-[#d9e6d2] bg-[#f3f8ef] text-[#58724a]"
          }`}
        >
          {message}
        </div>
      ) : null}

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
          <form action={saveOperatingHoursAction} className="flex flex-col gap-3">
            {operatingHours.map((hour) => (
              <div
                key={hour.id}
                className="grid grid-cols-1 gap-2 rounded-2xl border border-[#eee5da] bg-[#f8f4ed] p-3 sm:grid-cols-[0.9fr_1.4fr_72px_70px] sm:items-center"
              >
                <input type="hidden" name="id" value={hour.id} />
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-[#a89e90]">
                    왼쪽 라벨
                  </span>
                  <input
                    name={`label-${hour.id}`}
                    defaultValue={hour.label}
                    className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-[#a89e90]">
                    오른쪽 시간/설명
                  </span>
                  <input
                    name={`value-${hour.id}`}
                    defaultValue={hour.value}
                    className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-[#a89e90]">
                    순서
                  </span>
                  <input
                    name={`order-${hour.id}`}
                    type="number"
                    defaultValue={hour.order}
                    className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                  />
                </label>
                <label className="flex items-center gap-2 pt-4 text-[12px] font-bold text-[#7b786f] sm:pt-5">
                  <input
                    name={`visible-${hour.id}`}
                    type="checkbox"
                    defaultChecked={hour.visible}
                    className="h-4 w-4 accent-[#7b6047]"
                  />
                  노출
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="mt-2 self-start rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
            >
              진료시간 저장
            </button>
          </form>
          <form
            action={addOperatingHourAction}
            className="mt-5 rounded-2xl border border-dashed border-[#d8cfc3] bg-[#f8f4ed] p-4"
          >
            <p className="text-[12px] font-black text-[#8a8073]">
              진료시간 줄 추가
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[0.9fr_1.4fr_72px_auto] sm:items-end">
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-[#a89e90]">
                  왼쪽 라벨
                </span>
                <input
                  name="label"
                  placeholder="예: 야간진료"
                  disabled={!canAddOperatingHour}
                  className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f] disabled:text-[#c0b8ad]"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-[#a89e90]">
                  오른쪽 시간/설명
                </span>
                <input
                  name="value"
                  placeholder="예: 예약 시 안내"
                  disabled={!canAddOperatingHour}
                  className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f] disabled:text-[#c0b8ad]"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-[#a89e90]">
                  순서
                </span>
                <input
                  name="order"
                  type="number"
                  defaultValue={operatingHours.length + 1}
                  disabled={!canAddOperatingHour}
                  className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f] disabled:text-[#c0b8ad]"
                />
              </label>
              <button
                type="submit"
                disabled={!canAddOperatingHour}
                className="h-10 rounded-xl border border-[#d8cfc3] px-4 text-[12px] font-black text-[#5f5146] transition hover:bg-[#eee5da] disabled:cursor-not-allowed disabled:text-[#c0b8ad]"
              >
                추가
              </button>
            </div>
            {!canAddOperatingHour ? (
              <p className="mt-3 text-[12px] font-bold text-[#b89060]">
                진료시간은 최대 5줄까지 등록할 수 있습니다.
              </p>
            ) : null}
          </form>
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

        <section className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6">
          <h2 className="mb-5 text-[13px] font-black uppercase tracking-[0.1em] text-[#a89e90]">
            오시는 길
          </h2>
          <form action={saveLocationSettingsAction} className="flex flex-col gap-5">
            <input
              type="hidden"
              name="current_location_image_url"
              value={s.location_image_url ?? ""}
            />
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black text-[#a89e90]">
                섹션 제목
              </span>
              <input
                name="location_title"
                defaultValue={s.location_title}
                className="h-11 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-black text-[#a89e90]">
                설명글
              </span>
              <textarea
                name="location_description"
                defaultValue={s.location_description}
                rows={4}
                className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-3 text-[13px] font-bold leading-7 text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              />
            </label>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px] lg:items-start">
              <label className="flex flex-col gap-1.5">
                <span className="text-[11px] font-black text-[#a89e90]">
                  지도 이미지
                </span>
                <input
                  name="location_image"
                  type="file"
                  accept="image/*"
                  className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2 text-[13px] font-bold text-[#7b786f] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8ddd0] file:px-3 file:py-1.5 file:text-[12px] file:font-black file:text-[#5f5146]"
                />
                <span className="text-[12px] font-bold leading-6 text-[#a89e90]">
                  새 이미지를 선택하면 기존 지도 이미지가 교체됩니다.
                </span>
              </label>
              <div className="overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#f8f4ed]">
                {s.location_image_url ? (
                  <Image
                    src={s.location_image_url}
                    alt={s.location_image_alt ?? "오시는 길 지도 이미지"}
                    width={480}
                    height={300}
                    unoptimized
                    className="aspect-[8/5] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[8/5] items-center justify-center px-4 text-center text-[12px] font-black text-[#b5aa9c]">
                    지도 이미지 미등록
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="self-start rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
            >
              오시는 길 저장
            </button>
          </form>
        </section>

      </div>

      <div className="mt-6 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          진료시간과 오시는 길 정보는 Supabase에 저장됩니다. 병원 정보와 외부 링크 수정은 다음 단계에서 연결됩니다.
        </p>
      </div>
    </div>
  );
}
