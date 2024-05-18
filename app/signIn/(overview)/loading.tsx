export default function Loading() {
  return (
    <div className="mx-auto grid h-screen max-w-6xl items-center gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="flex items-center justify-center">
        <div
          className="aspect-[3/3] w-full animate-pulse overflow-hidden rounded-lg bg-gray-300 dark:bg-gray-700"
          style={{ height: "600px", width: "400px" }}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-6 dark:bg-gray-700">
          <div className="mb-4 h-10 w-3/4 animate-pulse bg-gray-400 dark:bg-gray-600" />
          <div className="mb-6 h-6 w-1/2 animate-pulse bg-gray-400 dark:bg-gray-600" />
          <div className="space-y-2">
            <div className="h-10 w-full animate-pulse bg-gray-400 dark:bg-gray-600" />
            <div className="h-10 w-full animate-pulse bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
