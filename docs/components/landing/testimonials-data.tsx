import type { XCardProps } from "./x-card";

export const testimonials: XCardProps[] = [
  {
    name: "Rexan Wong",
    username: "rexan_wong",
    avatar:
      "https://pbs.twimg.com/profile_images/1872649737310224385/ZG73VN1s_x96.jpg",
    content: (
      <>
        <p className="text-base text-black dark:text-white/90">
          if you use <span className="text-blue-500">@shadcn</span> ui for your
          apps, you&apos;re gonna love these 7 ui libraries:
        </p>
        <p className="mt-2 text-base text-black dark:text-white/90">
          &gt;{" "}
          <a
            className="text-blue-500 hover:underline"
            href="https://kokonutui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            kokonutui.com
          </a>
        </p>
      </>
    ),
    date: "Dec 16, 2025",
    isVerified: true,
  },
  {
    name: "OrcDev",
    username: "orcdev",
    avatar:
      "https://pbs.twimg.com/profile_images/1756766826736893952/6Gvg6jha_x96.jpg",
    content: (
      <>
        <p className="text-base text-black dark:text-white/90">
          3 React @shadcn libraries you NEED to know! 🔥
        </p>
      </>
    ),
    date: "",
    isVerified: true,
  },
  {
    name: "Rajiv S",
    username: "rjv_im",
    avatar:
      "https://pbs.twimg.com/profile_images/1842868023289430017/ZCnfeP5L_x96.jpg",
    content: (
      <>
        <p className="text-base text-black dark:text-white/90">
          Super cool background paths by @dorianbaffier's, check out
          https://kokonutui.com
        </p>
      </>
    ),
    date: "",
    isVerified: true,
  },
  {
    name: "Nitro",
    username: "Mehdi_B_25",
    avatar:
      "https://pbs.twimg.com/profile_images/1834941026051481600/R6Mi43Sk_x96.jpg",
    content: (
      <>
        <p className="text-base text-black dark:text-white/90">
          Looking to add animations and beautiful components to your website?
          Check out these two UI libraries for @nextjs + @tailwindcss
        </p>
      </>
    ),
    date: "",
    isVerified: true,
  },
  {
    name: "Toolfolio",
    username: "toolfolio",
    avatar:
      "https://pbs.twimg.com/profile_images/1979166137083404288/p8GVBB-M_x96.png",
    content: (
      <>
        <p className="text-base text-black dark:text-white/90">
          KokonutUI Open Source - Interactive UI components built with Tailwind
          CSS & shadcn for React and Next.js
        </p>
      </>
    ),
    date: "",
    isVerified: true,
  },
];
