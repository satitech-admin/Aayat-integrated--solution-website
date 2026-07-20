"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "@/lib/assetPath";

export function PreviewImage({
  src,
  alt,
  label,
  sizes = "(max-width: 760px) 100vw, 40vw",
}) {
  const [open, setOpen] = useState(false);
  const title = label || alt || "image";
  const canUsePortal = typeof document !== "undefined";
  const resolvedSrc = assetPath(src);

  const modal = open && canUsePortal ? (
    <div className="image-preview-modal" role="dialog" aria-modal="true" aria-label={title} onClick={() => setOpen(false)}>
      <div className="image-preview-card" onClick={(event) => event.stopPropagation()}>
        <button className="image-preview-close" type="button" onClick={() => setOpen(false)} aria-label="Close image preview">
          <X size={20} aria-hidden="true" />
        </button>
        <div className="image-preview-stage">
          <Image src={resolvedSrc} alt={alt} fill unoptimized sizes="96vw" priority />
        </div>
        <p>{title}</p>
      </div>
    </div>
  ) : null;

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        className="preview-image-button"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Preview ${title}`}
      >
        <Image src={resolvedSrc} alt={alt} fill unoptimized sizes={sizes} loading="lazy" />
        <span className="preview-image-cue">
          <Maximize2 size={15} aria-hidden="true" /> Preview
        </span>
      </button>
      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
