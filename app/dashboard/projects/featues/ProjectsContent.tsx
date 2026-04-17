// components/ProjectsContent.tsx
import { getAllProjects } from "../action";
import AddProjectCard from "./AddProjectCard";
import EmptyState from "./EmptyState";
import ProjectCard from "./ProjectCard";

export default async function ProjectsContent() {
  const projects = await getAllProjects();


  if (!projects ||projects.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <AddProjectCard />
    </div>
  );
}