"use client";

import * as React from "react";
import { RefreshCw } from "lucide-react";

interface RefreshButtonProps {
    onRefresh: () => void;
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
    return (
        <button
            type="button"
            onClick={onRefresh}
            className="group absolute top-17 right-2 p-2 rounded-md text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors z-10 flex items-center gap-2 bg-black dark:bg-white h-7 px-3"
            aria-label="Refresh preview"
        >
            <RefreshCw
                className="transition-transform group-hover:rotate-180 duration-300"
                size={16}
            />
            <span className="text-sm font-medium">Refresh</span>
        </button>
    );
}
