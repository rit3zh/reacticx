"use client";

import type * as React from "react";

import { CodeBlockWrapper } from "@/docs-components/components/code-block-wrapper";
import { cn } from "@/lib/utils";

interface ComponentSourceClientProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComponentSourceClient({
  children,
  className,
  ...props
}: ComponentSourceClientProps) {
  return (
    <CodeBlockWrapper
      expandButtonTitle="Expand"
      className={cn("overflow-hidden rounded-md [&_pre]:px-4", className)}
      {...props}
    >
      {children}
    </CodeBlockWrapper>
  );
}
