import { Link } from 'react-router-dom';
import { fees, focusAreas, services, steps, team } from '../data.js';
import Hero from '../components/Hero.jsx';
import SectionHead from '../components/SectionHead.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import CtaBand from '../components/CtaBand.jsx';
import VideoGallery from '../components/VideoGallery.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { posts } from '../blog.js';

export default function Home() {
  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Science-backed transformation</p>
            <h2 className="section__title">One protocol. Every expert.</h2>
            <p className="muted">
              From muscle building and weight loss to hair health and skin rejuvenation — our
              multidisciplinary panel builds a protocol uniquely yours, reviewed by every expert
              before it reaches you.
            </p>
            <ul className="chips">
              {focusAreas.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <Link to="/about" className="link">Read our story →</Link>
          </div>
          <div className="highlight-grid">
            <div className="card highlight"><strong>8</strong><span>Doctors review every case</span></div>
            <div className="card highlight"><strong>3</strong><span>Ways to consult — video, audio or messaging</span></div>
            <div className="card highlight"><strong>₹100</strong><span>Subsidised fee for EWS patients</span></div>
            <div className="card highlight"><strong>Free</strong><span>For all specially abled people</span></div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Services" title="Holistic programs for every wellness goal">
            Every program is scientifically designed, personalized, and monitored by our panel.
          </SectionHead>
          <div className="grid grid--3">
            {services.map((s) => (
              <Link key={s.slug} to={`/services#${s.slug}`} className="card program">
                <ServiceIcon path={s.icon} />
                <h3>{s.title}</h3>
                <p className="muted">{s.short}</p>
                <span className="link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process preview */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it works" title="Five steps to your personalized protocol" />
          <ol className="timeline-row">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
              </li>
            ))}
          </ol>
          <p className="center">
            <Link to="/process" className="btn btn--ghost">See the full process</Link>
          </p>
        </div>
      </section>

      {/* Team preview */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="The panel" title="Our multidisciplinary medical experts" />
          <div className="grid grid--4">
            {team.slice(0, 4).map((d) => (
              <Link key={d.name} to="/team" className="card doctor">
                <div className="doctor__photo">
                  <img src={d.photo} alt={d.name} loading="lazy" />
                </div>
                <span className="tag">{d.role}</span>
                <h3>{d.name}</h3>
                <p className="doctor__creds">{d.creds}</p>
              </Link>
            ))}
          </div>
          <p className="center">
            <Link to="/team" className="btn btn--ghost">Meet all {team.length} doctors</Link>
          </p>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="section section--glow">
        <div className="container">
          <SectionHead eyebrow="Video testimonials" title="Real people. Real rebirths.">
            Hear it straight from our patients — tap a story to watch with sound.
          </SectionHead>
          <VideoGallery />
          <p className="center">
            <Link to="/testimonials" className="btn btn--ghost">See all success stories</Link>
          </p>
        </div>
      </section>

      {/* Blog preview */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Dr. Isacc Abbas Pedia" title="Latest from the blog">
            Evidence-based answers to the health questions everyone is asking.
          </SectionHead>
          <div className="grid grid--3">
            {posts.slice(0, 3).map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
          <p className="center">
            <Link to="/blog" className="btn btn--ghost">Read all {posts.length} articles</Link>
          </p>
        </div>
      </section>

      {/* Fees preview */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Fees" title="Wellness for everyone">
            World-class wellness, accessible regardless of economic status.
          </SectionHead>
          <div className="grid grid--3">
            {fees.map((f) => (
              <div key={f.name} className={`card plan plan--compact ${f.featured ? 'plan--featured' : ''}`}>
                <h3>{f.name}</h3>
                <p className="plan__price">{f.price}</p>
                <p className="plan__unit">{f.unit}</p>
              </div>
            ))}
          </div>
          <p className="center">
            <Link to="/fees" className="link">What every consultation includes →</Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
