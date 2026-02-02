import React from "react";

export function Footer() {
  return (
    <>
      <footer className="flex items-center justify-center py-8">
        <p className="text-neutral-500 text-sm">
          Built with 💙 The source code is available on{" "}
          <a
            href="https://github.com/rit3zh/reacticx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 underline underline-offset-4 hover:text-white transition-colors"
          >
            GitHub
          </a>
          .
          <span className="text-muted-foreground block text-center text-sm">
            {" "}
            © {new Date().getFullYear()} Reacticx, All rights reserved
          </span>
        </p>
      </footer>
    </>
  );
}
