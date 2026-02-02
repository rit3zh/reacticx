"use client";

import * as React from "react";
import { Preview } from "./preview";
import { RefreshButton } from "./refresh-button";

interface PreviewClientProps {
  children: React.ReactNode;
  className?: string;
  isPremium?: boolean;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
}

export function PreviewClient(props: PreviewClientProps) {
  const [key, setKey] = React.useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <div key={key}>
        <Preview {...props} />
      </div>
    </div>
  );
}
