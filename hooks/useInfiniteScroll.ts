"use client";

import { useEffect, useRef, useState } from "react";

type Props<T> = {
  fetchFn: (page: number, limit: number) => Promise<T[]>;
  limit?: number;
};

export function useInfiniteScroll<T>({
  fetchFn,
  limit = 10,
}: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newData = await fetchFn(page, limit);

    if (!newData || newData.length < limit) {
      setHasMore(false);
    }

    setData((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loaderRef.current, page, hasMore, loading]);

  return {
    data,
    loading,
    hasMore,
    loaderRef,
  };
}