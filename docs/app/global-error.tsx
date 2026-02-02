"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log(error);
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 p-4">
        <div className="mx-auto max-w-md space-y-6 rounded-xl bg-white/10 p-8 text-center shadow-xl backdrop-blur-xs">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl text-white">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300">{error.message}</p>
          </div>
          <button
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-indigo-700"
            onClick={() => reset()}
            type="button"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
