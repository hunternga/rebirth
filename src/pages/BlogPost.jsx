import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { author, formatDate, posts, relatedPosts } from '../blog.js';
import { whatsappLink } from '../data.js';
import { BookButton } from '../components/Booking.jsx';
import BlogCard from '../components/BlogCard.jsx';
import ReadingTools, { SIZES, loadPrefs } from '../components/ReadingTools.jsx';
import NotFound from './NotFound.jsx';

const LEADING = { normal: 1.8, relaxed: 2.05, loose: 2.35 };

// Give each <h2> an id so the table of contents can link to it.
function withHeadingIds(html) {
  const headings = [];
  const out = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = `s${headings.length + 1}`;
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

export default function BlogPost() {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const meta = posts[index];
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  const [article, setArticle] = useState(null);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [prefs, setPrefs] = useState(loadPrefs);
  const contentRef = useRef(null);
  const rulerRef = useRef(null);

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    setArticle(null);
    setError(false);
    setActiveId(null);
    fetch(`/blog/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => { if (!cancelled) setArticle(data); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [slug, meta]);

  useEffect(() => {
    if (meta) document.title = `${meta.title} · Rebirth Fitness School`;
  }, [meta]);

  // Reading progress (measured over the article body, not the whole page).
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const read = Math.min(Math.max(-rect.top + window.innerHeight * 0.3, 0), Math.max(total, 1));
      setProgress(total > 0 ? read / total : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [article, prefs]);

  const body = useMemo(() => (article ? withHeadingIds(article.html) : null), [article]);

  // Highlight the section currently being read in the table of contents.
  useEffect(() => {
    if (!body || !contentRef.current) return;
    const heads = contentRef.current.querySelectorAll('h2[id]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [body]);

  // Reading guide: a highlight band that follows the pointer.
  useEffect(() => {
    if (!prefs.ruler) return;
    const move = (e) => {
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      if (rulerRef.current) rulerRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('touchmove', move);
    };
  }, [prefs.ruler]);

  if (!meta) return <NotFound />;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const minutesLeft = Math.max(0, Math.ceil(meta.readMinutes * (1 - progress)));
  const readerStyle = {
    '--reader-scale': SIZES[prefs.size] ?? 1,
    '--reader-leading': LEADING[prefs.spacing] ?? 1.8,
  };

  return (
    <>
      <div className="read-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {prefs.ruler && <div ref={rulerRef} className="reading-ruler" aria-hidden="true" />}

      <header className={`article-hero ${prefs.focus ? 'article-hero--compact' : ''}`}>
        {meta.image && <img className="article-hero__img" src={meta.image} alt="" />}
        <div className="article-hero__shade" aria-hidden="true" />
        <div className="container article-hero__inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span>{' '}
            <Link to="/blog">Blog</Link> <span aria-hidden="true">/</span> <span>{meta.category}</span>
          </nav>
          <span className="post-card__cat post-card__cat--static">{meta.category}</span>
          <h1 className="article-hero__title">{meta.title}</h1>
          <div className="article-meta">
            <span className="article-meta__author">
              <img src={author.photo} alt="" />
              <span>
                <strong>{author.name}</strong>
                <small>{author.role}</small>
              </span>
            </span>
            <span className="article-meta__item"><small>Published</small><strong>{formatDate(meta.date)}</strong></span>
            <span className="article-meta__item"><small>Reading time</small><strong>{meta.readMinutes} min</strong></span>
            <span className="article-meta__item"><small>Reviewed by</small><strong>Full Medical Panel</strong></span>
          </div>
        </div>
      </header>

      <section className="section section--article">
        <div className={`container article-layout ${prefs.focus ? 'is-focus' : ''}`}>
          <div className="article-main">
            <ReadingTools
              key={slug}
              prefs={prefs}
              setPrefs={setPrefs}
              contentRef={contentRef}
              minutesLeft={body ? minutesLeft : 0}
            />

            <article
              className={`prose reader reader--${prefs.contrast} ${prefs.font === 'readable' ? 'reader--readable' : ''}`}
              style={readerStyle}
            >
              {error && (
                <p className="muted">
                  Sorry, this article couldn't be loaded. <Link to="/blog" className="link">Back to all articles</Link>
                </p>
              )}
              {!error && !body && (
                <div className="prose-skeleton" aria-label="Loading article">
                  <span /><span /><span /><span />
                </div>
              )}
              {body && <div ref={contentRef} dangerouslySetInnerHTML={{ __html: body.html }} />}

              <p className="article-note">
                This article is for educational purposes only and is not a substitute for personal
                medical advice. If you have a medical condition, please consult a doctor before making
                changes. For guidance specific to you,{' '}
                <BookButton className="link-btn">book a consultation</BookButton>.
              </p>
            </article>

            <nav className="post-nav" aria-label="More articles">
              {older ? (
                <Link to={`/blog/${older.slug}`} className="card post-nav__link">
                  {older.image && <img src={older.image} alt="" loading="lazy" />}
                  <span>
                    <small>← Previous article</small>
                    <strong>{older.title}</strong>
                  </span>
                </Link>
              ) : <span />}
              {newer ? (
                <Link to={`/blog/${newer.slug}`} className="card post-nav__link post-nav__link--next">
                  <span>
                    <small>Next article →</small>
                    <strong>{newer.title}</strong>
                  </span>
                  {newer.image && <img src={newer.image} alt="" loading="lazy" />}
                </Link>
              ) : <span />}
            </nav>
          </div>

          {!prefs.focus && (
            <aside className="article-aside">
              <div className="article-aside__sticky">
                {body && body.headings.length > 1 && (
                  <div className="card aside-card">
                    <h4>In this article</h4>
                    <ol className="toc">
                      {body.headings.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`} className={activeId === h.id ? 'is-active' : ''}>{h.text}</a>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="card aside-card">
                  <h4>Share</h4>
                  <div className="share-row">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`${meta.title} — ${url}`)}`} target="_blank" rel="noreferrer">WhatsApp</a>
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(meta.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">X</a>
                    <button type="button" onClick={copy}>{copied ? 'Copied!' : 'Copy link'}</button>
                  </div>
                </div>

                <div className="card aside-card aside-card--cta">
                  <h4>Need a personal plan?</h4>
                  <p>Get a protocol reviewed by our full medical panel — from ₹0 to ₹300.</p>
                  <a href={whatsappLink(`Hi! I read "${meta.title}" and would like to book a consultation.`)} target="_blank" rel="noreferrer" className="btn btn--dark btn--block">
                    Book on WhatsApp
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="section__head">
            <p className="eyebrow">Keep reading</p>
            <h2 className="section__title">Related articles</h2>
          </div>
          <div className="grid grid--3">
            {relatedPosts(meta).map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
          <p className="center"><Link to="/blog" className="btn btn--ghost">View all articles</Link></p>
        </div>
      </section>
    </>
  );
}
