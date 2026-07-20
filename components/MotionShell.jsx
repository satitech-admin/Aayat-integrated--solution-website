"use client";

import { useEffect } from "react";

export function MotionShell({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    const updateSpot = (event) => {
      document.documentElement.style.setProperty("--spot-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--spot-y", `${event.clientY}px`);
    };
    const goTop = () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

    document.querySelectorAll("[data-back-top]").forEach((button) => {
      button.addEventListener("click", goTop);
    });
    window.addEventListener("scroll", updateProgress, { passive: true });
    if (!prefersReduced) {
      window.addEventListener("pointermove", updateSpot, { passive: true });
    }
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updateSpot);
      document.querySelectorAll("[data-back-top]").forEach((button) => {
        button.removeEventListener("click", goTop);
      });
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      {children}
    </>
  );
}
