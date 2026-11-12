import { useMemo, useState } from 'react';
import { categories, posts } from '../blog.js';
import PageHeader from '../components/PageHeader.jsx';
import BlogCard from '../components/BlogCard.jsx';
import CtaBand from '../components/CtaBand.jsx';

const PAGE = 12;

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    );
  }, [category, query]);

  const browsing = category === 'All' && !query.trim();
  const [featured, ...rest] = filtered;
  const list = browsing ? rest : filtered;

  const pick = (c) => { setCategory(c); setShown(PAGE); };

  return (
    <>
      <PageHeader
        crumb="Blog"
        eyebrow="Dr. Isacc Abbas Pedia"
        title={<>Wellness insights, <span>backed by science</span></>}
        lead="Evidence-based health information on diseases, medications, skincare, hair care, nutrition, fitness and preventive healthcare — supported by peer-reviewed journals, meta-analyses, review articles and standard medical textbooks."
      />

      <section className="section">
        <div className="container">
          <div className="blog-tools">
            <label className="blog-search">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                placeholder={`Search ${posts.length} articles…`}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }}
              />
            </label>
            <div className="blog-cats" role="tablist" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={c === category}
                  className={`blog-cat ${c === category ? 'is-active' : ''}`}
                  onClick={() => pick(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="blog-empty muted">No articles match “{query}”. Try another word or category.</p>
          ) : (
            <>
              {browsing && featured && (
                <div className="blog-featured">
                  <BlogCard post={featured} featured />
                </div>
              )}
              <p className="blog-count muted">
                {browsing ? 'More articles' : `${filtered.length} article${filtered.length === 1 ? '' : 's'}`}
              </p>
              <div className="grid grid--3 blog-grid">
                {list.slice(0, shown).map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
              {shown < list.length && (
                <p className="center">
                  <button type="button" className="btn btn--ghost" onClick={() => setShown((n) => n + PAGE)}>
                    Load more articles ({list.length - shown} left)
                  </button>
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBand
        title="Want advice tailored to you?"
        text="Articles inform — a personalized protocol transforms. Book a consultation with our medical panel."
      />
    </>
  );
}
