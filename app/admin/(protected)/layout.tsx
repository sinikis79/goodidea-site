import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { hasAdminSession } from "@/lib/admin/session";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await hasAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#f5f1eb] font-[family-name:var(--font-pretendard)]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[960px] px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
