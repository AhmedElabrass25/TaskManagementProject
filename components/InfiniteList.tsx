"use client";

import React from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

type Props<T> = {
  fetchFn: (page: number, limit: number) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
  limit?: number;
};

export default function InfiniteList<T>({
  fetchFn,
  renderItem,
  limit = 10,
}: Props<T>) {
  const { data, loaderRef, loading, hasMore } =
    useInfiniteScroll<T>({ fetchFn, limit });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <div key={i}>{renderItem(item)}</div>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {hasMore && <div ref={loaderRef} className="h-10" />}
    </div>
  );
}