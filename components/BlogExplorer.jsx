"use client";

import Link from "next/link";
import { Search, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { blogPosts } from "@/lib/siteData";

export function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];
  const visible = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const haystack = `${post.title} ${post.category} ${post.excerpt}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase());
    });
  }, [category, query]);

  return (
    <div className="blog-explorer">
      <div className="blog-tools glass-panel">
        <label className="field search-field">
          <span>Search insights</span>
          <div>
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by topic or keyword" />
          </div>
        </label>
        <div className="filter-row" role="tablist" aria-label="Blog categories">
          {categories.map((item) => (
            <button key={item} type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      {visible.length ? (
        <div className="grid three">
          {visible.map((post) => (
            <article className="blog-card card" key={post.slug}>
              <span className="tag">{post.category}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <dl>
                <div><dt>Author</dt><dd>{post.author}</dd></div>
                <div><dt>Date</dt><dd>{post.date}</dd></div>
                <div><dt>Reading time</dt><dd>{post.readingTime}</dd></div>
              </dl>
              <div className="button-row">
                <Link className="btn btn-secondary" href={`/blog#${post.slug}`}>
                  Read Outline
                </Link>
                <button type="button" className="btn btn-ghost" onClick={() => navigator.share?.({ title: post.title, url: `${window.location.origin}/blog#${post.slug}` })}>
                  <Share2 size={16} aria-hidden="true" /> Share
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <h3>No search results.</h3>
          <p>Try a different keyword or category.</p>
        </div>
      )}
    </div>
  );
}
