import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScreenOutlineIcon } from "../icons/screen-outline";
import { CheckoutIcon } from "../icons/checkout";

interface PreviewTemplateProps {
    previewLink: string;
    buyLink: string;
    videoUrl: string;
    className?: string;
}

export default function PreviewTemplate({
    previewLink,
    buyLink = "https://kokonutui.pro/",
    videoUrl,
    className,
}: PreviewTemplateProps) {
    return (
        <div className={cn("flex flex-col space-y-1", className)}>
            <div className="flex items-center gap-4">
                <Link
                    href={previewLink}
                    target="_blank"
                    className="hidden group relative md:inline-flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg bg-zinc-900 dark:bg-zinc-100 transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-300 not-prose text-white dark:text-zinc-900 border"
                >
                    Live Preview
                    <ScreenOutlineIcon className="w-4 h-4" />
                </Link>
                <Link
                    href={buyLink}
                    target="_blank"
                    className="hidden group relative md:inline-flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg border border-orange-500 dark:border-orange-400 text-orange-500 dark:text-orange-400 transition-colors hover:bg-orange-100 dark:hover:bg-orange-950 not-prose"
                >
                    Buy Now
                    <CheckoutIcon className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex flex-col mt-0 ">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full max-w-4xl rounded-lg shadow-sm border border-zinc-400 dark:border-zinc-800 p-0.5"
                    aria-label="Preview Video"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
