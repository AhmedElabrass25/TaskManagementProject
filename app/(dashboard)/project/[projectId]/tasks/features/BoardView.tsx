import TaskColumn from "./TaskColumn";
import TaskDetailsModal from "./TaskModal.tsx/TaskDetailsModal";
const ALL_STATUSES = [
  "TO_DO", 
  "IN_PROGRESS", 
  "BLOCKED", 
  "IN_REVIEW", 
  "READY_FOR_QA", 
  "REOPENED", 
  "READY_FOR_PRODUCTION", 
  "DONE"
];

export default function BoardView({ projectId }: { projectId: string }) {
  return (
    <>
    <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar min-h-[calc(100vh-200px)]">
      {ALL_STATUSES.map((status) => (
        <TaskColumn key={status} status={status} projectId={projectId} />
      ))}
    </div>
      <TaskDetailsModal />
</>
  );
}