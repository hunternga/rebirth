import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import WhatsAppFab from './WhatsAppFab.jsx';
import WelcomeFab from './WelcomeFab.jsx';
import { navLinks } from '../data.js';

const titles = Object.fromEntries(navLinks.map(([label, path]) => [path, label]));

export default function Layout() {
  const { pathname, hash } = useLocation();

  // Scroll to the top on page change, or to the #section when a hash is given.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Jump (not glide) to the top when opening a new page.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  useEffect(() => {
    if (pathname.startsWith('/blog/')) return; // article pages set their own title
    const page = titles[pathname];
    document.title = page && page !== 'Home'
      ? `${page} · Rebirth Fitness School`
      : 'Rebirth Fitness School – Dr. Isacc Abbas';
  }, [pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WelcomeFab />
      <WhatsAppFab />
    </>
  );
}
