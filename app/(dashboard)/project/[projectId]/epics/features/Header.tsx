"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Header({ search }: { search: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(search);

  // apply the debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1>Project Epics</h1>

        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="w-75 relative">
            <Image
              src="/icons/searchIcon.svg"
              width={12}
              height={12}
              alt="search"
              className="absolute top-5 left-2"
            />
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pl-8"
              placeholder="Search epics..."
            />
          </div>

          <Link href="epics/new">
            <Button>+ New Epic</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}