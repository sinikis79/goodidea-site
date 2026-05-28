import Image from "next/image";
import { mockInteriorImages } from "@/lib/admin/mockData";
import type { AdminInteriorImage } from "@/lib/types/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  addInteriorImageAction,
  deleteInteriorImageAction,
  updateInteriorImageAction,
} from "./actions";

async function getInteriorImages(): Promise<AdminInteriorImage[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("interior_images")
      .select("id,title,image_url,image_alt,order,visible,created_at,updated_at")
      .order("order", { ascending: true });

    if (error) {
      return mockInteriorImages;
    }

    return data ?? [];
  } catch {
    return mockInteriorImages;
  }
}

type AdminInteriorPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const statusMessage: Record<string, string> = {
  added: "사진이 추가되었습니다.",
  saved: "변경사항이 저장되었습니다.",
  deleted: "사진이 삭제되었습니다.",
  "image-required": "업로드할 사진을 선택해주세요.",
  "upload-error":
    "사진 업로드에 실패했습니다. Vercel 환경변수와 Supabase Storage 설정을 확인해주세요.",
  "save-error": "사진 정보 저장에 실패했습니다.",
  "delete-error": "사진 삭제에 실패했습니다.",
};

const errorStatuses = new Set([
  "image-required",
  "upload-error",
  "save-error",
  "delete-error",
]);

export default async function AdminInteriorPage({
  searchParams,
}: AdminInteriorPageProps) {
  const images = await getInteriorImages();
  const params = await searchParams;
  const message = params?.status ? statusMessage[params.status] : null;
  const isError = params?.status ? errorStatuses.has(params.status) : false;

  return (
    <div>
      <div className="mb-6">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
          Content
        </p>
        <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
          병원 둘러보기 관리
        </h1>
        <p className="mt-2 text-[13px] font-bold text-[#8a8073]">
          병원 공간 사진을 업로드하면 홈 화면 병원 둘러보기 슬라이더에 반영됩니다.
        </p>
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

      <form
        action={addInteriorImageAction}
        className="mb-5 rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
      >
        <p className="text-[13px] font-black text-[#2b2a28]">새 공간 사진</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_86px] sm:items-end">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">
              이미지 파일
            </span>
            <input
              name="image"
              type="file"
              accept="image/*"
              required
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2 text-[13px] font-bold text-[#7b786f] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8ddd0] file:px-3 file:py-1.5 file:text-[12px] file:font-black file:text-[#5f5146]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">순서</span>
            <input
              name="order"
              type="number"
              defaultValue={images.length + 1}
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="h-11 rounded-xl bg-[#5f5146] px-5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
          >
            사진 추가
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image) => (
          <form
            action={updateInteriorImageAction}
            key={image.id}
            className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
          >
            <input type="hidden" name="id" value={image.id} />
            <div className="relative overflow-hidden rounded-2xl border border-[#e5ddd4] bg-[#f5f1eb]">
              <Image
                src={image.image_url}
                alt={image.image_alt || image.title || "병원 둘러보기 이미지"}
                width={1200}
                height={760}
                unoptimized
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="grid grid-cols-[88px_1fr] gap-2">
                <input
                  name="order"
                  type="number"
                  defaultValue={image.order}
                  className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
                    <input
                      name="visible"
                      type="checkbox"
                      defaultChecked={image.visible}
                      className="h-4 w-4 accent-[#7b6047]"
                    />
                    홈 노출
                  </label>
                  <button
                    type="submit"
                    className="rounded-xl border border-[#d8cfc3] px-4 py-2 text-[12px] font-black text-[#5f5146] transition hover:bg-[#f3eee5]"
                  >
                    저장
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                formAction={deleteInteriorImageAction}
                className="rounded-xl border border-[#e5ddd4] px-4 py-2 text-[12px] font-black text-[#9b7b63] transition hover:bg-[#f3eee5]"
              >
                삭제
              </button>
            </div>
          </form>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          공개된 사진은 순서대로 홈 화면 병원 둘러보기 슬라이더에 표시됩니다.
        </p>
      </div>
    </div>
  );
}
