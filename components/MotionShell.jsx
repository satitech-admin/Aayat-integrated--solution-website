"use client";

import { useEffect } from "react";

export function MotionShell({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    let progressFrame = 0;
    let pointerFrame = 0;
    let latestPointer = null;

    const paintProgress = () => {
      progressFrame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };

    const updateProgress = () => {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(paintProgress);
    };

    const paintPointer = () => {
      pointerFrame = 0;
      if (!latestPointer) return;
      document.documentElement.style.setProperty("--spot-x", `${latestPointer.clientX}px`);
      document.documentElement.style.setProperty("--spot-y", `${latestPointer.clientY}px`);
    };

    const updateSpot = (event) => {
      latestPointer = event;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paintPointer);
    };

    const goTop = () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    const backTopButtons = document.querySelectorAll("[data-back-top]");

    backTopButtons.forEach((button) => button.addEventListener("click", goTop));
    window.addEventListener("scroll", updateProgress, { passive: true });

    if (!prefersReduced && hasFinePointer) {
      window.addEventListener("pointermove", updateSpot, { passive: true });
    }

    paintProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updateSpot);
      backTopButtons.forEach((button) => button.removeEventListener("click", goTop));
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      {children}
    </>
  );
}
