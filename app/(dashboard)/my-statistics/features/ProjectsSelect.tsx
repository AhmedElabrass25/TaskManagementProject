"use client";

import { Project } from "@/types/types";
import Select from "react-select";
import { getAllProjects } from "../../projects/action";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilters } from "@/store/slices/calenderSlice";

interface ProjectOption {
  value: string | null;
  label: string;
}

const ProjectsSelect = () => {
  const dispatch = useDispatch();
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  const currentProjectId = useSelector(
    (state: RootState) => state.calendar.filters.projectId,
  );

  const projectOptions: ProjectOption[] = [
    { value: null, label: "All Projects" },
    ...allProjects.map((project) => ({
      value: project.id,
      label: project.name,
    })),
  ];

  useEffect(() => {
    async function fetchProjects() {
      const projects: Project[] = await getAllProjects();
      setAllProjects(projects);
    }
    fetchProjects();
  }, []);

  const selectedValue =
    projectOptions.find((option) => option.value === currentProjectId) ||
    projectOptions[0];

  return (
    <div className="w-52">
      <Select<ProjectOption>
        instanceId="projects-select-field"
        className="w-full"
        options={projectOptions}
        value={selectedValue}
        onChange={(selectedOption) => {
          dispatch(
            setFilters({
              projectId: selectedOption ? selectedOption.value : null,
            }),
          );
        }}
      />
    </div>
  );
};

export default ProjectsSelect;
