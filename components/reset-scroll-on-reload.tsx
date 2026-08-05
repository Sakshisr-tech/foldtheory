"use client";

import { useEffect } from "react";

/**
 * On a full page reload, clear any section hash and start at the top.
 * In-page nav links (e.g. #services) still work on click; only reloads are reset.
 */
export function ResetScrollOnReload() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const navigationEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    const isReload = navigationEntry?.type === "reload";

    if (isReload) {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }

      const scrollTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      scrollTop();
      // Re-assert after browser hash jump / Lenis init settle
      window.requestAnimationFrame(() => {
        scrollTop();
        window.setTimeout(scrollTop, 50);
      });
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
