"use client";

/**
 * @author: @dorianbaffier
 * @description: Currency Transfer
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {
  ArrowDownIcon,
  ArrowUpDown,
  ArrowUpIcon,
  Check,
  InfoIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface CheckmarkProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: { delay: i * 0.2, duration: 0.3 },
    },
  }),
};

export function Checkmark({
  size = 100,
  strokeWidth = 2,
  color = "currentColor",
  className = "",
}: CheckmarkProps) {
  return (
    <motion.svg
      animate="visible"
      className={className}
      height={size}
      initial="hidden"
      viewBox="0 0 100 100"
      width={size}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        custom={0}
        cx="50"
        cy="50"
        r="42"
        stroke={color}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 2px rgba(16, 185, 129, 0.2))",
        }}
        variants={draw as any}
      />
      <motion.path
        custom={1}
        d="M32 50L45 63L68 35"
        stroke={color}
        style={{
          strokeWidth: strokeWidth + 0.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 1px rgba(16, 185, 129, 0.3))",
        }}
        variants={draw as any}
      />
    </motion.svg>
  );
}

export default function CurrencyTransfer() {
  const [isCompleted, setIsCompleted] = useState(false);
  const transactionId = "TXN-DAB3UL494";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <Card className="mx-auto flex h-[420px] w-full max-w-sm flex-col border border-zinc-200/60 bg-white p-6 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/20 dark:border-zinc-800/60 dark:bg-zinc-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03)] dark:hover:border-emerald-500/20">
        <CardContent className="flex flex-1 flex-col justify-center space-y-4">
          <div className="flex h-[80px] items-center justify-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
              initial={{ opacity: 0, y: -10 }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative flex h-[100px] w-[100px] items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0, 1, 0.8],
                  }}
                  className="absolute inset-0 rounded-full bg-emerald-500/10 blur-2xl dark:bg-emerald-500/5"
                  initial={{ opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.5, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.div
                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}
                      className="flex h-[100px] w-[100px] items-center justify-center"
                      initial={{
                        opacity: 0,
                        rotate: -180,
                      }}
                      key="completed"
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="relative z-10 rounded-full border border-emerald-500 bg-white p-5 dark:bg-zinc-900">
                        <Check
                          className="h-10 w-10 text-emerald-500"
                          strokeWidth={3.5}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={{ opacity: 1 }}
                      className="flex h-[100px] w-[100px] items-center justify-center"
                      exit={{
                        opacity: 0,
                        rotate: 360,
                      }}
                      initial={{ opacity: 0 }}
                      key="progress"
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="relative z-10">
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.02, 1],
                          }}
                          className="absolute inset-0 rounded-full border-2 border-transparent"
                          style={{
                            borderLeftColor: "rgb(16 185 129)",
                            borderTopColor: "rgb(16 185 129 / 0.2)",
                            filter: "blur(0.5px)",
                          }}
                          transition={{
                            rotate: {
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            },
                            scale: {
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            },
                          }}
                        />
                        <div className="relative z-10 rounded-full bg-white p-5 shadow-[0_0_15px_rgba(16,185,129,0.1)] dark:bg-zinc-900">
                          <ArrowUpDown className="h-10 w-10 text-emerald-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          <div className="flex h-[280px] flex-col">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 w-full space-y-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.h2
                    animate={{ opacity: 1, y: 0 }}
                    className="font-semibold text-lg text-zinc-900 uppercase tracking-tighter dark:text-zinc-100"
                    exit={{ opacity: 0, y: -20 }}
                    initial={{ opacity: 0, y: 20 }}
                    key="completed-title"
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Transfer Completed
                  </motion.h2>
                ) : (
                  <motion.h2
                    animate={{ opacity: 1, y: 0 }}
                    className="font-semibold text-lg text-zinc-900 uppercase tracking-tighter dark:text-zinc-100"
                    exit={{ opacity: 0, y: -20 }}
                    initial={{ opacity: 0, y: 20 }}
                    key="progress-title"
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Transfer in Progress
                  </motion.h2>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="font-medium text-emerald-600 text-xs dark:text-emerald-400"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="completed-id"
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Transaction ID: {transactionId}
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="font-medium text-emerald-600 text-xs dark:text-emerald-400"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    key="progress-status"
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    Processing Transaction...
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-4 flex items-center gap-4">
                <motion.div
                  animate={{ opacity: 1 }}
                  className="relative flex-1"
                  initial={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <motion.div
                    animate={{
                      gap: isCompleted ? "0px" : "12px",
                    }}
                    className="relative flex flex-col items-start"
                    initial={{ gap: "12px" }}
                    transition={{
                      duration: 0.6,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <motion.div
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      className={cn(
                        "w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 backdrop-blur-md transition-all duration-300 dark:border-zinc-700/50 dark:bg-zinc-800/50",
                        isCompleted
                          ? "rounded-b-none border-b-0"
                          : "hover:border-emerald-500/30"
                      )}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <div className="w-full space-y-1">
                        <motion.span
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5 font-medium text-xs text-zinc-500 dark:text-zinc-400"
                          initial={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ArrowUpIcon className="h-3 w-3" />
                          From
                        </motion.span>
                        <div className="flex flex-col gap-1.5">
                          <motion.div
                            animate={{ opacity: 1 }}
                            className="group flex items-center gap-2.5"
                            initial={{ opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <motion.span
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white font-medium text-sm text-zinc-900 shadow-lg transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                              whileHover={{
                                scale: 1.05,
                              }}
                            >
                              $
                            </motion.span>
                            <div className="flex flex-col items-start">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  animate={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  className={cn(
                                    "font-medium text-zinc-900 tracking-tight dark:text-zinc-100"
                                  )}
                                  exit={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  initial={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  key={
                                    isCompleted
                                      ? "completed-amount"
                                      : "processing-amount"
                                  }
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                >
                                  500.00 USD
                                </motion.span>
                              </AnimatePresence>
                              <motion.span
                                animate={{
                                  opacity: 1,
                                }}
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                                initial={{
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                Chase Bank ••••4589
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{
                        y: 0,
                        scale: 1,
                      }}
                      className={cn(
                        "w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 backdrop-blur-md transition-all duration-300 dark:border-zinc-700/50 dark:bg-zinc-800/50",
                        isCompleted
                          ? "rounded-t-none border-t-0"
                          : "hover:border-emerald-500/30"
                      )}
                      transition={{
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <div className="w-full space-y-1">
                        <motion.span
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-1.5 font-medium text-xs text-zinc-500 dark:text-zinc-400"
                          initial={{ opacity: 1 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <ArrowDownIcon className="h-3 w-3" />
                          To
                        </motion.span>
                        <div className="flex flex-col gap-1.5">
                          <motion.div
                            animate={{ opacity: 1 }}
                            className="group flex items-center gap-2.5"
                            initial={{ opacity: 1 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            <motion.span
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white font-medium text-sm text-zinc-900 shadow-lg transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                              }}
                              whileHover={{
                                scale: 1.05,
                              }}
                            >
                              €
                            </motion.span>
                            <div className="flex flex-col items-start">
                              <AnimatePresence mode="wait">
                                <motion.span
                                  animate={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  className={cn(
                                    "font-medium text-zinc-900 tracking-tight dark:text-zinc-100"
                                  )}
                                  exit={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  initial={{
                                    opacity: isCompleted ? 1 : 0.5,
                                  }}
                                  key={
                                    isCompleted
                                      ? "completed-amount-eur"
                                      : "processing-amount-eur"
                                  }
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                >
                                  460.00 EUR
                                </motion.span>
                              </AnimatePresence>
                              <motion.span
                                animate={{
                                  opacity: 1,
                                }}
                                className="text-xs text-zinc-500 dark:text-zinc-400"
                                initial={{
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                Deutsche Bank ••••7823
                              </motion.span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                animate={{ opacity: 1 }}
                className="mt-2 flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400"
                initial={{ opacity: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <AnimatePresence mode="wait">
                  {isCompleted ? (
                    <motion.span
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      initial={{ opacity: 0, y: 10 }}
                      key="completed-rate"
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Exchange Rate: 1 USD = 0.92 EUR
                    </motion.span>
                  ) : (
                    <motion.span
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      initial={{ opacity: 0, y: 10 }}
                      key="calculating-rate"
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      Calculating exchange rate...
                    </motion.span>
                  )}
                </AnimatePresence>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-3 w-3 text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {isCompleted
                        ? "Rate updated at 10:45 AM"
                        : "Please wait..."}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
