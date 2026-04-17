import { Project } from "../action";

export default function ProjectCard({ project }: { project: Project }) {
  // format the date without any library
  const date = new Date(project.created_at);

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const formattedDate = `${date.getDate()} ${
  months[date.getMonth()]
} ${date.getFullYear()}`;
  return (
    <div className="bg-white p-5 rounded-xs shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-gray-800">{project.name}</h3>

        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {project.description || "No description"}
        </p>
      </div>

      <div className="mt-6 text-xs text-slate-600 font-semibold flex justify-between">
        <span>CREATED AT</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
