import { mockNotices } from "@/lib/admin/mockData";
import type { AdminNotice } from "@/lib/types/admin";

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

export default function AdminNoticesPage() {
  const notices = mockNotices;

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
            Content
          </p>
          <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
            공지사항 관리
          </h1>
        </div>
        <button
          type="button"
          disabled
          title="Supabase 연결 후 활성화"
          className="cursor-not-allowed rounded-xl border border-[#e5ddd4] bg-[#f5f1eb] px-4 py-2.5 text-[13px] font-bold text-[#c0b8ad]"
        >
          + 새 공지
        </button>
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
            {notices.map((notice, idx) => (
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
                    {categoryLabel[notice.category]} · {formatDate(notice.created_at)}
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
                  {formatDate(notice.created_at)}
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
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-3.5">
        <p className="text-[12px] font-bold text-[#b89060]">
          Mock 데이터 — 수정·삭제 버튼은 Supabase 연결 후 활성화됩니다.
        </p>
      </div>
    </div>
  );
}
