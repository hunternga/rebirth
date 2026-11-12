import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'rebirth-reading';
export const defaultPrefs = {
  size: 2, // index into SIZES
  spacing: 'normal',
  font: 'default',
  contrast: 'default',
  focus: false,
  ruler: false,
};
export const SIZES = [0.9, 1, 1.15, 1.3, 1.5];
const SIZE_LABELS = ['Small', 'Normal', 'Large', 'Larger', 'Largest'];
const RATES = [0.75, 1, 1.25, 1.5];

export function loadPrefs() {
  try {
    return { ...defaultPrefs, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return defaultPrefs;
  }
}

function savePrefs(p) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch { /* storage unavailable */ }
}

// Loads the Atkinson Hyperlegible font (designed for low-vision readers) only when chosen.
function ensureReadableFont() {
  if (document.getElementById('font-atkinson')) return;
  const link = document.createElement('link');
  link.id = 'font-atkinson';
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';
  document.head.appendChild(link);
}

export default function ReadingTools({ prefs, setPrefs, contentRef, minutesLeft }) {
  const [panel, setPanel] = useState(false);
  const speech = useSpeech(contentRef);
  const panelRef = useRef(null);

  const update = (patch) => {
    const next = { ...prefs, ...patch };
    if (next.font === 'readable') ensureReadableFont();
    setPrefs(next);
    savePrefs(next);
  };

  useEffect(() => {
    if (prefs.font === 'readable') ensureReadableFont();
  }, [prefs.font]);

  // Close the options panel on outside click / Escape.
  useEffect(() => {
    if (!panel) return;
    const onDown = (e) => { if (!panelRef.current?.contains(e.target)) setPanel(false); };
    const onKey = (e) => { if (e.key === 'Escape') setPanel(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  const sizeDown = () => update({ size: Math.max(0, prefs.size - 1) });
  const sizeUp = () => update({ size: Math.min(SIZES.length - 1, prefs.size + 1) });

  return (
    <div className="reader-bar" ref={panelRef}>
      <div className="reader-bar__row">
        {speech.supported && (
          <div className="reader-group">
            {speech.state === 'idle' ? (
              <button type="button" className="reader-btn reader-btn--primary" onClick={speech.play}>
                <Icon d="M8 5.5v13l11-6.5z" fill /> Listen
              </button>
            ) : (
              <>
                <button type="button" className="reader-btn reader-btn--primary" onClick={speech.state === 'playing' ? speech.pause : speech.resume}>
                  {speech.state === 'playing'
                    ? <><Icon d="M7 5h3v14H7zM14 5h3v14h-3z" fill /> Pause</>
                    : <><Icon d="M8 5.5v13l11-6.5z" fill /> Resume</>}
                </button>
                <button type="button" className="reader-btn" onClick={speech.stop} aria-label="Stop reading aloud">
                  <Icon d="M6 6h12v12H6z" fill />
                </button>
              </>
            )}
            <button
              type="button"
              className="reader-btn reader-btn--small"
              onClick={() => speech.setRate(RATES[(RATES.indexOf(speech.rate) + 1) % RATES.length])}
              aria-label={`Reading speed ${speech.rate}x, change`}
              title="Reading speed"
            >
              {speech.rate}x
            </button>
          </div>
        )}

        <div className="reader-group" role="group" aria-label="Text size">
          <button type="button" className="reader-btn" onClick={sizeDown} disabled={prefs.size === 0} aria-label="Smaller text">A−</button>
          <span className="reader-size" aria-live="polite">{Math.round(SIZES[prefs.size] * 100)}%</span>
          <button type="button" className="reader-btn reader-btn--big" onClick={sizeUp} disabled={prefs.size === SIZES.length - 1} aria-label="Larger text">A+</button>
        </div>

        <button
          type="button"
          className={`reader-btn ${prefs.focus ? 'is-on' : ''}`}
          onClick={() => update({ focus: !prefs.focus })}
          aria-pressed={prefs.focus}
        >
          <Icon d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" /> Focus
        </button>

        <button
          type="button"
          className={`reader-btn ${panel ? 'is-on' : ''}`}
          onClick={() => setPanel((o) => !o)}
          aria-expanded={panel}
          aria-controls="reader-panel"
        >
          <Icon d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M16 4v4M10 10v4M18 16v4" /> Reading options
        </button>

        {minutesLeft > 0 && <span className="reader-left">{minutesLeft} min left</span>}
      </div>

      {panel && (
        <div className="reader-panel" id="reader-panel" role="dialog" aria-label="Reading options">
          <Option label="Text size">
            {SIZE_LABELS.map((l, i) => (
              <Chip key={l} on={prefs.size === i} onClick={() => update({ size: i })}>{l}</Chip>
            ))}
          </Option>
          <Option label="Line spacing">
            {[['normal', 'Normal'], ['relaxed', 'Relaxed'], ['loose', 'Extra']].map(([v, l]) => (
              <Chip key={v} on={prefs.spacing === v} onClick={() => update({ spacing: v })}>{l}</Chip>
            ))}
          </Option>
          <Option label="Font" hint="Easy-read is designed for low vision and dyslexia.">
            <Chip on={prefs.font === 'default'} onClick={() => update({ font: 'default' })}>Default</Chip>
            <Chip on={prefs.font === 'readable'} onClick={() => update({ font: 'readable' })}>
              <span style={{ fontFamily: "'Atkinson Hyperlegible', sans-serif" }}>Easy-read</span>
            </Chip>
          </Option>
          <Option label="Colours" hint="High contrast helps low vision; sepia is gentler on tired eyes.">
            {[['default', 'Default'], ['contrast', 'High contrast'], ['sepia', 'Sepia']].map(([v, l]) => (
              <Chip key={v} on={prefs.contrast === v} onClick={() => update({ contrast: v })} className={`swatch swatch--${v}`}>{l}</Chip>
            ))}
          </Option>
          <Option label="Helpers">
            <Chip on={prefs.ruler} onClick={() => update({ ruler: !prefs.ruler })}>Reading guide</Chip>
            <Chip on={prefs.focus} onClick={() => update({ focus: !prefs.focus })}>Focus mode</Chip>
            <Chip onClick={() => window.print()}>Print / Save PDF</Chip>
          </Option>
          <div className="reader-panel__foot">
            <button type="button" className="link" onClick={() => update(defaultPrefs)}>Reset to default</button>
            <button type="button" className="btn btn--primary btn--sm" onClick={() => setPanel(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Option({ label, hint, children }) {
  return (
    <div className="reader-option">
      <div className="reader-option__label">
        <strong>{label}</strong>
        {hint && <small>{hint}</small>}
      </div>
      <div className="reader-option__chips">{children}</div>
    </div>
  );
}

function Chip({ on, onClick, children, className = '' }) {
  return (
    <button type="button" className={`reader-chip ${className} ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

function Icon({ d, fill = false }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
      fill={fill ? 'currentColor' : 'none'} stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

// Reads the article aloud block by block, highlighting the current paragraph.
function useSpeech(contentRef) {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [state, setState] = useState('idle'); // idle | playing | paused
  const [rate, setRateState] = useState(1);
  const blocks = useRef([]);
  const index = useRef(0);
  const rateRef = useRef(1);
  const active = useRef(false);
  // Each utterance gets a token; cancel() fires 'end' on the old one, which must not advance.
  const token = useRef(0);

  const clearHighlight = () => {
    blocks.current.forEach((el) => el.classList.remove('is-speaking'));
  };

  const speakFrom = (i) => {
    if (!active.current) return;
    clearHighlight();
    const el = blocks.current[i];
    if (!el) { stop(); return; }
    index.current = i;
    el.classList.add('is-speaking');
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    const my = ++token.current;
    const u = new SpeechSynthesisUtterance(el.textContent);
    u.rate = rateRef.current;
    u.lang = 'en-IN';
    u.onend = () => { if (active.current && token.current === my) speakFrom(i + 1); };
    window.speechSynthesis.speak(u);
  };

  const play = () => {
    if (!supported || !contentRef.current) return;
    window.speechSynthesis.cancel();
    blocks.current = Array.from(contentRef.current.querySelectorAll('h2, h3, p, li'))
      .filter((el) => el.textContent.trim());
    active.current = true;
    setState('playing');
    speakFrom(0);
  };
  const pause = () => { window.speechSynthesis.pause(); setState('paused'); };
  const resume = () => { window.speechSynthesis.resume(); setState('playing'); };
  function stop() {
    active.current = false;
    token.current++;
    if (supported) window.speechSynthesis.cancel();
    clearHighlight();
    setState('idle');
  }
  const setRate = (r) => {
    rateRef.current = r;
    setRateState(r);
    // Restart the current paragraph at the new speed.
    if (active.current && state === 'playing') {
      token.current++;
      window.speechSynthesis.cancel();
      speakFrom(index.current);
    }
  };

  // Stop speaking when leaving the article.
  useEffect(() => () => { active.current = false; if (supported) window.speechSynthesis.cancel(); }, [supported]);

  return { supported, state, rate, play, pause, resume, stop, setRate };
}
