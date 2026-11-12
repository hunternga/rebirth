import { modes, prepareList, processFaqs, standards, steps } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Faq from '../components/Faq.jsx';

export default function Process() {
  return (
    <>
      <PageHeader
        crumb="Process"
        eyebrow="How it works"
        title="Asynchronous online consultations done right"
        lead="As per Government of India Telemedicine Guidelines, asynchronous consultations allow patients to submit their health queries, forms, images, and history securely, which are reviewed by our entire medical panel before the consultation."
      />

      {/* Steps */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Step by step" title="Your journey with us" />
          <ol className="process">
            {steps.map((s, i) => (
              <li key={s.title} className="process__step">
                <span className="process__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="card process__body">
                  <h3>{s.title}</h3>
                  <p className="muted">{s.text}</p>
                  <div className="process__cols">
                    <div>
                      <h4>What you do</h4>
                      <ul>{s.you.map((t) => <li key={t}>{t}</li>)}</ul>
                    </div>
                    <div>
                      <h4>What we do</h4>
                      <ul>{s.us.map((t) => <li key={t}>{t}</li>)}</ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Prepare + modes */}
      <section className="section section--alt">
        <div className="container grid grid--2 align-start">
          <div>
            <SectionHead align="left" eyebrow="Before you submit" title="What to prepare">
              Having these ready helps the panel build the most accurate protocol for you.
            </SectionHead>
            <ul className="checklist">
              {prepareList.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead align="left" eyebrow="Your session" title="Choose how you consult">
              Once all panel members approve your protocol, it is explained in a scheduled session.
            </SectionHead>
            <div className="modes">
              {modes.map(([title, text]) => (
                <div key={title} className="card mode">
                  <h3>{title}</h3>
                  <p className="muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="section" id="standards">
        <div className="container">
          <SectionHead eyebrow="Program standards" title="Rules & guidelines">
            To make every consultation effective, all patients agree to the following.
          </SectionHead>
          <div className="grid grid--4">
            {standards.map((s, i) => (
              <article key={s.title} className="card step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.text}</p>
              </article>
            ))}
          </div>
          <p className="notice">
            Consultations are advisory, lifestyle-focused, and asynchronous. Emergencies or acute
            conditions must be addressed immediately at a medical facility.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container narrow">
          <SectionHead eyebrow="Questions" title="Frequently asked" />
          <Faq items={processFaqs} />
        </div>
      </section>

      <CtaBand title="Ready to submit your profile?" />
    </>
  );
}
