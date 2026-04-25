"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-gray-200">

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>

        <p className="text-gray-500 text-xl capitalize mb-6">
          {error.message || "An unexpected error occurred."}
        </p>

        <button
          onClick={() => reset()}
          className="bg-black text-white px-5 py-3 rounded-xs hover:bg-gray-800 transition cursor-pointer"
        >
           Try Again
        </button>
      </div>
    </div>
  );
}