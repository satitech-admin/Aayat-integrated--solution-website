import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="page-hero not-found-page">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow"><Search size={15} aria-hidden="true" /> 404</span>
          <h1>This industrial route is not available.</h1>
          <p>The page may have moved, or the content may not have been published yet.</p>
          <Link href="/" className="btn btn-primary">
            <ArrowLeft size={17} aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
