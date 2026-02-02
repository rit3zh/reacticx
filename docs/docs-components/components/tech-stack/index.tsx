import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/docs-components/components/tooltip";

type TechComponentType = {
  name: string;
  icon: React.ReactNode;
};

type TechComponents = Record<string, TechComponentType>;

const techComponents: TechComponents = {
  "react-native": {
    name: "React Native",
    icon: (
      <svg
        role="img"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="React Native"
        className="size-8"
        fill="currentColor"
      >
        <title>React Native</title>
        <path d="m16 13.146c-1.573 0-2.854 1.281-2.854 2.854s1.281 2.854 2.854 2.854 2.854-1.281 2.854-2.854-1.281-2.854-2.854-2.854zm-7.99 8.526-.63-.156c-4.688-1.188-7.38-3.198-7.38-5.521s2.693-4.333 7.38-5.521l.63-.156.177.625c.474 1.635 1.083 3.229 1.818 4.771l.135.281-.135.286c-.734 1.536-1.344 3.13-1.818 4.771zm-.921-9.74c-3.563 1-5.75 2.536-5.75 4.063s2.188 3.057 5.75 4.063c.438-1.391.964-2.745 1.578-4.063-.615-1.318-1.141-2.672-1.578-4.063zm16.901 9.74-.177-.625c-.474-1.635-1.083-3.229-1.818-4.766l-.135-.286.135-.286c.734-1.536 1.344-3.13 1.818-4.771l.177-.62.63.156c4.688 1.188 7.38 3.198 7.38 5.521s-2.693 4.333-7.38 5.521zm-.657-5.677c.641 1.385 1.172 2.745 1.578 4.063 3.568-1.005 5.75-2.536 5.75-4.063s-2.188-3.057-5.75-4.063c-.438 1.385-.964 2.745-1.578 4.063zm-16.255-4.068-.177-.625c-1.318-4.646-.917-7.979 1.099-9.141 1.979-1.141 5.151.208 8.479 3.625l.453.464-.453.464c-1.182 1.229-2.26 2.552-3.229 3.958l-.182.255-.313.026c-1.703.135-3.391.406-5.047.813zm2.531-8.838c-.359 0-.677.073-.943.229-1.323.766-1.557 3.422-.646 7.005 1.422-.318 2.859-.542 4.313-.672.833-1.188 1.75-2.323 2.734-3.391-2.078-2.026-4.047-3.172-5.458-3.172zm12.787 27.145c-.005 0-.005 0 0 0-1.901 0-4.344-1.427-6.875-4.031l-.453-.464.453-.464c1.182-1.229 2.26-2.552 3.229-3.958l.177-.255.313-.031c1.703-.13 3.391-.401 5.052-.813l.63-.156.177.625c1.318 4.646.917 7.974-1.099 9.135-.49.281-1.042.422-1.604.411zm-5.464-4.505c2.078 2.026 4.047 3.172 5.458 3.172h.005c.354 0 .672-.078.938-.229 1.323-.766 1.563-3.422.646-7.005-1.422.318-2.865.542-4.313.667-.833 1.193-1.75 2.323-2.734 3.396zm7.99-13.802-.63-.161c-1.661-.406-3.349-.677-5.052-.813l-.313-.026-.177-.255c-.969-1.406-2.047-2.729-3.229-3.958l-.453-.464.453-.464c3.328-3.417 6.5-4.766 8.479-3.625 2.016 1.161 2.417 4.495 1.099 9.141zm-5.255-2.276c1.521.141 2.969.365 4.313.672.917-3.583.677-6.24-.646-7.005-1.318-.76-3.797.406-6.401 2.943.984 1.073 1.896 2.203 2.734 3.391zm-10.058 20.583c-.563.01-1.12-.13-1.609-.411-2.016-1.161-2.417-4.49-1.099-9.135l.177-.625.63.156c1.542.391 3.24.661 5.047.813l.313.031.177.255c.969 1.406 2.047 2.729 3.229 3.958l.453.464-.453.464c-2.526 2.604-4.969 4.031-6.865 4.031zm-1.588-8.567c-.917 3.583-.677 6.24.646 7.005 1.318.75 3.792-.406 6.401-2.943-.984-1.073-1.901-2.203-2.734-3.396-1.453-.125-2.891-.349-4.313-.667zm7.979.838c-1.099 0-2.224-.047-3.354-.141l-.313-.026-.182-.26c-.635-.917-1.24-1.859-1.797-2.828-.563-.969-1.078-1.958-1.557-2.969l-.135-.286.135-.286c.479-1.01.995-2 1.557-2.969.552-.953 1.156-1.906 1.797-2.828l.182-.26.313-.026c2.234-.188 4.479-.188 6.708 0l.313.026.182.26c1.276 1.833 2.401 3.776 3.354 5.797l.135.286-.135.286c-.953 2.021-2.073 3.964-3.354 5.797l-.182.26-.313.026c-1.125.094-2.255.141-3.354.141zm-2.927-1.448c1.969.151 3.885.151 5.859 0 1.099-1.609 2.078-3.302 2.927-5.063-.844-1.76-1.823-3.453-2.932-5.063-1.948-.151-3.906-.151-5.854 0-1.109 1.609-2.089 3.302-2.932 5.063.849 1.76 1.828 3.453 2.932 5.063z" />
      </svg>
    ),
  },
  expo: {
    name: "Expo",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Expo"
        className="size-8"
        fill="currentColor"
      >
        <title>Expo</title>
        <path d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.303.567.49-.505 5.794-9.776 8.35-13.29a.761.761 0 011.258 0c2.556 3.514 7.86 12.785 8.35 13.29.727.748 1.723.282 2.303-.567.57-.835.728-1.42.728-2.046 0-.426-8.26-15.27-9.263-16.982-.588-1.005-.89-1.501-2.063-1.501H9.044c-1.172 0-1.632.665-2.22 1.67-.51.872-6.938 12.32-6.824 17.081z" />
      </svg>
    ),
  },
  reanimated: {
    name: "React Native Reanimated",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="React Native Reanimated"
        className="size-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>Reanimated</title>
        {/* Animated wave/motion lines */}
        <path d="M2 12c1.5-2 3-3 4.5-3s3 1 4.5 3 3 3 4.5 3 3-1 4.5-3" />
        <path d="M2 7c1.5-2 3-3 4.5-3s3 1 4.5 3 3 3 4.5 3 3-1 4.5-3" />
        <path d="M2 17c1.5-2 3-3 4.5-3s3 1 4.5 3 3 3 4.5 3 3-1 4.5-3" />
      </svg>
    ),
  },
  skia: {
    name: "React Native Skia",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="React Native Skia"
        className="size-8"
        fill="currentColor"
      >
        <title>Skia</title>
        {/* Skia-inspired triangle/graphics shape */}
        <path d="M12 2L2 19h20L12 2zm0 4l6.5 11h-13L12 6z" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
  },
  svg: {
    name: "React Native SVG",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="React Native SVG"
        className="size-8"
        fill="currentColor"
      >
        <title>SVG</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z" />
      </svg>
    ),
  },
};

