"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { announcements, type Announcement } from "@/config/announcements";

const STORAGE_KEY = "reactix-announcements-seen";

export function AnnouncementDialog() {
  const [open, setOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] =
    useState<Announcement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!pathname.startsWith("/docs")) return;
    const seenAnnouncements = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );

    const latestAnnouncement = announcements
      .slice()
      .reverse()
      .find((announcement) => !seenAnnouncements.includes(announcement.id));

    if (latestAnnouncement) {
      setCurrentAnnouncement(latestAnnouncement);
      setOpen(true);
    }
  }, [pathname]);

  const handleClose = () => {
    setOpen(false);

    if (currentAnnouncement) {
      const seenAnnouncements = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );

      const updatedSeen = [...seenAnnouncements, currentAnnouncement.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSeen));
    }
  };

  const handleComponentClick = (componentPath: string) => {
    setOpen(false);

    if (currentAnnouncement) {
      const seenAnnouncements = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]",
      );

      const updatedSeen = [...seenAnnouncements, currentAnnouncement.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSeen));
    }

    router.push(componentPath);
  };

  if (!currentAnnouncement) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[380px] p-0 gap-0 border-border/50 bg-background/95 backdrop-blur-sm shadow-lg">
        <div className="px-5 pt-5 pb-4">
          <DialogHeader className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <DialogTitle className="text-base font-medium">
                {currentAnnouncement.title}
              </DialogTitle>
              <button
                onClick={handleClose}
                className="text-muted-foreground/60 hover:text-foreground transition-colors -mt-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              {currentAnnouncement.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 pt-4 border-t border-border/50">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mb-2.5">
              New components
            </p>
            <div className="flex flex-wrap gap-1.5">
              {currentAnnouncement.newComponents.map((component) => (
                <button
                  key={component.name}
                  onClick={() => handleComponentClick(component.path)}
                  className="inline-flex px-2 py-0.5 text-xs rounded-md bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  {component.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-border/50 bg-muted/20">
          <Button
            size="sm"
            onClick={handleClose}
            className="w-full h-8 text-xs font-medium"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
