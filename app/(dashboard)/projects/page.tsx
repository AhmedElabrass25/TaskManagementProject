export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ProjectsSkeleton from "./featues/ProjectSkeleton";
import ProjectHeader from "./featues/ProjectHeader";
import ProjectsContent from "./featues/ProjectsContent";
import Pagination from "@/components/Pagination";
import { getAllProjects, getAllProjectsPaginated } from "./action";
import MobileInfiniteProjects from "./featues/MobileInfiniteProjects";
type Props = {
  searchParams: Promise<{ page?: string }>;
};
export default async function Projects({ searchParams }: Props) {
  const searchParamsValues = await searchParams;
  const allprojects = await getAllProjects();
  const page = Number(searchParamsValues.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const total = allprojects.length;
  const PagiantedProjects = await getAllProjectsPaginated({ limit, offset });

  return (
    <div className="space-y-6">
      {/* Header */}
      <ProjectHeader />
      <div className="hidden md:block">
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsContent projects={PagiantedProjects} />
        </Suspense>
        {/* Pagination in large screens  */}
        <div className="flex items-center justify-between mt-20">
          <p>
            Showing {PagiantedProjects.length} of {total} active projects
          </p>
          <Pagination total={total} page={page} limit={limit} />
        </div>
      </div>
      {/* Infinite Scroll in small screens */}
      <div className="md:hidden">
        <MobileInfiniteProjects />
      </div>
    </div>
  );
}
