import Image from "next/image";
import { mockDoctors } from "@/lib/admin/mockData";
import type { AdminDoctor } from "@/lib/types/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  addDoctorImageAction,
  updateDoctorImageMetaAction,
} from "./actions";

async function getDoctors(): Promise<AdminDoctor[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("doctors")
      .select("id,name,title,specialty,education,career,image_url,order,visible")
      .order("order", { ascending: true });

    if (error) {
      return mockDoctors;
    }

    return data ?? [];
  } catch {
    return mockDoctors;
  }
}

export default async function AdminDoctorsPage() {
  const doctors = await getDoctors();
  const canAddMore = doctors.length < 4;

  return (
    <div>
      <div className="mb-6">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
            Content
          </p>
          <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
            의료진 관리
          </h1>
          <p className="mt-2 text-[13px] font-bold text-[#8a8073]">
            이름, 직함, 경력까지 포함된 완성 이미지 1장을 올리는 방식으로 최대 4명까지 관리합니다.
          </p>
        </div>
      </div>

      <form
        action={addDoctorImageAction}
        className="mb-5 rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_86px]">
          <div className="rounded-2xl border border-[#eee5da] bg-[#f8f4ed] px-4 py-3">
            <p className="text-[12px] font-black text-[#8a8073]">
              이미지 하나에 의료진 이름, 직함, 소개 내용을 모두 포함해서 업로드해주세요.
            </p>
            <p className="mt-1 text-[12px] text-[#a89e90]">
              홈페이지에는 이 이미지가 그대로 노출됩니다. 권장 용량은 25MB 이하입니다.
            </p>
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">순서</span>
            <input
              name="order"
              type="number"
              defaultValue={doctors.length + 1}
              disabled={!canAddMore}
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f] disabled:text-[#c0b8ad]"
            />
          </label>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex flex-1 flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">
              의료진 소개 이미지
            </span>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              disabled={!canAddMore}
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2 text-[13px] font-bold text-[#7b786f] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8ddd0] file:px-3 file:py-1.5 file:text-[12px] file:font-black file:text-[#5f5146] disabled:text-[#c0b8ad]"
            />
          </label>
          <button
            type="submit"
            disabled={!canAddMore}
            className="h-11 rounded-xl bg-[#5f5146] px-5 text-[13px] font-black text-white transition hover:bg-[#4d4138] disabled:cursor-not-allowed disabled:bg-[#d8cfc3]"
          >
            이미지 추가
          </button>
        </div>
        {!canAddMore ? (
          <p className="mt-3 text-[12px] font-bold text-[#b89060]">
            의료진 소개 이미지는 최대 4개까지 등록할 수 있습니다.
          </p>
        ) : null}
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {doctors.map((doctor) => (
          <form
            action={updateDoctorImageMetaAction}
            key={doctor.id}
            className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
          >
            <input type="hidden" name="id" value={doctor.id} />
            <div className="overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#f5f1eb]">
              {doctor.image_url ? (
                <Image
                  src={doctor.image_url}
                  alt={`${doctor.name} ${doctor.title}`}
                  width={720}
                  height={900}
                  unoptimized
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center text-[13px] font-bold text-[#a89e90]">
                  이미지 없음
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-black text-[#a89e90]">
                  노출 순서
                </span>
                <input
                  name="order"
                  type="number"
                  defaultValue={doctor.order}
                  className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                />
              </label>
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
                  <input
                    name="visible"
                    type="checkbox"
                    defaultChecked={doctor.visible}
                    className="h-4 w-4 accent-[#7b6047]"
                  />
                  홈페이지 노출
                </label>
                <button
                  type="submit"
                  className="rounded-xl border border-[#d8cfc3] px-4 py-2 text-[12px] font-black text-[#5f5146] transition hover:bg-[#f3eee5]"
                >
                  저장
                </button>
              </div>
            </div>
          </form>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          의료진 소개는 이미지 중심으로 관리됩니다. 이름/직함/경력은 이미지 안에 포함해서 제작해주세요.
        </p>
      </div>
    </div>
  );
}
