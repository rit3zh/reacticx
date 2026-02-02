import { codeToHast } from "shiki/bundle/web";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";

import { jsx, jsxs } from "react/jsx-runtime";

export async function highlight(
    code: string,
    language: string,
    currentTheme: "light" | "dark" | "system" = "dark"
) {
    const themeToUse = currentTheme === "system" ? "dark" : currentTheme;

    const out = await codeToHast(code, {
        lang: language,
        themes: {
            light: "github-light",
            dark: "github-dark",
        },
        defaultColor: themeToUse,
    });

    return toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
    });
}
