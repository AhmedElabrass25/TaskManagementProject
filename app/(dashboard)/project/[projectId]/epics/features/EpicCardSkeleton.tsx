export default function EpicCardSkeleton() {
  return (
    <div className="flex gap-2 flex-wrap justify-between">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="w-full md:w-117 min-h-52.75 rounded-2xl p-6 bg-white border border-gray-100 flex flex-col justify-between shadow-sm animate-pulse">
          {/* 1. Header Skeleton (Epic ID & More Button) */}
          <div className="flex justify-between items-center">
            <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* 2. Title Skeleton */}
          <div className="space-y-3 mt-4">
            <div className="h-7 w-[90%] bg-gray-200 rounded-md"></div>
            <div className="h-7 w-[40%] bg-gray-100 rounded-md"></div>
          </div>

          {/* 3. Mid Section Skeleton (Assignee & Status) */}
          <div className="flex justify-between items-end mt-5">
            <div className="flex items-center gap-3">
              {/* Avatar Skeleton */}
              <div className="w-13 h-13 rounded-2xl bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-12 bg-gray-100 rounded"></div>
                <div className="h-5 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Status Badge Skeleton */}
            <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
          </div>

          {/* 4. Footer Skeleton */}
          <div className="mt-6">
            {/* Divider */}
            <div className="h-px bg-gray-100 mb-5"></div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                <div className="h-4 w-32 bg-gray-100 rounded"></div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded"></div>
                <div className="h-4 w-20 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
