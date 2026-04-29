"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { getAllEpicsPaginated } from "../action";
import EpicCard from "./EpicCard";
import { useParams } from "next/navigation";

export default function MobileInfiniteEpics() {
  const [epics, setEpics] = useState<any[]>([]);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const limit = 6;

  const loadMore = useCallback(async () => {
    if (!params.projectId || loading || !hasMore) return;
    
    setLoading(true);

    try {
      const offset = (page - 1) * limit;
      const newData = await getAllEpicsPaginated({
        limit,
        offset,
        projectId: params.projectId as string,
      });

      if (!newData || newData.length < limit) {
        setHasMore(false);
      }

      if (newData && newData.length > 0) {
        setEpics((prev) => {
          const merged = [...prev, ...newData];
          return merged.filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.id === item.id)
          );
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load epics:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, params.projectId]);
  useEffect(() => {
    setEpics([]);
    setPage(1);
    setHasMore(true);
  }, [params.projectId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loadMore, loading, hasMore]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-3 items-center">
        {epics.map((epic) => (
          <EpicCard key={epic.id} epic={epic} />
        ))}
      </div>

      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {loading && (
          <div className="flex gap-1">
             <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
             <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
             <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          </div>
        )}
        {!hasMore && epics.length > 0 && (
          <p className="text-xs text-gray-400 uppercase tracking-widest">No more epics</p>
        )}
      </div>
    </div>
  );
}