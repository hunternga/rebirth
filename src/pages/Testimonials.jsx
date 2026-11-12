import { contact, transformations, videoTestimonials, whatsappLink } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import SectionHead from '../components/SectionHead.jsx';
import VideoGallery from '../components/VideoGallery.jsx';
import CtaBand from '../components/CtaBand.jsx';

const proof = [
  ['5,000+', 'Patients worldwide'],
  ['2M+', 'Followers on Instagram & YouTube'],
  [String(videoTestimonials.length), 'Video stories (and counting)'],
  ['8', 'Doctors behind every result'],
];

export default function Testimonials() {
  return (
    <>
      <PageHeader
        crumb="Reviews"
        eyebrow="Video testimonials"
        title={<>Real people. <span>Real rebirths.</span></>}
        lead="Don't take our word for it — hear directly from patients who rebuilt their health with Rebirth Fitness School and our panel of medical experts."
      />

      <section className="section">
        <div className="container">
          <dl className="proof-strip">
            {proof.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>

          <SectionHead eyebrow="Watch their stories" title="In their own words">
            Tap any story to watch with sound.
          </SectionHead>
          <VideoGallery />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Real transformations" title="The results speak for themselves">
            Personalized, panel-approved protocols — and the difference they make.
          </SectionHead>
          <div className="grid grid--2">
            {transformations.map((t) => (
              <figure key={t.src} className="card transform">
                <div className="transform__img">
                  <img src={t.src} alt={t.alt} loading="lazy" />
                  <span className="ba ba--before">Before</span>
                  <span className="ba ba--after">After</span>
                </div>
                <figcaption>
                  <h3>{t.title}</h3>
                  <p className="muted">{t.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="disclaimer">
            Individual results vary. Every protocol is personalized and depends on each patient's
            history, consistency and adherence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container share">
          <div className="share__card card">
            <p className="eyebrow">Your story matters</p>
            <h2 className="section__title">Share your rebirth</h2>
            <p className="muted">
              Completed a program with us? Your journey could be the push someone else needs to
              start theirs. Send us a short video or your before &amp; after photos on WhatsApp.
            </p>
            <a
              href={whatsappLink('Hi! I would like to share my Rebirth Fitness School transformation story.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
            >
              Share on WhatsApp
            </a>
          </div>

          <div className="share__card card">
            <p className="eyebrow">More stories every week</p>
            <h2 className="section__title">Follow the journey</h2>
            <p className="muted">
              Watch more transformations, expert tips and evidence-based health advice from
              Dr. Isacc Abbas — followed by over 2 million people.
            </p>
            <div className="social-buttons">
              {contact.socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="social-btn">
                  <span className={`social-btn__icon ${s.label.startsWith('YouTube') ? 'is-yt' : 'is-ig'}`} aria-hidden="true">
                    {s.label.startsWith('YouTube') ? (
                      <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.7 15V9l5.8 3z" /></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
                    )}
                  </span>
                  <span>
                    <strong>{s.handle}</strong>
                    <small>{s.label}</small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Your transformation starts here"
        text="Join 5,000+ patients worldwide. Book a consultation and let our panel build your protocol."
      />
    </>
  );
}
