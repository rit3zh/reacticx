"use client";

import { useState, useEffect } from "react";

interface UseIntersectionOptions {
    threshold?: number;
    prefix?: string;
}

export function useIntersection(
    items: { id: string | number }[],
    options: UseIntersectionOptions = {}
) {
    const [visibleIds, setVisibleIds] = useState<Set<string | number>>(
        new Set()
    );

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            setVisibleIds((prev) => {
                const next = new Set(prev);
                for (const entry of entries) {
                    const id = entry.target.id.replace(
                        `${options.prefix}-`,
                        ""
                    );
                    const parsedId = Number.isNaN(Number(id)) ? id : Number(id);

                    if (entry.isIntersecting) {
                        next.add(parsedId);
                    } else {
                        next.delete(parsedId);
                    }
                }
                return next;
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: options.threshold || 0.2,
            rootMargin: "-50px 0px",
        });

        for (const item of items) {
            const element = document.getElementById(
                `${options.prefix}-${item.id}`
            );
            if (element) observer.observe(element);
        }

        return () => observer.disconnect();
    }, [items, options.prefix, options.threshold]);

    return { visibleIds };
}
