import { Link } from 'react-router-dom';
import { feeFaqs, feeIncludes, fees } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Faq from '../components/Faq.jsx';

export default function Fees() {
  return (
    <>
      <PageHeader
        crumb="Fees"
        eyebrow="Fees"
        title="Wellness for everyone"
        lead="An initiative exclusively started by Dr. Isacc Abbas to ensure world-class wellness is accessible regardless of economic status."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3 pricing">
            {fees.map((f) => (
              <article key={f.name} className={`card plan ${f.featured ? 'plan--featured' : ''}`}>
                <h3>{f.name}</h3>
                <p className="plan__price">{f.price}</p>
                <p className="plan__unit">{f.unit}</p>
                <p className="muted plan__text">{f.text}</p>
                <Link to="/contact" className={`btn ${f.featured ? 'btn--primary' : 'btn--ghost'}`}>
                  Book Consultation
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container grid grid--2 align-start">
          <div>
            <SectionHead align="left" eyebrow="Same care, every category" title="What every consultation includes">
              No compromise on quality — the fee changes, the care does not.
            </SectionHead>
            <ul className="checklist">
              {feeIncludes.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="card statement">
            <p className="eyebrow">Our commitment</p>
            <h3>Wellness is a right, not a privilege</h3>
            <p className="muted">
              Dr. Isacc Abbas started this initiative so that cost never stands between a person and
              good health guidance. Patients from economically weaker sections receive the same
              world-class care at a subsidised rate, and consultations for all specially abled people
              are free — always.
            </p>
            <p className="muted">
              Simply choose your category when you fill in the booking form, and our team will guide
              you through the next steps.
            </p>
            <Link to="/contact" className="btn btn--primary">Choose your category</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHead eyebrow="Questions" title="Fees FAQ" />
          <Faq items={feeFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
