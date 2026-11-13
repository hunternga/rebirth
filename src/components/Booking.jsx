import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from './ContactForm.jsx';
import { contact, whatsappLink } from '../data.js';
import { WhatsAppIcon } from './Icons.jsx';

const BookingContext = createContext(() => {});

// Opens the booking pop-up. Pass `{ goal, category }` to pre-fill the form.
export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [state, setState] = useState(null); // null = closed, else { initial, id }
  const { pathname } = useLocation();

  const open = useCallback((initial = {}) => {
    setState((s) => ({ initial, id: (s?.id || 0) + 1 }));
  }, []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => setState(null), [pathname]);

  return (
    <BookingContext.Provider value={open}>
      {children}
      {state && <BookingModal key={state.id} initial={state.initial} onClose={close} />}
    </BookingContext.Provider>
  );
}

// A button that opens the booking pop-up, styled however the caller likes.
export function BookButton({ prefill, children, className = 'btn btn--primary', onClick, ...rest }) {
  const open = useBooking();
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => { onClick?.(e); open(prefill); }}
      aria-haspopup="dialog"
      {...rest}
    >
      {children}
    </button>
  );
}

function BookingModal({ initial, onClose }) {
  const dialogRef = useRef(null);
  const returnFocus = useRef(typeof document !== 'undefined' ? document.activeElement : null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the first field once the pop-up is in place.
    const t = setTimeout(() => dialogRef.current?.querySelector('input, select, textarea, button')?.focus(), 60);

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // Keep keyboard focus inside the pop-up.
      if (e.key === 'Tab' && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll('a[href], button, input, select, textarea');
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="booking" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div
        ref={dialogRef}
        className="booking__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button type="button" className="booking__close" onClick={onClose} aria-label="Close booking form">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>

        <aside className="booking__side">
          <img src="/logo.png" alt="" className="booking__logo" />
          <p className="eyebrow">Book a consultation</p>
          <h2 id="booking-title" className="booking__title">Start your <span>rebirth</span></h2>
          <ol className="booking__steps">
            <li><span>1</span>Fill in your details</li>
            <li><span>2</span>Send it on WhatsApp</li>
            <li><span>3</span>Get your consultation date</li>
          </ol>
          <ul className="booking__fees">
            <li><strong>₹300</strong> Standard</li>
            <li><strong>₹100</strong> EWS</li>
            <li><strong>Free</strong> Specially abled</li>
          </ul>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="booking__wa">
            <WhatsAppIcon size={18} /> Prefer to chat? {contact.whatsappDisplay}
          </a>
        </aside>

        <div className="booking__form">
          <ContactForm initial={initial} bare />
        </div>
      </div>
    </div>
  );
}
