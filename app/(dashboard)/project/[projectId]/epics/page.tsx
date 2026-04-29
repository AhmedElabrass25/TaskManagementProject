import Header from "./features/Header";
import MobileInfiniteEpics from "./features/MobileInfiniteEpics";
import { Suspense } from "react";
import EpicCardSkeleton from "./features/EpicCardSkeleton";
import AllEpics from "./features/AllEpics";
type Props = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ page?: string }>;
};
const Epics = async ({ params, searchParams }: Props) => {
  const searchParamsValues = await searchParams;
  const { projectId } = await params;
  
  return (
    <section className="mt-10 ">
      <Header />
      <Suspense fallback={<EpicCardSkeleton />}>
      <AllEpics projectId={projectId} searchParamsValues={searchParamsValues} />
      </Suspense>
      {/* Infinite Scroll in small screens */}
      <div className="md:hidden">
        <MobileInfiniteEpics />
      </div>
    </section>
  );
};

export default Epics;
