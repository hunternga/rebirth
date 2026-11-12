import { Link } from 'react-router-dom';
import { services, team } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import ServiceIcon from '../components/ServiceIcon.jsx';
import CtaBand from '../components/CtaBand.jsx';

const photoOf = Object.fromEntries(team.map((d) => [d.name, d.photo]));

export default function Services() {
  return (
    <>
      <PageHeader
        crumb="Services"
        eyebrow="Services"
        title="Holistic programs for every wellness goal"
        lead="Every program is scientifically designed, personalized, and monitored by our panel — addressing the body as a complete system, not isolated symptoms."
      />

      <section className="section section--tight">
        <div className="container">
          <nav className="jump" aria-label="Jump to a program">
            {services.map((s) => (
              <a key={s.slug} href={`#${s.slug}`}>{s.title}</a>
            ))}
          </nav>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`section ${i % 2 ? '' : 'section--alt'}`}>
          <div className="container service">
            <div className="service__intro">
              <ServiceIcon path={s.icon} />
              <p className="eyebrow">Program {String(i + 1).padStart(2, '0')}</p>
              <h2 className="section__title">{s.title}</h2>
              <p className="service__short">{s.short}</p>
              <p className="muted">{s.overview}</p>

              <div className="service__experts">
                <h4>Guided by</h4>
                <ul>
                  {s.experts.map((name) => (
                    <li key={name}>
                      <img src={photoOf[name]} alt="" loading="lazy" />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact" className="btn btn--primary">Get Started</Link>
            </div>

            <div className="service__details">
              <div className="card">
                <h3>Who it's for</h3>
                <ul className="checklist checklist--sm">
                  {s.forWho.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <div className="card">
                <h3>What's included</h3>
                <ul className="checklist checklist--sm">
                  {s.includes.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title="Not sure which program fits?"
        text="Tell us your goal in the booking form — the panel will recommend the right combination for you."
      />
    </>
  );
}