export function TechStack({
  technologies,
  className,
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-row gap-3", className)}>
      {technologies.map((tech) => (
        <Tooltip key={tech}>
          <TooltipTrigger>
            <div className="[perspective:200px] [transform-style:preserve-3d]">
              <div
                className="relative mx-auto h-12 w-12 rounded-md bg-gradient-to-b from-neutral-200 to-neutral-100 p-[3px] transition-transform duration-300 hover:scale-105 dark:from-neutral-800 dark:to-neutral-950"
                style={{
                  transform: "rotateX(15deg)",
                  transformOrigin: "center",
                }}
              >
                <div className="relative z-20 flex h-full w-full items-center justify-center overflow-hidden rounded-[4px] bg-white dark:bg-black">
                  <div className="text-blue-500 transition-colors duration-200 hover:text-blue-400 dark:text-blue-500 dark:hover:text-blue-400">
                    {techComponents[tech].icon}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-30 mx-auto h-3 w-full rounded-full bg-neutral-300 opacity-50 blur-md dark:bg-neutral-600" />

                <div className="absolute inset-x-0 bottom-0 mx-auto h-px w-[60%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 mx-auto h-[6px] w-[60%] bg-gradient-to-r from-transparent via-blue-600 to-transparent blur-sm" />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{techComponents[tech].name}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

// Usage example:
// <TechStack
//   className="mx-auto flex w-full items-center justify-between"
//   technologies={["react-native", "expo", "reanimated", "skia", "svg"]}
// />
