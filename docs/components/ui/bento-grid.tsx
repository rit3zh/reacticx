import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Smartphone,
  Zap,
  Sparkles,
  Palette,
  FileCode,
} from "lucide-react";

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = "small",
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={variants}
      className={cn(
        "group border-white/10 bg-neutral-950 hover:border-white/20 relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border px-6 pt-6 pb-10 shadow-md transition-all duration-500",
        className,
      )}
    >
      <div className="absolute top-0 -right-1/2 z-0 size-full cursor-pointer bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:24px_24px]"></div>

      <div className="text-white/[0.03] group-hover:text-white/[0.08] absolute right-1 bottom-3 scale-[6] transition-all duration-700 group-hover:scale-[6.2]">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="bg-white/10 text-white shadow-white/5 group-hover:bg-white/15 group-hover:shadow-white/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow transition-all duration-500">
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-neutral-400 text-sm">{description}</p>
        </div>
        <div className="text-white/50 group-hover:text-white/80 mt-4 flex items-center text-sm">
          <span className="mr-1">Explore</span>
          <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-2" />
        </div>
      </div>
      <div className="from-white/20 to-white/5 absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:blur-lg" />
    </motion.div>
  );
};

const items = [
  {
    title: "Copy & Paste",
    description:
      "Simply copy the code and paste it into your project. No complex setup or package installation required.",
    icon: <Copy className="size-6" />,
    size: "large" as const,
  },
  {
    title: "Expo Ready",
    description:
      "Built specifically for React Native with full Expo SDK support out of the box.",
    icon: <Smartphone className="size-6" />,
    size: "small" as const,
  },
  {
    title: "Reanimated 4",
    description:
      "Buttery smooth 60fps animations powered by React Native Reanimated.",
    icon: <Zap className="size-6" />,
    size: "medium" as const,
  },
  {
    title: "Skia Graphics",
    description:
      "Beautiful graphics, gradients, and visual effects with React Native Skia.",
    icon: <Sparkles className="size-6" />,
    size: "medium" as const,
  },
  {
    title: "Fully Customizable",
    description:
      "Every component is designed to be easily customized to match your brand.",
    icon: <Palette className="size-6" />,
    size: "small" as const,
  },
  {
    title: "TypeScript First",
    description:
      "Full TypeScript support with complete type definitions for excellent DX.",
    icon: <FileCode className="size-6" />,
    size: "large" as const,
  },
];

export default function BentoGrid1() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            icon={item.icon}
            size={item.size}
            className={cn(
              item.size === "large"
                ? "col-span-4"
                : item.size === "medium"
                  ? "col-span-3"
                  : "col-span-2",
              "h-full",
            )}
          />
        ))}
      </motion.div>
    </div>
  );
}
