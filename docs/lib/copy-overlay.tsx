import { Check } from "lucide-react";
import { motion } from "motion/react";

interface CopyOverlayProps {
    show: boolean;
}

export function CopyOverlay({ show }: CopyOverlayProps) {
    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center rounded-xl z-50 overflow-hidden px-4 sm:px-0"
        >
            <div
                className="absolute inset-0 
                bg-linear-to-b from-white/90 via-gray-50/90 to-white/90
                dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
                className="relative flex flex-col items-center gap-1.5 sm:gap-2"
            >
                <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 dark:bg-white/15 
                    flex items-center justify-center border border-green-200 dark:border-white/25"
                >
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-white/90" />
                </div>
                <span
                    className="text-sm sm:text-base text-zinc-600 
                    dark:text-white/90 font-semibold"
                >
                    Copied to clipboard
                </span>
            </motion.div>
        </motion.div>
    );
}
