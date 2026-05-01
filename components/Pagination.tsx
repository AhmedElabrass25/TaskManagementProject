"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
type Props = {
  total: number;
  page: number;
  limit: number;
  search:string
};
const Pagination = ({ total, page, limit,search }: Props) => {

      const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / limit);

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    if (search) {
  params.set("search", search);
}
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
          <button
              disabled={page <= 1}
        onClick={() => goToPage(page - 1)}
              className={`h-8 w-8 flex items-center justify-center bg-[#c3c6d600] border border-[#c3c6d641] rounded-xs ${page <= 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>
        <Image
          src="/icons/leftarowpagination.svg"
          alt="arrowleft"
          width={5}
          height={7}
        />
      </button>
         {Array.from({ length: totalPages }).map((_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={`h-8 w-8 text-xs flex items-center justify-center border rounded-xs cursor-pointer ${
              pageNumber === page
                ? "bg-(--color-primary) text-white"
                : "bg-transparent"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
      <button
        disabled={page >= totalPages}
        onClick={() => goToPage(page + 1)}
        className={`h-8 w-8 flex items-center justify-center  bg-[#c3c6d600] border border-[#c3c6d641] rounded-xs ${page >= totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <Image
          src="/icons/rightarrowpagination.svg"
          alt="arrowleft"
          width={5}
          height={7}
        />
      </button>
    </div>
  );
};

export default Pagination;
