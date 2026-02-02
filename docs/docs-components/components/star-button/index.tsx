"use client";
import { GithubIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function GitHubStarButton() {
  const [stars, setStars] = useState("250");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await fetch(
          "https://img.shields.io/github/stars/rit3zh/glow-ui.json",
        );
        const data = await response.json();

        const starCount = parseInt(data.value);
        const formatted =
          starCount >= 1000
            ? `${(starCount / 1000).toFixed(1)}k`
            : starCount.toString();

        setStars(formatted);
      } catch (error) {
        console.error("Failed to fetch stars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStars();
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.open("https://github.com/rit3zh/glow-ui", "_blank")}
      className="animate-rainbow before:animate-rainbow group text-foreground ring-offset-background focus-visible:ring-ring relative inline-flex h-auto cursor-pointer items-center justify-center rounded-lg border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] px-3 py-2 sm:px-4 sm:py-[9px] text-sm sm:text-base font-medium whitespace-nowrap transition-transform duration-200 [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:bg-[linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))] before:[filter:blur(calc(0.8*1rem))] hover:scale-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(0,100%,63%),hsl(90,100%,63%),hsl(210,100%,63%),hsl(195,100%,63%),hsl(270,100%,63%))]"
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <GithubIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black dark:text-white" />
        <span className="text-black dark:text-white font-satoshi text-sm sm:text-base leading-[1.2]">
          GitHub
        </span>
        <svg
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 transition-all duration-200 group-hover:text-yellow-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            fillRule="evenodd"
          />
        </svg>
        <span
          className={`font-medium text-xs sm:text-sm text-black dark:text-white tabular-nums transition-opacity duration-200 ${isLoading ? "opacity-50" : "opacity-100"}`}
        >
          {stars}
        </span>
      </div>
      <style jsx>{`
        @keyframes rainbow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
        .animate-rainbow {
          animation: rainbow 3s linear infinite;
        }
      `}</style>
    </button>
  );
}
