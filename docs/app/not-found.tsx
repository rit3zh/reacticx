import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="bg-linear-to-r from-zinc-800 to-zinc-600 bg-clip-text font-bold text-4xl text-transparent tracking-tight dark:from-zinc-100 dark:to-zinc-400">
          404 Not Found
        </h1>
        <div className="mt-2 h-[0.5px] w-full rounded-full bg-linear-to-r from-zinc-400 to-zinc-200 dark:from-zinc-600 dark:to-zinc-800" />
      </div>

      <p className="max-w-md text-center text-lg text-zinc-600 leading-relaxed dark:text-zinc-400">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        className={
          "group relative z-10 flex cursor-pointer items-center gap-2 rounded-full bg-linear-to-b from-zinc-800 via-zinc-900 to-zinc-800 px-4 py-2 text-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.12),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.15)] transition-all duration-300 hover:from-zinc-900 hover:via-zinc-800 hover:to-zinc-900 hover:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.15)] dark:from-gray-50 dark:via-white dark:to-gray-50 dark:text-zinc-900 dark:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),inset_0_1px_0.5px_0.5px_rgba(255,255,255,0.6)] dark:hover:from-white dark:hover:via-gray-50 dark:hover:to-white"
        }
        href="/"
      >
        <span className="font-medium text-sm">Back to Home</span>
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
