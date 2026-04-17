export default function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="bg-white p-5 rounded-xs animate-pulse">
      <div className="h-28 bg-gray-200 rounded w-full  mb-3"></div>
      <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-5 bg-gray-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}