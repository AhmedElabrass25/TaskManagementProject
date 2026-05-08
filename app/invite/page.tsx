import { redirect } from "next/navigation";
import AcceptButton from "./features/AcceptButton";
import { cookies } from "next/headers";
type Props = {
  searchParams: Promise<{ token?: string }>;
};
const page = async ({ searchParams }: Props) => {
  const { token } = await searchParams;
  console.log(token);
  // get access_token from cookie to check if user is logged in
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  if (!access_token) {
    redirect(`/login?redirect=${encodeURIComponent(`/invite?token=${token}`)}`);
  }
  return (
    <>
      <section className="w-full h-screen flex items-center justify-center">
        <div className="relative flex flex-col items-center rounded-xs overflow-hidden">
          <div className="flex items-center gap-2 mb-10 mt-12">
            <img
              src="/Logo.svg"
              alt="Taskly Logo"
              width={150}
              height={150}
              className="text-blue-600"
            />
          </div>
          <div className="w-xl h-71.25 bg-white flex flex-col items-center rounded-lg p-10 border-t-2 border-(--color-primary)">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-6 rounded-full bg-slate-100 border border-slate-200">
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                NEW PROJECT INVITATION
              </span>
            </div>

            <h1 className="text-[30px] text-slate-900 leading-[1.3] text-center mb-4 tracking-tight">
              You&apos;ve been invited to join new project
            </h1>

            <AcceptButton token={token} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
