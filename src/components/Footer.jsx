import { Link } from 'react-router-dom';
import { contact, navLinks, services, whatsappLink } from '../data.js';
import { InstagramIcon, MailIcon, WhatsAppIcon, YouTubeIcon } from './Icons.jsx';

const socialIcon = (label) => (label.startsWith('YouTube') ? <YouTubeIcon /> : <InstagramIcon />);
const socialClass = (label) => (label.startsWith('YouTube') ? 'is-yt' : 'is-ig');

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="brand">
            <img src="/logo.png" alt="Rebirth Fitness School logo" className="brand__logo" width="32" height="32" />
            <span><em>Rebirth</em> Fitness School</span>
          </Link>
          <p className="muted footer__about">
            Scientifically designed, personalized wellness programs by Dr. Isacc Abbas and a
            multidisciplinary panel of medical experts. Est. 2019 · Mumbai, India.
          </p>
          <p className="footer__follow">Follow us</p>
          <div className="footer__social">
            {contact.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`social-dot ${socialClass(s.label)}`}
                aria-label={`${s.label} ${s.handle}`}
                title={`${s.label} · ${s.handle}`}
              >
                {socialIcon(s.label)}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {navLinks.map(([label, path]) => <li key={path}><Link to={path}>{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>Programs</h4>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services#${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul className="footer__connect">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <span className="mini-icon is-wa"><WhatsAppIcon size={16} /></span>
                <span><strong>WhatsApp</strong>{contact.whatsappDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <span className="mini-icon is-mail"><MailIcon size={16} /></span>
                <span><strong>Email</strong>{contact.email}</span>
              </a>
            </li>
            <li>
              <span className="footer__connect-item">
                <span className="mini-icon is-pin"><PinIcon /></span>
                <span><strong>Location</strong>{contact.location}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__legal">
        <p className="muted">© {new Date().getFullYear()} Rebirth Fitness School · Dr. Isacc Abbas. All rights reserved.</p>
        <p className="muted">Consultations are advisory &amp; lifestyle-focused. Not a substitute for emergency medical care.</p>
      </div>
    </footer>
  );
}
