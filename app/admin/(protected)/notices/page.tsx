import { mockNotices } from "@/lib/admin/mockData";
import type { AdminNotice } from "@/lib/types/admin";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  createImageNoticeAction,
  createTextNoticeAction,
  deleteNoticeAction,
  updateNoticeStatusAction,
} from "./actions";

const categoryLabel: Record<AdminNotice["category"], string> = {
  general: "일반",
  event: "이벤트",
  important: "중요",
};

const categoryStyle: Record<AdminNotice["category"], string> = {
  general: "bg-[#f0ebe2] text-[#7b786f]",
  event: "bg-[#e8f0e8] text-[#3d6b3d]",
  important: "bg-[#f5ede0] text-[#8a5a2a]",
};

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

async function getAdminNotices(): Promise<AdminNotice[]> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("notices")
      .select(
        "id,title,content,notice_type,image_url,image_alt,display_date,category,published,created_at,updated_at",
      )
      .order("display_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      return mockNotices;
    }

    return data ?? [];
  } catch {
    return mockNotices;
  }
}

export default async function AdminNoticesPage() {
  const notices = await getAdminNotices();

  return (
    <div>
      <div className="mb-6">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
            Content
          </p>
          <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
            공지사항 관리
          </h1>
          <p className="mt-2 text-[13px] font-bold text-[#8a8073]">
            글 공지와 이미지 공지를 등록하고, 공개 상태와 삭제를 자유롭게 관리합니다.
          </p>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <form
          action={createTextNoticeAction}
          className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
        >
          <p className="text-[13px] font-black text-[#2b2a28]">새 글 공지</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-black text-[#a89e90]">제목</span>
              <input
                name="title"
                required
                placeholder="예: 2026년 1월 진료안내"
                className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-black text-[#a89e90]">분류</span>
              <select
                name="category"
                defaultValue="general"
                className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              >
                <option value="general">일반</option>
                <option value="important">중요</option>
                <option value="event">이벤트</option>
              </select>
            </label>
          </div>
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">표시일</span>
            <input
              name="display_date"
              type="date"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">내용</span>
            <textarea
              name="content"
              required
              rows={4}
              placeholder="공지 내용을 입력해주세요."
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2.5 text-[13px] font-bold leading-6 text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
              <input
                name="published"
                type="checkbox"
                className="h-4 w-4 accent-[#7b6047]"
              />
              바로 공개
            </label>
            <button
              type="submit"
              className="rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
            >
              글 공지 저장
            </button>
          </div>
        </form>

        <form
          action={createImageNoticeAction}
          className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-5"
        >
          <p className="text-[13px] font-black text-[#2b2a28]">새 이미지 공지</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-black text-[#a89e90]">제목</span>
              <input
                name="title"
                required
                placeholder="예: 12월 휴진안내"
                className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-black text-[#a89e90]">분류</span>
              <select
                name="category"
                defaultValue="important"
                className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
              >
                <option value="general">일반</option>
                <option value="important">중요</option>
                <option value="event">이벤트</option>
              </select>
            </label>
          </div>
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">표시일</span>
            <input
              name="display_date"
              type="date"
              className="h-10 rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 text-[13px] font-bold text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <label className="mt-3 flex flex-col gap-1">
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
          <label className="mt-3 flex flex-col gap-1">
            <span className="text-[11px] font-black text-[#a89e90]">
              보조 설명
            </span>
            <textarea
              name="content"
              rows={3}
              placeholder="이미지 아래에 함께 표시할 설명이 있으면 입력해주세요."
              className="rounded-xl border border-[#ded5ca] bg-[#f8f4ed] px-3 py-2.5 text-[13px] font-bold leading-6 text-[#2b2a28] outline-none focus:border-[#b7a38f]"
            />
          </label>
          <div className="mt-4 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-[12px] font-bold text-[#7b786f]">
              <input
                name="published"
                type="checkbox"
                className="h-4 w-4 accent-[#7b6047]"
              />
              바로 공개
            </label>
            <button
              type="submit"
              className="rounded-xl bg-[#5f5146] px-5 py-2.5 text-[13px] font-black text-white transition hover:bg-[#4d4138]"
            >
              이미지 공지 저장
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e5ddd4] bg-[#f5f1eb]">
              <th className="px-5 py-3 text-left text-[11px] font-black uppercase tracking-[0.12em] text-[#a89e90]">
                제목
              </th>
              <th className="hidden px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.12em] text-[#a89e90] sm:table-cell">
                분류
              </th>
              <th className="hidden px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.12em] text-[#a89e90] sm:table-cell">
                작성일
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-black uppercase tracking-[0.12em] text-[#a89e90]">
                상태
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-black uppercase tracking-[0.12em] text-[#a89e90]">
                작업
              </th>
            </tr>
          </thead>
          <tbody>
            {notices.length ? notices.map((notice, idx) => (
              <tr
                key={notice.id}
                className={`border-b border-[#f0ebe2] transition last:border-0 ${
                  idx % 2 === 0 ? "" : "bg-[#fdf9f4]"
                }`}
              >
                <td className="px-5 py-3.5">
                  <p className="font-bold text-[#2b2a28] leading-snug">
                    {notice.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#a89e90] line-clamp-1 sm:hidden">
                    {categoryLabel[notice.category]} · {notice.display_date ?? formatDate(notice.created_at)}
                  </p>
                </td>
                <td className="hidden px-4 py-3.5 sm:table-cell">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${categoryStyle[notice.category]}`}
                  >
                    {categoryLabel[notice.category]}
                  </span>
                </td>
                <td className="hidden px-4 py-3.5 text-[13px] text-[#a89e90] sm:table-cell">
                  {notice.display_date ?? formatDate(notice.created_at)}
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      notice.published
                        ? "bg-[#e8f0e8] text-[#3d6b3d]"
                        : "bg-[#f0ebe2] text-[#a89e90]"
                    }`}
                  >
                    {notice.published ? "공개" : "초안"}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex justify-end gap-2">
                    <form action={updateNoticeStatusAction} className="flex gap-2">
                      <input type="hidden" name="id" value={notice.id} />
                      <input
                        type="hidden"
                        name="category"
                        value={notice.category}
                      />
                      <input
                        type="hidden"
                        name="display_date"
                        value={notice.display_date ?? ""}
                      />
                      <label className="flex items-center gap-1 rounded-lg border border-[#e5ddd4] px-2.5 py-1.5 text-[12px] font-bold text-[#7b786f]">
                        <input
                          name="published"
                          type="checkbox"
                          defaultChecked={notice.published}
                          className="h-3.5 w-3.5 accent-[#7b6047]"
                        />
                        공개
                      </label>
                      <button
                        type="submit"
                        className="rounded-lg border border-[#e5ddd4] px-3 py-1.5 text-[12px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5]"
                      >
                        저장
                      </button>
                    </form>
                    <form action={deleteNoticeAction}>
                      <input type="hidden" name="id" value={notice.id} />
                      <button
                        type="submit"
                        className="rounded-lg border border-[#e5ddd4] px-3 py-1.5 text-[12px] font-bold text-[#9b7b63] transition hover:bg-[#f3eee5]"
                      >
                      삭제
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-10 text-center text-[13px] font-bold text-[#a89e90]"
                >
                  등록된 공지사항이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          공지는 자유롭게 삭제할 수 있습니다. 이미지 공지는 notice-images Storage에 저장됩니다.
        </p>
      </div>
    </div>
  );
}
