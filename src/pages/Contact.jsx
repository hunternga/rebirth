import { Link } from 'react-router-dom';
import { contact, nextSteps, whatsappLink } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="Contact"
        title="Start your rebirth journey"
        lead="Reach out via WhatsApp, email, or fill out the form. Our team will guide you through the next steps and assign you a date for your consultation."
      />

      <section className="section">
        <div className="container contact">
          <div>
            <div className="contact__cards">
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="card contact__card">
                <strong>WhatsApp</strong>
                <span>{contact.whatsappDisplay}</span>
                <small className="muted">Fastest way to reach us</small>
              </a>
              <a href={`mailto:${contact.email}`} className="card contact__card">
                <strong>Email</strong>
                <span>{contact.email}</span>
                <small className="muted">For documents and detailed queries</small>
              </a>
            </div>

            <h3 className="contact__subhead">Follow us</h3>
            <ul className="contact__info">
              {contact.socials.map((s) => (
                <li key={s.href}>
                  <strong>{s.label}</strong>
                  <a href={s.href} target="_blank" rel="noreferrer">{s.handle}</a>
                </li>
              ))}
              <li>
                <strong>Based in</strong>
                <span className="muted">{contact.location}</span>
              </li>
            </ul>

            <h3 className="contact__subhead">What happens next</h3>
            <ol className="next-steps">
              {nextSteps.map(([title, text], i) => (
                <li key={title}>
                  <span>{i + 1}</span>
                  <div>
                    <strong>{title}</strong>
                    <p className="muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="notice notice--left">
              Consultations are advisory &amp; lifestyle-focused. For emergencies or acute conditions,
              please visit a medical facility immediately. Please review our{' '}
              <Link to="/process#standards" className="link">consultation guidelines</Link> before booking.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
