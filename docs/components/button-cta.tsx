import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    variant?: "primary" | "secondary" | "glass" | "gradient" | "orange-glass";
    size?: "sm" | "md" | "lg";
}

export default function ButtonCta({
    children = "Get Started",
    variant = "primary",
    size = "sm",
    className,
    ...props
}: ButtonProps) {
    const variants = {
        primary: `
            bg-black dark:bg-white
            text-white dark:text-black
            border-none
            hover:bg-zinc-800 dark:hover:bg-zinc-100
            active:scale-[0.94]
            shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_8px_rgba(255,255,255,0.1)]
            hover:shadow-[0_6px_12px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_6px_12px_rgba(255,255,255,0.2)]
            transition-all
        `,
        secondary: `
            bg-white dark:bg-black
            text-black dark:text-white
            border-[3px] border-black dark:border-white
            hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
            active:scale-[0.94]
            transition-all
            shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]
        `,
        glass: `
            bg-black/5
            backdrop-blur-xl
            border-2 border-black/20 dark:border-white/20
            text-black dark:text-white
            shadow-[0_0_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_10px_rgba(0,0,0,0.3)]
            before:absolute before:inset-0 before:bg-linear-to-br before:from-black/5 before:to-transparent dark:before:from-white/10
            before:rounded-md
            before:-z-10
            hover:bg-black/10 dark:hover:bg-white/15
            hover:before:from-black/10 dark:hover:before:from-white/20
            hover:shadow-[0_0_20px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]
            active:scale-[0.94]
            transition-all duration-300
        `,
        gradient: `
            bg-linear-to-r from-zinc-950 via-zinc-700 to-zinc-800 
            dark:from-white dark:via-zinc-100 dark:to-white/95
            text-white dark:text-zinc-900
            border-2 border-zinc-800/20 dark:border-white/20
            shadow-[0_10px_20px_-6px_rgba(24,24,27,0.4)] 
            dark:shadow-[0_10px_20px_-6px_rgba(255,255,255,0.4)]
            hover:shadow-[0_15px_30px_-6px_rgba(24,24,27,0.4)] 
            dark:hover:shadow-[0_15px_30px_-6px_rgba(255,255,255,0.4)]
            backdrop-blur-xs
            hover:from-black hover:via-zinc-800 hover:to-zinc-900 
            dark:hover:from-white dark:hover:via-white dark:hover:to-zinc-100
            active:scale-[0.96]
            transition-all duration-300 ease-out
        `,
        "orange-glass": `
            bg-linear-to-r from-orange-500/20 to-amber-500/20
            backdrop-blur-xl
            border-2 border-orange-500/30 dark:border-orange-400/30
            text-orange-900 dark:text-orange-100
            shadow-[0_0_15px_rgba(251,146,60,0.2)] dark:shadow-[0_0_15px_rgba(251,146,60,0.15)]
            before:absolute before:inset-0 
            before:bg-linear-to-br before:from-orange-400/10 before:to-transparent
            before:rounded-md before:-z-10
            hover:from-orange-500/30 hover:to-amber-500/30
            hover:border-orange-500/40 dark:hover:border-orange-400/40
            hover:shadow-[0_0_25px_rgba(251,146,60,0.3)] dark:hover:shadow-[0_0_25px_rgba(251,146,60,0.25)]
            active:scale-[0.94]
            transition-all duration-300
        `,
    };

    const sizes = {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-6 text-base",
        lg: "h-11 px-8 text-lg",
    };

    return (
        <button
            className={cn(`
                relative
                inline-flex items-center justify-center
                rounded-xl
                font-medium
                transition-all duration-300 ease-out
                ${variants[variant]}
                ${sizes[size]}
                disabled:opacity-50 
                disabled:cursor-not-allowed
                disabled:hover:shadow-none
                ${className}
            `)}
            {...props}
        >
            {children}
        </button>
    );
}
