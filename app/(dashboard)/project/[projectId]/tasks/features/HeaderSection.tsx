import Image from "next/image";
import ViewSwitcher from "./ViewSwitcher";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
type Props = {
  projectId: string;
  view?: string;
};
const HeaderSection = async ({ projectId, view }: Props) => {
  return (
    <>
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1>Active Workboard</h1>
          <p className="hidden md:block">
            Curating Project Alpha's production pipeline and milestones.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="w-full relative">
            <Image
              src="/icons/searchIcon.svg"
              alt="Search Icon"
              width={16}
              height={16}
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <Input
              type="text"
              placeholder="Search tasks..."
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xs text-sm"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <ViewSwitcher currentView={view} projectId={projectId} />
              </div>
              <button className="hidden md:block p-2 bg-white border border-slate-200 rounded-xs text-slate-600 hover:bg-slate-50">
                <Image
                  src="/icons/listicon.svg"
                  alt="Filter Icon"
                  width={16}
                  height={16}
                  className=""
                />
              </button>
            </div>
            <Button className="md:hidden w-full"> + Create Task</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderSection;
