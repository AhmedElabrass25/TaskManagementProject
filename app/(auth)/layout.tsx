import Navbar from "@/components/Navbar";
export default function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="h-screen">
            <Navbar />
                <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-10">
                    {children}
                </main>
            </div>
  );
}