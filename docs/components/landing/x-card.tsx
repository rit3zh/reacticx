import { VerifiedIcon } from "lucide-react";
import Image from "next/image";
import XIcon from "../icons/x-icon";

export type XCardProps = {
  avatar: string;
  content: React.ReactNode;
  date?: string;
  isVerified?: boolean;
  name: string;
  username: string;
};

export default function XCard({
  name,
  username,
  avatar,
  content,
  date,
  isVerified = true,
}: XCardProps) {
  return (
    <div className="rounded-3xl bg-black/5 p-1.5 dark:bg-white/5">
      <div className="relative rounded-xl bg-black/5 p-5 dark:bg-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                alt={name}
                className="h-full w-full object-cover"
                height={40}
                src={avatar}
                width={40}
              />
            </div>
            <span className="font-semibold text-black dark:text-white/90">
              {name}
            </span>
            {isVerified ? (
              <VerifiedIcon className="h-4 w-4 text-blue-400" />
            ) : null}
            <span className="text-black/60 text-sm dark:text-white/60">
              @{username}
            </span>
          </div>
          <button
            aria-label="View on X"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1 text-black hover:bg-black/5 hover:text-black dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
            type="button"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3">
          {content}
          {date ? (
            <span className="mt-2 block text-black/50 text-sm dark:text-white/50">
              {date}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
