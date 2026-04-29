"use client"; 

import Image from "next/image";
import { useEffect } from "react";

export default function ErrorState({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 h-full min-h-[400px] items-center justify-center p-6 bg-slate-50">
      
<div className="p-4 rounded-md bg-(--color-error-low) mb-6">
      <Image src="/icons/error.svg" alt="Error" width={25} height={25} className="" />

</div>
      <div className="text-center max-w-md">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Something went wrong!
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          We encountered an unexpected error while retrieving your projects. 
          Please try again or contact support if the problem persists.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-(--color-primary) text-white rounded-xs font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10 active:scale-95"
        >
          Retry Connection
        </button>
        
        
      </div>

    
    </div>
  );
}