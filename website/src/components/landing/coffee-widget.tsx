"use client";

import { useEffect } from "react";

// The Buy Me a Coffee widget ships as a script that injects its own floating
// button into `document.body`, so it has to be attached on the client and
// cleaned up by hand.
//
// The catch: the script builds the button inside a `DOMContentLoaded`
// listener. On a Next.js page the script is appended long after that event has
// fired, so the listener never runs and nothing renders. Re-dispatching the
// event once the script has loaded is what actually makes the button appear;
// diffing `document.body`'s children around that dispatch is how we know what
// to remove again, since the nodes it appends are mostly id-less.
export function CoffeeWidget() {
  useEffect(() => {
    const host = document.getElementById("supportByBMC");
    if (!host) return;

    let injected: Element[] = [];

    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.async = true;
    // The script looks itself up by this name to read the settings below.
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "rit3zh");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Thank you for visiting. You can now buy me a coffee!",
    );
    script.setAttribute("data-color", "#FF813F");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "50");
    script.setAttribute("data-y_margin", "60");

    script.onload = () => {
      if (document.readyState === "loading") return;
      const before = new Set(document.body.children);
      // The widget listens on `window`, so the event has to bubble up out of
      // `document` to reach it — a non-bubbling event stops short and the
      // button never gets built.
      document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
      injected = Array.from(document.body.children).filter(
        (node) => !before.has(node),
      );
    };

    host.appendChild(script);

    return () => {
      host.innerHTML = "";
      for (const node of injected) node.remove();
      document.getElementById("bmc-wbtn")?.remove();
    };
  }, []);

  return <div id="supportByBMC" />;
}
