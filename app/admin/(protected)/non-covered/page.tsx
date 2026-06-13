import {
  fallbackNonCoveredItems,
  fallbackNonCoveredSettings,
  type NonCoveredItem,
  type NonCoveredSettings,
} from "@/lib/non-covered";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  addNonCoveredItemAction,
  deleteNonCoveredItemAction,
  saveNonCoveredSettingsAction,
  updateNonCoveredItemAction,
} from "./actions";

async function getAdminNonCoveredSettings(): Promise<NonCoveredSettings> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("non_covered_settings")
      .select("intro_text,note_text")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) {
      return fallbackNonCoveredSettings;
    }

    return {
      intro_text: data.intro_text || fallbackNonCoveredSettings.intro_text,
      note_text: data.note_text || fallbackNonCoveredSettings.note_text,
    };
  } catch {
    return fallbackNonCoveredSettings;
  }
}

async function getAdminNonCoveredItems(): Promise<NonCoveredItem[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("non_covered_items")
      .select("id,category,name,price,note,order,visible,created_at,updated_at")
      .order("order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      return fallbackNonCoveredItems;
    }

    return data ?? [];
  } catch {
    return fallbackNonCoveredItems;
  }
}

type AdminNonCoveredPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const statusMessage: Record<string, string> = {
  "settings-saved": "비급여 안내 문구가 저장되었습니다.",
  "settings-required": "상단 설명과 하단 안내문을 입력해주세요.",
  "settings-error": "비급여 안내 문구 저장에 실패했습니다.",
  "item-added": "비급여 항목이 추가되었습니다.",
  "item-saved": "비급여 항목 변경사항이 저장되었습니다.",
  "item-deleted": "비급여 항목이 삭제되었습니다.",
  "item-required": "대분류, 항목, 금액을 입력해주세요.",
  "item-error": "비급여 항목 저장에 실패했습니다.",
};

const errorStatuses = new Set([
  "settings-required",
  "settings-error",
  "item-required",
  "item-error",
]);

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] font-black text-[#a89e90]">{children}</span>
  );
}

export default async function AdminNonCoveredPage({
  searchParams,
}: AdminNonCoveredPageProps) {
  const [settings, items] = await Promise.all([
    getAdminNonCoveredSettings(),
    getAdminNonCoveredItems(),
  ]);
  const params = await searchParams;
  const message = params?.status ? statusMessage[params.status] : null;
  const isError = params?.status ? errorStatuses.has(params.status) : false;
  const nextOrder =
    items.length > 0 ? Math.max(...items.map((item) => item.order)) + 1 : 1;

  return (
    <div>
      <div className="mb-6">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
          Content
        </p>
        <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
          비급여안내 관리
        </h1>
        <p className="mt-2 text-[13px] font-bold text-[#8a8073]">
          상단 설명, 하단 안내문, 비급여 진료비용 표 항목을 관리합니다.
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

      <section className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5">
        <h2 className="text-[13px] font-black text-[#2b2a28]">
          안내 문구
        </h2>
        <form
          action={saveNonCoveredSettingsAction}
          className="mt-4 flex flex-col gap-3"
        >
          <label className="flex flex-col gap-1">
            <FieldLabel>상단 설명</FieldLabel>
            <textarea
              name="intro_text"
              required
              rows={3}
              defaultValue={settings.intro_text}
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2.5 text-[13px] font-bold leading-6 text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <FieldLabel>하단 안내문</FieldLabel>
            <textarea
              name="note_text"
              required
              rows={2}
              defaultValue={settings.note_text}
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2.5 text-[13px] font-bold leading-6 text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <button
            type="submit"
            className="self-start rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
          >
            안내 문구 저장
          </button>
        </form>
      </section>

      <form
        action={addNonCoveredItemAction}
        className="mt-5 rounded-2xl border border-dashed border-[#d8cfc3] bg-[#f8f4ed] p-5"
      >
        <p className="text-[13px] font-black text-[#2b2a28]">새 항목 추가</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.4fr_120px_1fr_80px]">
          <label className="flex flex-col gap-1">
            <FieldLabel>대분류</FieldLabel>
            <input
              name="category"
              required
              placeholder="제증명 수수료"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <FieldLabel>항목</FieldLabel>
            <input
              name="name"
              required
              placeholder="일반진단서"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <FieldLabel>금액</FieldLabel>
            <input
              name="price"
              required
              placeholder="20,000"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <FieldLabel>비고</FieldLabel>
            <input
              name="note"
              placeholder="장당"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <FieldLabel>순서</FieldLabel>
            <input
              name="order"
              type="number"
              defaultValue={nextOrder}
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
            <input
              name="visible"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-[#7b6047]"
            />
            공개
          </label>
          <button
            type="submit"
            className="rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
          >
            항목 추가
          </button>
        </div>
      </form>

      <section className="mt-5 rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 className="text-[13px] font-black text-[#2b2a28]">
            등록된 항목
          </h2>
          <p className="text-[12px] font-bold text-[#a89e90]">
            총 {items.length}개
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-[#eee5da] bg-[#f8f4ed] px-5 py-8 text-center">
            <p className="text-[13px] font-bold text-[#8a8073]">
              등록된 비급여 항목이 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <form
                action={updateNonCoveredItemAction}
                key={item.id}
                className="rounded-2xl border border-[#eee5da] bg-[#f8f4ed] p-3"
              >
                <input type="hidden" name="id" value={item.id} />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.35fr_112px_0.9fr_70px]">
                  <label className="flex flex-col gap-1">
                    <FieldLabel>대분류</FieldLabel>
                    <input
                      name="category"
                      required
                      defaultValue={item.category}
                      className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <FieldLabel>항목</FieldLabel>
                    <input
                      name="name"
                      required
                      defaultValue={item.name}
                      className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <FieldLabel>금액</FieldLabel>
                    <input
                      name="price"
                      required
                      defaultValue={item.price}
                      className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <FieldLabel>비고</FieldLabel>
                    <input
                      name="note"
                      defaultValue={item.note}
                      className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                    />
                  </label>
                  <label className="flex flex-col gap-1">
                    <FieldLabel>순서</FieldLabel>
                    <input
                      name="order"
                      type="number"
                      defaultValue={item.order}
                      className="h-10 rounded-xl border border-[#ded5ca] bg-[#fffcf7] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
                    />
                  </label>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
                    <input
                      name="visible"
                      type="checkbox"
                      defaultChecked={item.visible}
                      className="h-4 w-4 accent-[#7b6047]"
                    />
                    공개
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      className="rounded-xl border border-[#d8cfc3] px-4 py-2 text-[12px] font-black text-[#5f5146] transition hover:bg-[#f3eee5]"
                    >
                      저장
                    </button>
                    <button
                      formAction={deleteNonCoveredItemAction}
                      formNoValidate
                      className="rounded-xl border border-[#e5ddd4] px-4 py-2 text-[12px] font-black text-[#9b7b63] transition hover:bg-[#f3eee5]"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </form>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
