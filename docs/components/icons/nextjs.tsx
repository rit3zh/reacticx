import type { SVGProps } from "react";

const Nextjs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="1em"
    viewBox="0 0 180 180"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      height={180}
      id="mask0_408_139"
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
      width={180}
      x={0}
      y={0}
    >
      <circle cx={90} cy={90} fill="black" r={90} />
    </mask>
    <g mask="url(#mask0_408_139)">
      <circle
        cx={90}
        cy={90}
        fill="black"
        r={87}
        stroke="white"
        strokeWidth={6}
      />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_408_139)"
      />
      <rect
        fill="url(#paint1_linear_408_139)"
        height={72}
        width={12}
        x={115}
        y={54}
      />
    </g>
    <defs>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint0_linear_408_139"
        x1={109}
        x2={144.5}
        y1={116.5}
        y2={160.5}
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id="paint1_linear_408_139"
        x1={121}
        x2={120.799}
        y1={54}
        y2={106.875}
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);
export default Nextjs;
