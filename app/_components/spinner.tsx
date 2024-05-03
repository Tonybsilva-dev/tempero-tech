export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div
        className="flex h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-yellow-600 dark:text-white"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
