import { useRef, useState } from 'react';
import { heroSlides } from '../data.js';

// Each progress bar animates for the slide duration; when the active bar
// finishes, we advance. Hover pauses the CSS animation, so it pauses autoplay too.
export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const count = heroSlides.length;

  const go = (i) => setIndex((i + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const slide = heroSlides[index];

  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Rebirth highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel__viewport">
        {heroSlides.map((s, i) => (
          <figure
            key={s.src}
            className={`carousel__slide ${i === index ? 'is-active' : ''} ${s.fit === 'contain' ? 'carousel__slide--contain' : ''}`}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            style={s.fit === 'contain' ? { '--bg-img': `url(${s.src})` } : undefined}
          >
            <img
              src={s.src}
              alt={s.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              style={s.position ? { objectPosition: s.position } : undefined}
            />
            {s.beforeAfter && (
              <>
                <span className="ba ba--before">Before</span>
                <span className="ba ba--after">After</span>
              </>
            )}
          </figure>
        ))}

        <div className="carousel__progress">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              className={`carousel__bar ${i < index ? 'is-done' : ''} ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
            >
              <span onAnimationEnd={i === index ? next : undefined} key={i === index ? `a${index}` : i} />
            </button>
          ))}
        </div>

        <div className="carousel__caption" key={index} aria-live="polite">
          <span className="carousel__tag">{slide.tag}</span>
          <h3>{slide.title}</h3>
          <p>{slide.text}</p>
        </div>
      </div>

      <div className="carousel__controls">
        <span className="carousel__count">
          <b>{String(index + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
        </span>
        <div className="carousel__thumbs">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className={`carousel__thumb ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i)}
            >
              <img src={s.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
        <div className="carousel__arrows">
          <button type="button" onClick={prev} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" onClick={next} aria-label="Next slide">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
