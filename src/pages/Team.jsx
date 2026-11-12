import { team } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';

const [founder, ...panel] = team;

const panelProcess = [
  ['Individual review', 'Each specialist studies your forms, history, prescriptions and images from the lens of their own expertise.'],
  ['Collective discussion', 'Findings are combined so that workout, nutrition, skin, hair, cardiac and orthopaedic considerations fit together.'],
  ['Unanimous approval', 'Your protocol is only explained to you once every panel member has approved it.'],
];

export default function Team() {
  return (
    <>
      <PageHeader
        crumb="Team"
        eyebrow="The panel"
        title="Our multidisciplinary medical experts"
        lead="General physicians, specialists in dermatology, cardiology and orthopaedics, and clinical nutrition experts — working together on every single case."
      />

      {/* Founder */}
      <section className="section">
        <div className="container founder">
          <div className="founder__photo">
            <img src={founder.photo} alt={founder.name} />
          </div>
          <div>
            <span className="tag">{founder.role}</span>
            <h2 className="section__title">{founder.name}</h2>
            <p className="doctor__creds">{founder.creds}</p>
            <p className="muted">{founder.bio}</p>
            <p className="muted">
              He focuses on helping individuals achieve healthier skin, a fitter body, and improved
              overall well-being.
            </p>
            <ul className="chips">
              {founder.focus.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Panel */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Medical panel" title="The doctors behind your protocol" />
          <div className="grid grid--panel">
            {panel.map((d) => (
              <article key={d.name} className="card doctor doctor--row">
                <div className="doctor__photo">
                  <img src={d.photo} alt={d.name} loading="lazy" />
                </div>
                <div>
                  <span className="tag">{d.role}</span>
                  <h3>{d.name}</h3>
                  <p className="doctor__creds">{d.creds}</p>
                  <p className="muted doctor__bio">{d.bio}</p>
                  <ul className="chips chips--sm">
                    {d.focus.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How the panel works */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Panel-approved protocols" title="How the panel works together">
            Our entire multidisciplinary medical panel reviews every case and prepares a personalized
            protocol.
          </SectionHead>
          <div className="grid grid--3">
            {panelProcess.map(([title, text], i) => (
              <article key={title} className="card step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Get your case reviewed by the full panel" />
    </>
  );
}
