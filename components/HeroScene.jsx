"use client";

import { Factory, Forklift, PackageCheck, Recycle, ShieldCheck } from "lucide-react";
import { assetPath } from "@/lib/assetPath";

export function HeroScene() {
  return (
    <div className="hero-video-stage" aria-hidden="true">
      <img
        className="hero-bg-video"
        src={assetPath("/images/aayat-warehouse-racking.jpg")}
        alt=""
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
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
