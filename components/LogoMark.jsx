import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/siteData";

export function LogoMark({ linked = true }) {
  const mark = (
    <span className="logo-mark" aria-label={company.name}>
      <span className="logo-symbol logo-symbol-image">
        <Image src="/images/aayat-logo.jpg" alt="" fill unoptimized sizes="48px" />
      </span>
      <span className="logo-copy">
        <strong>AAYAT</strong>
        <small>Integrated Solutions</small>
      </span>
    </span>
  );

  return linked ? (
    <Link href="/" className="logo-link">
      {mark}
    </Link>
  ) : (
    mark
  );
}
