"use client";

import { Factory, Forklift, PackageCheck, Recycle, ShieldCheck } from "lucide-react";

export function HeroScene() {
  return (
    <div className="hero-video-stage" aria-hidden="true">
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/aayat-warehouse-racking.jpg"
      >
        <source src="/videos/aayat-hero-loop.webm" type="video/webm" media="(min-width: 761px)" />
      </video>
      <div className="hero-video-badges">
        <span><ShieldCheck size={15} /> ISPM-15 certified</span>
        <span><PackageCheck size={15} /> 500 pallets/day</span>
        <span><Factory size={15} /> Bhiwandi base</span>
      </div>
      <div className="hero-video-flow">
        <span><Factory size={14} /> Manufacture</span>
        <span><Forklift size={14} /> Dispatch</span>
        <span><Recycle size={14} /> Recycle</span>
      </div>
    </div>
  );
}
