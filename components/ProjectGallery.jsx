"use client";

import Link from "next/link";
import { ArrowRight, Filter, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { PreviewImage } from "@/components/ImagePreview";
import { projectDemo } from "@/lib/siteData";

const filters = [
  "All",
  "Wooden Pallets",
  "Export Packaging",
  "Warehousing",
  "Industrial Racking",
  "Warehouse Property",
  "Factory Setup",
  "Waste Management",
];

export function ProjectGallery() {
  const [active, setActive] = useState("All");
  const visible = useMemo(
    () => (active === "All" ? projectDemo : projectDemo.filter((project) => project.category === active)),
    [active]
  );

  return (
    <div className="project-gallery" id="projects-gallery">
      <div className="filter-row" role="tablist" aria-label="Project filters">
        {filters.map((filter) => (
          <button
            type="button"
            key={filter}
            className={active === filter ? "active" : ""}
            onClick={() => setActive(filter)}
            role="tab"
            aria-selected={active === filter}
          >
            {filter === "All" ? <Filter size={15} aria-hidden="true" /> : null}
            {filter}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="grid three">
          {visible.map((project, index) => (
            <article
              className={`project-card card ${project.featured ? "featured-project" : ""}`}
              key={`${project.title}-${index}`}
            >
              <div className="industrial-media project-media">
                <PreviewImage
                  src={project.image || "/images/industrial-pallets.jpg"}
                  alt={project.imageAlt || `${project.category} project visual`}
                  label={project.title}
                  sizes="(max-width: 760px) 100vw, 31vw"
                />
                <span>{project.category}</span>
              </div>
              <div className="tag-list">
                <span className="tag">
                  <MapPin size={14} aria-hidden="true" /> {project.location}
                </span>
                <span className="tag">{project.industry}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.scope}</p>
              <dl>
                <div>
                  <dt>Completion</dt>
                  <dd>{project.completion}</dd>
                </div>
                <div>
                  <dt>Challenge</dt>
                  <dd>{project.challenge}</dd>
                </div>
                <div>
                  <dt>Solution</dt>
                  <dd>{project.solution}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
              <Link className="text-link" href="/request-a-quote">
                Discuss a similar project <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <h3>No matching project entries yet.</h3>
          <p>Use the admin dashboard to add verified project images, videos, locations, challenges, solutions, and results.</p>
        </div>
      )}
    </div>
  );
}
