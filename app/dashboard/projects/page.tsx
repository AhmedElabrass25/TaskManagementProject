export const dynamic = "force-dynamic";
import { Suspense } from "react";

import ProjectsSkeleton from "./featues/ProjectSkeleton";
import ProjectHeader from "./featues/ProjectHeader";
import ProjectsContent from "./featues/ProjectsContent";

export default function Projects() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <ProjectHeader />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}