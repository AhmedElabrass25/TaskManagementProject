import EpicCard from "./EpicCard";
import EmptyEpic from "./EmptyEpic";
import { IEpicData } from "@/types/types";
import Pagination from "@/components/Pagination";
import { getAllEpics, getAllEpicsPaginated } from "../action";
import { string } from "zod";

const AllEpics = async ({
  projectId,
  searchParamsValues,
}: {
  projectId: string;
  searchParamsValues: { page?: string | undefined; search?:string|undefined };
}) => {
  const allEpics = await getAllEpics(projectId);
  const page = Number(searchParamsValues?.page) || 1;
    const search = searchParamsValues?.search || "";

  const limit = 6;
  const offset = (page - 1) * limit;
  const total = allEpics.length;

  const PagiantedEpics:IEpicData[] = await getAllEpicsPaginated({
    limit,
    offset,
    projectId,
    search
  });
  const totaPaginate = PagiantedEpics.length;

  return (
    <>
      <div className="hidden md:block">
        <div className="w-full rounded-sm">
          <div className="flex gap-2 flex-wrap justify-between">
            {PagiantedEpics.length > 0 ? (
              PagiantedEpics.map((epic) => (
                <EpicCard key={epic.id} epic={epic} />
              ))
            ) : (
              <EmptyEpic />
            )}
          </div>
          {/* Pagination in large screens  */}
          <div className="flex items-center justify-between mt-20">
            <p>
              Showing {PagiantedEpics.length} of {total} active epics
            </p>
            <Pagination total={total} page={page} limit={limit}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllEpics;
