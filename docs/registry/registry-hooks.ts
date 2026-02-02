import type { Registry } from "./schema";

export const hooks: Registry = [
    {
        name: "use-auto-resize-textarea",
        type: "registry:hook",
        files: [
            {
                path: "hooks/use-auto-resize-textarea.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-click-outside",
        type: "registry:hook",
        files: [
            {
                path: "hooks/use-click-outside.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-copy-to-clipboard",
        type: "registry:hook",
        files: [
            {
                path: "hooks/use-copy-to-clipboard.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "use-mobile",
        type: "registry:hook",
        files: [
            {
                path: "hooks/use-mobile.ts",
                type: "registry:hook",
            },
        ],
    },
];
