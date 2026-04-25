import { getAllEpics, getAllEpicsPaginated } from "./action";
import Header from "./features/Header";
import { IEpicData } from "@/types/types";
import EpicCard from "./features/EpicCard";
import EmptyEpic from "./features/EmptyEpic";
import Pagination from "@/components/Pagination";
type Props = {
  params: Promise<{ projectId: string }>;
  searchParams:Promise<{ page?: string }>;

};
;
const Epics = async ({ params, searchParams }: Props) => {
    const searchParamsValues = await searchParams;
  const { projectId } = await params;
  const allEpics = await getAllEpics(projectId);
  console.log(allEpics.length);
  const page = Number(searchParamsValues.page) || 1;
    const limit = 6;
    const offset = (page - 1) * limit;
    const total = allEpics.length;
    const PagiantedEpics = await getAllEpicsPaginated({ limit, offset, projectId });
  return (
      <section className="mt-10 ">
     {allEpics.length > 0 && <Header />}
      <div className="w-full rounded-sm">
        <div className="flex gap-6 flex-wrap justify-between">
          {PagiantedEpics.length > 0 ?PagiantedEpics.map((epic) => (
            <EpicCard key={epic.id} epic={epic} />
          )) : <EmptyEpic />}
        </div>
           {/* Pagination in large screens  */}
      <div className="flex items-center justify-between mt-20">
        <p>
        Showing {PagiantedEpics.length} of {total} active epics
        </p>
        <Pagination total={total} page={page} limit={limit} />
      </div>
      </div>
    </section>
  );
};

export default Epics;
