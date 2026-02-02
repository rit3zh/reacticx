import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import React from "react";
import { navLinks, socialLinks } from "./header";
import { buttonVariants } from "../button";
import { createPortal } from "react-dom";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { isMobile } = useMediaQuery();

  // Check if component is mounted (client-side only)
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 🚫 Disable body scroll when open
  React.useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Cleanup on unmount too
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, isMobile]);

  return (
    <>
      <span
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden cursor-pointer p-2 hover:bg-accent rounded-md transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </span>

      {mounted &&
        open &&
        createPortal(
          <div
            className={cn(
              "bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50",
              "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t md:hidden",
            )}
            id="mobile-menu"
          >
            <div
              className={cn(
                "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
                "size-full p-4 flex flex-col",
              )}
              data-slot={open ? "open" : "closed"}
            >
              {/* Navigation Links */}
              <div className="grid gap-y-1">
                {navLinks.map((link) => (
                  <a
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start gap-3 h-12 text-base",
                    })}
                    href={link.href}
                    key={link.label}
                    onClick={() => setOpen(false)}
                  >
                    <link.icon className="h-5 w-5 opacity-70" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-border" />

              {/* Social Links */}
              <div className="grid gap-y-1">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Connect
                </p>
                {socialLinks.map((link) => (
                  <a
                    className={buttonVariants({
                      variant: "ghost",
                      className: "justify-start gap-3 h-12 text-base",
                    })}
                    href={link.href}
                    key={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <link.icon className="h-5 w-5 opacity-70" />
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Bottom spacing / optional CTA area */}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
