"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Error from "next/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
