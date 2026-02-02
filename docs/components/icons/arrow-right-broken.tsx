import type { SVGProps } from "react";

export function ArrowRightBroken(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            {...props}
        >
            <title>Arrow Right Down Broken</title>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M18 18H9m9 0V9m0 9l-6.5-6.5M6 6l2.5 2.5"
            />
        </svg>
    );
}
