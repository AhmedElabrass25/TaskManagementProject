export function TableSkeleton() {
  return (
    <tr className="animate-pulse border-b border-gray-50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
          <div className="space-y-2">
            {/* Name Skeleton */}
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            {/* Email Skeleton */}
            <div className="h-3 w-32 bg-gray-100 rounded"></div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {/* Role Badge Skeleton */}
        <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
      </td>
      <td className="px-6 py-4">
        {/* Date Skeleton */}
        <div className="h-4 w-20 bg-gray-100 rounded"></div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-5 w-5 bg-gray-200 rounded ml-auto"></div>
      </td>
    </tr>
  );
}
export function MobileCardSkeleton() {
  return (
    <div className="animate-pulse bg-white rounded-lg p-4 flex items-center justify-between shadow-sm border border-gray-50">
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
        <div className="space-y-2">
          {/* Name & Email Skeleton */}
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-3 w-36 bg-gray-100 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3">
        {/* Role Badge Skeleton */}
        <div className="h-4 w-12 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-100 rounded"></div>
      </div>
    </div>
  );
}