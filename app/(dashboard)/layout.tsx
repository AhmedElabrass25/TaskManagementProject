import InitUser from "@/components/InitUser";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col h-screen">
            <InitUser />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}