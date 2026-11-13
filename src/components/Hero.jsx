import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { focusAreas, stats, team, trust, whatsappLink } from '../data.js';
import HeroCarousel from './HeroCarousel.jsx';
import { WhatsAppIcon } from './Icons.jsx';
import { BookButton } from './Booking.jsx';

const words = ['body', 'skin', 'hair', 'strength', 'health'];
const tickerItems = [...focusAreas, ...trust];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);
  const spotRef = useRef(null);

  // Track whether the hero is on screen so its animations can pause while scrolling below it.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [visible]);

  // Cursor spotlight. Transform-only, batched per frame.
  useEffect(() => {
    if (!canHover() || reducedMotion()) return;
    const hero = ref.current;
    let frame = 0;
    let last = null;

    const apply = () => {
      frame = 0;
      if (!last || !spotRef.current) return;
      const r = hero.getBoundingClientRect();
      spotRef.current.style.transform = `translate3d(${last.x - r.left}px, ${last.y - r.top}px, 0)`;
    };
    const onMove = (e) => {
      last = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    hero.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <section ref={ref} className={`hero ${visible ? '' : 'is-offscreen'}`}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__orb hero__orb--3" />
        <span className="hero__noise" />
        <span ref={spotRef} className="hero__spotlight" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__pill reveal" style={{ '--d': '0s' }}>
            <span className="hero__pill-tag">New</span>
            Online consultations worldwide
            <span className="hero__pulse" aria-hidden="true" />
          </p>

          <h1 className="hero__title">
            <span className="hero__line">
              {['Time', 'to', 'be'].map((w, i) => (
                <span key={w} className="word-up" style={{ '--d': `${0.08 + i * 0.09}s` }}>{w}</span>
              ))}
            </span>
            <span className="hero__accent-wrap word-up" style={{ '--d': '.38s' }}>
              <span className="hero__accent">born again.</span>
              <svg className="hero__swoosh" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 18 C 70 6, 170 4, 296 14" />
              </svg>
            </span>
          </h1>

          <p className="hero__rotator reveal" style={{ '--d': '.5s' }}>
            Rebuild your{' '}
            <span className="hero__word-box">
              <span className="hero__word" key={words[index]}>{words[index]}</span>
            </span>
            <span className="sr-only">, from the inside out.</span>
          </p>

          <p className="hero__lead reveal" style={{ '--d': '.6s' }}>
            Scientifically designed, personalized wellness programs by Dr. Isacc Abbas and a
            multidisciplinary panel of medical experts — est. 2019 in Mumbai, now helping patients
            worldwide.
          </p>

          <div className="hero__cta reveal" style={{ '--d': '.7s' }}>
            <BookButton className="btn btn--primary btn--lg btn--shine">
              Book Consultation
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </BookButton>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn--glass btn--lg">
              <WhatsAppIcon size={18} />
              WhatsApp us
            </a>
          </div>

          <div className="hero__proof reveal" style={{ '--d': '.8s' }}>
            <Link to="/team" className="hero__panel">
              <span className="avatars">
                {team.slice(0, 4).map((d) => <img key={d.name} src={d.photo} alt="" />)}
                <span className="avatars__more">+{team.length - 4}</span>
              </span>
              <span>
                <strong>{team.length} doctors</strong>
                <small>review every case</small>
              </span>
            </Link>
            <span className="hero__divider" aria-hidden="true" />
            <div className="hero__rating">
              <strong>5,000+</strong>
              <small>patients worldwide</small>
            </div>
          </div>
        </div>

        <div className="hero__media reveal" style={{ '--d': '.3s' }}>
          <HeroCarousel />
        </div>
      </div>

      <div className="container">
        <dl className="stats reveal" style={{ '--d': '.9s' }}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt><CountUp value={value} /></dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#below-hero" className="scroll-cue" aria-label="Scroll to explore">
        <span className="scroll-cue__mouse"><span /></span>
        Scroll to explore
      </a>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i}>{t}<i>✦</i></span>
          ))}
        </div>
      </div>
      <span id="below-hero" />
    </section>
  );
}

// Counts a stat like "5,000+" or "2M+" up from zero the first time it scrolls into view.
// Years (e.g. "2019") are shown as-is.
function CountUp({ value }) {
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, '')) : NaN;
  const suffix = match ? match[2] : '';
  const isYear = !suffix && target >= 1900 && target <= 2100;
  const [shown, setShown] = useState(isYear || Number.isNaN(target) ? value : `0${suffix}`);
  const ref = useRef(null);

  useEffect(() => {
    if (isYear || Number.isNaN(target)) return;
    if (reducedMotion()) { setShown(value); return; }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1600;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const n = Math.round(target * eased);
        setShown(t < 1 ? `${n.toLocaleString('en-US')}${suffix}` : value);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, target, suffix, isYear]);

  return <span ref={ref}>{shown}</span>;
}
