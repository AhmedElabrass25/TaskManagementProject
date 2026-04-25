"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { getAllProjectsPaginated } from "../action";
import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";

export default function MobileInfiniteProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const limit = 5;

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const offset = (page - 1) * limit;
      const newData = await getAllProjectsPaginated({ limit, offset });

      if (!newData || newData.length < limit) {
        setHasMore(false);
      }

      if (newData && newData.length > 0) {
        setProjects((prev) => {
          const merged = [...prev, ...newData];
          return merged.filter(
            (item, index, self) =>
              index === self.findIndex((p) => p.id === item.id)
          );
        });
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
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
    <div className="flex flex-col w-full py-2">
      <div className="flex flex-col gap-4 mb-4">
        {projects?.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>

      <div ref={loaderRef} className="h-10 flex items-center justify-center">
        {loading && (
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          </div>
        )}
      </div>

      <div className="mt-6 mb-10">
        <AddProjectCard />
      </div>
    </div>
  );
}