"use client";

import { useEffect, useRef, useState } from "react";
import { getAllProjectsPaginated } from "../action";
import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";

export default function MobileInfiniteProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const limit = 5;

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const offset = (page - 1) * limit;

    const newData = await getAllProjectsPaginated({
      limit,
      offset,
    });

    if (!newData || newData.length < limit) {
      setHasMore(false);
    }

    setProjects((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);

    setLoading(false);
  };    

  useEffect(() => {
    loadMore(); // first load
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    const el = loaderRef.current;

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasMore, loading, page]);

  return (
    <div>
      <div className="grid-cols-1 gap-4 mb-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <div className="mt-3">
        <AddProjectCard />
      </div>

      <div ref={loaderRef} className="h-10" />

      {loading && (
        <p className="text-center text-sm text-gray-500">Loading more...</p>
      )}
    </div>
  );
}
