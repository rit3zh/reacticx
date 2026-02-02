import * as React from "react";

type PreviewCommentProps = {
  comments: string[];
};

export function PreviewComment({ comments }: PreviewCommentProps) {
  return (
    <>
      {comments.length > 0 && (
        <div className="mt-6 mb-4 flex flex-wrap gap-3 ml-2">
          {comments.map((text) => (
            <div
              className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 font-medium text-black text-sm shadow-xs transition-colors hover:bg-gray-200/70 dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:hover:bg-gray-800/70"
              key={text}
            >
              {text}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
