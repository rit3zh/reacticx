import { cn } from "@/lib/utils";
import PreviewContent from "./preview-content";
import { Suspense } from "react";
import Loader from "../kokonutui/loader";

type PreviewProps = {
  children: React.ReactNode;
  className?: string;
  isPremium?: boolean;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
  isBlock?: boolean;
};

const PRE_PATH = "@kokonutui";

export function Preview({
  children,
  className = "",
  link,
  useIframe = false,
  compact = false,
  comment = [],
  isBlock = false,
}: PreviewProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <PreviewContent isBlock={isBlock} link={link} prePath={PRE_PATH} />

      {/* {comment.length > 0 && (
        <div className="mt-6 mb-4 flex flex-wrap gap-3">
          {comment.map((text) => (
            <div
              className="rounded-md border border-purple-200 bg-purple-100 px-4 py-2 font-medium text-purple-700 text-sm shadow-xs transition-colors hover:bg-purple-200/70 dark:border-purple-800/50 dark:bg-purple-950/30 dark:text-purple-300 dark:hover:bg-purple-950/50"
              key={text}
            >
              {text}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}
