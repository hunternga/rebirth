import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLinks } from '../data.js';
import ThemeToggle from './ThemeToggle.jsx';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`nav ${scrolled || open ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="brand">
          <img src="/logo.png" alt="Rebirth Fitness School logo" className="brand__logo" width="36" height="36" />
          <span className="brand__text">
            <span className="brand__name"><em>Rebirth</em> Fitness School</span>
            <small>Time to be born again</small>
          </span>
        </Link>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {navLinks.map(([label, path]) => (
            <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>
          ))}
          <Link to="/contact" className="btn btn--primary btn--sm">Book Consultation</Link>
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <button
            className="nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
