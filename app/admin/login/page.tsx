import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin/session";
import { loginAction } from "./actions";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (await hasAdminSession()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const hasError = params?.error === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-5 py-10 font-[family-name:var(--font-pretendard)]">
      <section className="w-full max-w-[420px] rounded-3xl border border-[#e5ddd4] bg-[#fffcf7] px-6 py-7 shadow-[0_18px_40px_rgba(43,42,40,0.06)] sm:px-8 sm:py-9">
        <p className="text-[12px] font-black tracking-[0.12em] text-[#a89e90]">
          ADMIN
        </p>
        <h1 className="mt-2 text-[1.55rem] font-black tracking-tight text-[#2b2a28]">
          관리자 로그인
        </h1>
        <p className="mt-3 text-[13px] leading-6 text-[#7b786f]">
          공지사항, 운영 정보, 병원 콘텐츠를 수정하기 위한 관리자 전용
          화면입니다.
        </p>

        <form action={loginAction} className="mt-7 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[12px] font-black text-[#7b786f]">
              관리자 비밀번호
            </span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 rounded-xl border border-[#ded5ca] bg-white px-4 text-[15px] font-bold text-[#2b2a28] outline-none transition focus:border-[#b7a38f] focus:ring-4 focus:ring-[#eadfd3]/70"
            />
          </label>

          {hasError ? (
            <p className="rounded-xl border border-[#f0d7c8] bg-[#fff3ed] px-4 py-3 text-[12px] font-bold text-[#b06a45]">
              비밀번호가 올바르지 않습니다.
            </p>
          ) : null}

          <button
            type="submit"
            className="h-12 rounded-xl bg-[#5f5146] text-[14px] font-black text-white transition hover:bg-[#4d4138] focus:outline-none focus:ring-4 focus:ring-[#cbbcae]"
          >
            로그인
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 inline-block text-[12px] font-bold text-[#a89e90] transition hover:text-[#5f5146]"
        >
          홈페이지로 돌아가기
        </Link>
      </section>
    </main>
  );
}
