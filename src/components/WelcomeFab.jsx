import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const GREETINGS = [
  { text: 'Welcome', lang: 'en' },
  { text: 'வணக்கம்', lang: 'ta' },
  { text: 'स्वागत है', lang: 'hi' },
];

// Split into user-visible characters so Tamil/Hindi vowel signs aren't broken apart while typing.
const graphemes = (s) =>
  typeof Intl !== 'undefined' && Intl.Segmenter
    ? Array.from(new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(s), (g) => g.segment)
    : Array.from(s);
const SPLIT = GREETINGS.map((g) => graphemes(g.text));

const SEEN_KEY = 'rebirth-welcome-seen';
const links = [
  { to: '/contact', label: 'Book a consultation', icon: 'M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z' },
  { to: '/testimonials', label: 'Watch success stories', icon: 'M8 5.5v13l11-6.5z' },
  { to: '/blog', label: 'Read health articles', icon: 'M4 5h16M4 10h16M4 15h10M4 20h7' },
];

// Floating welcome button (bottom-left), mirroring the WhatsApp button on the right.
export default function WelcomeFab() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const touched = useRef(false);

  // Pop the greeting open once per visit, then tuck it away if the visitor ignores it.
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* storage unavailable */ }
    if (seen) return;
    const show = setTimeout(() => {
      setOpen(true);
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage unavailable */ }
    }, 1800);
    const hide = setTimeout(() => { if (!touched.current) setOpen(false); }, 14000);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const toggle = () => {
    touched.current = true;
    setOpen((o) => !o);
  };

  return (
    <div className={`welcome-fab ${open ? 'is-open' : ''}`} onPointerEnter={() => { touched.current = true; }}>
      {open && (
        <div className="welcome-card" role="dialog" aria-label="Welcome to Rebirth Fitness School">
          <button type="button" className="welcome-card__close" onClick={() => setOpen(false)} aria-label="Close welcome message">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <p className="welcome-card__hello">
            <span className="sr-only">Welcome to Rebirth Fitness School</span>
            <span aria-hidden="true"><TypedGreeting /> <span className="welcome-card__to">to Rebirth!</span></span>
          </p>
          <p className="welcome-card__text">
            Rebuild your health with a personalized protocol from our panel of 8 doctors.
          </p>
          <ul className="welcome-card__links">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>
                  <span className="welcome-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="16" height="16"><path d={l.icon} /></svg>
                  </span>
                  {l.label}
                  <span className="welcome-card__arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="button"
        className="welcome-fab__btn"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? 'Close welcome message' : 'Open welcome message'}
      >
        <span className="welcome-fab__hand" aria-hidden="true">👋</span>
      </button>
    </div>
  );
}

// Types "Welcome", then the Tamil and Hindi greetings, in a loop.
function TypedGreeting() {
  const [g, setG] = useState(0);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | hold | deleting
  const [still, setStill] = useState(false);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (still) return;
    const chars = SPLIT[g];
    let delay;
    let step;
    if (phase === 'typing') {
      delay = 110;
      step = () => (count < chars.length ? setCount(count + 1) : setPhase('hold'));
    } else if (phase === 'hold') {
      delay = 1800;
      step = () => setPhase('deleting');
    } else {
      delay = 55;
      step = () => {
        if (count > 0) setCount(count - 1);
        else {
          setG((g + 1) % GREETINGS.length);
          setPhase('typing');
        }
      };
    }
    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [still, g, count, phase]);

  return (
    <>
      <span className="welcome-card__word" lang={GREETINGS[g].lang}>
        {still ? GREETINGS[0].text : SPLIT[g].slice(0, count).join('')}
      </span>
      {!still && <span className={`welcome-card__caret ${phase === 'hold' ? 'is-blink' : ''}`} />}
    </>
  );
}
