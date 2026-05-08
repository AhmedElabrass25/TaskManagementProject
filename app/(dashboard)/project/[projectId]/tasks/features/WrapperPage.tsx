"use client";
import HeaderSection from "./HeaderSection";
import BoardView from "./BoardView";
import ListView from "./ListView";
import { useState, useEffect } from "react";
type Props = {
  projectId: string;
  view?: string;
  page?: string;
};
function WrapperPage({ projectId, view, page }: Props) {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <>
      <HeaderSection
        projectId={projectId}
        view={view}
        search={search}
        setSearch={setSearch}
      />
      {view === "board" ? (
        <BoardView projectId={projectId} search={debouncedSearch} />
      ) : (
        <ListView projectId={projectId} page={page} search={debouncedSearch} />
      )}
    </>
  );
}

export default WrapperPage;
