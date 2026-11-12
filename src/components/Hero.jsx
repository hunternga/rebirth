import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { focusAreas, stats, team, trust, whatsappLink } from '../data.js';
import HeroCarousel from './HeroCarousel.jsx';

const words = ['body', 'skin', 'hair', 'strength', 'health'];
const tickerItems = [...focusAreas, ...trust];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef(null);

  // Track whether the hero is on screen so its animations can pause while scrolling below it.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [visible]);

  return (
    <section ref={ref} className={`hero ${visible ? '' : 'is-offscreen'}`}>
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__orb hero__orb--3" />
        <span className="hero__noise" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__pill reveal" style={{ '--d': '0s' }}>
            <span className="hero__pill-tag">New</span>
            Online consultations worldwide
            <span className="hero__pulse" aria-hidden="true" />
          </p>

          <h1 className="hero__title reveal" style={{ '--d': '.1s' }}>
            Time to be
            <span className="hero__accent">born again.</span>
          </h1>

          <p className="hero__rotator reveal" style={{ '--d': '.2s' }}>
            Rebuild your{' '}
            <span className="hero__word-box">
              <span className="hero__word" key={words[index]}>{words[index]}</span>
            </span>
            <span className="sr-only">, from the inside out.</span>
          </p>

          <p className="hero__lead reveal" style={{ '--d': '.3s' }}>
            Scientifically designed, personalized wellness programs by Dr. Isacc Abbas and a
            multidisciplinary panel of medical experts — est. 2019 in Mumbai, now helping patients
            worldwide.
          </p>

          <div className="hero__cta reveal" style={{ '--d': '.4s' }}>
            <Link to="/contact" className="btn btn--primary btn--lg">
              Book Consultation
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn--glass btn--lg">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.3z" />
              </svg>
              WhatsApp us
            </a>
          </div>

          <div className="hero__proof reveal" style={{ '--d': '.5s' }}>
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

        <div className="hero__media reveal" style={{ '--d': '.2s' }}>
          <HeroCarousel />
        </div>
      </div>

      <div className="container">
        <dl className="stats reveal" style={{ '--d': '.6s' }}>
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i}>{t}<i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}
