"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const navItems = {
  "/": {
    name: "home",
  },
  "/works": {
    name: "works",
  },
  "/blog": {
    name: "blog",
  },
  "/about": {
    name: "about",
  },
};

export function MorphicNavbar() {
  const [activePath, setActivePath] = useState("/");

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return activePath === "/";
    }
    return activePath.startsWith(path);
  };

  return (
    <nav className="mx-auto max-w-4xl px-4 py-2">
      <div className="flex items-center justify-center">
        <div className="glass flex items-center justify-between overflow-hidden rounded-xl">
          {Object.entries(navItems).map(([path, { name }], index, array) => {
            const isActive = isActiveLink(path);
            const isFirst = index === 0;
            const isLast = index === array.length - 1;
            const prevPath = index > 0 ? array[index - 1][0] : null;
            const nextPath =
              index < array.length - 1 ? array[index + 1][0] : null;

            return (
              <Link
                className={clsx(
                  "flex items-center justify-center bg-black p-1.5 px-4 text-sm text-white transition-all duration-300 dark:bg-white dark:text-black",
                  isActive
                    ? "mx-2 rounded-xl font-semibold text-sm"
                    : clsx(
                        (isActiveLink(prevPath || "") || isFirst) &&
                          "rounded-l-xl",
                        (isActiveLink(nextPath || "") || isLast) &&
                          "rounded-r-xl"
                      )
                )}
                href="#"
                key={path}
                onClick={() => setActivePath(path)}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MorphicNavbar;
