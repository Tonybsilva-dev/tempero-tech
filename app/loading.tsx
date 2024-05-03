"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const estimatedLoadingTime = 3000;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const percentage = Math.min(
        (elapsedTime / estimatedLoadingTime) * 100,
        100,
      );
      setProgress(percentage);
      if (percentage >= 100) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [estimatedLoadingTime]);

  return (
    <div className="flex h-screen w-screen items-center justify-center self-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-14 w-14">
            <svg
              className="h-full w-full animate-spin text-orange-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              {Number(progress).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
