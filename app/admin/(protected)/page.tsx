import Link from "next/link";
import { mockStats } from "@/lib/admin/mockData";
import type { DashboardStats } from "@/lib/types/admin";

type StatCardProps = {
  label: string;
  value: number;
  sub: string;
  href: string;
};

function StatCard({ label, value, sub, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6 transition hover:border-[#cfc3b5] hover:shadow-[0_4px_16px_rgba(43,42,40,0.06)]"
    >
      <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#a89e90]">
        {label}
      </p>
      <p className="mt-2 text-[2.2rem] font-black leading-none text-[#2b2a28]">
        {value}
      </p>
      <p className="mt-1.5 text-[13px] text-[#a89e90]">{sub}</p>
    </Link>
  );
}

const stats: DashboardStats = mockStats;

export default function AdminPage() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[12px] font-black uppercase tracking-[0.14em] text-[#a89e90]">
          Overview
        </p>
        <h1 className="mt-1 text-[1.6rem] font-black tracking-tight text-[#2b2a28]">
          대시보드
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          label="전체 공지"
          value={stats.notices_total}
          sub={`공개 ${stats.notices_published}건`}
          href="/admin/notices"
        />
        <StatCard
          label="비공개 공지"
          value={stats.notices_total - stats.notices_published}
          sub="초안 상태"
          href="/admin/notices"
        />
        <StatCard
          label="의료진"
          value={stats.doctors_total}
          sub={`노출 ${stats.doctors_visible}명`}
          href="/admin/doctors"
        />
        <StatCard
          label="숨김 의료진"
          value={stats.doctors_total - stats.doctors_visible}
          sub="비노출 상태"
          href="/admin/doctors"
        />
      </div>

      <div className="mt-10 rounded-2xl border border-[#e5ddd4] bg-[#fffcf7] p-6">
        <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#a89e90]">
          Quick Access
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/notices"
            className="rounded-xl border border-[#e5ddd4] px-4 py-2.5 text-[13px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
          >
            공지사항 관리
          </Link>
          <Link
            href="/admin/doctors"
            className="rounded-xl border border-[#e5ddd4] px-4 py-2.5 text-[13px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
          >
            의료진 관리
          </Link>
          <Link
            href="/admin/interior"
            className="rounded-xl border border-[#e5ddd4] px-4 py-2.5 text-[13px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
          >
            병원 둘러보기
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-xl border border-[#e5ddd4] px-4 py-2.5 text-[13px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
          >
            기본정보 설정
          </Link>
          <Link
            href="/"
            target="_blank"
            className="rounded-xl border border-[#e5ddd4] px-4 py-2.5 text-[13px] font-bold text-[#7b786f] transition hover:bg-[#f3eee5] hover:text-[#2b2a28]"
          >
            홈페이지 보기 ↗
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-[#f0e8d8] bg-[#fdf6ec] px-5 py-4">
        <p className="text-[12px] font-bold text-[#b89060]">
          Mock 데이터 모드 — Supabase 연결 전입니다. 데이터는 실제로 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}
