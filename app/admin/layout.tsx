import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "관리자 — 판교다시봄",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#f5f1eb] font-[family-name:var(--font-pretendard)]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[960px] px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
