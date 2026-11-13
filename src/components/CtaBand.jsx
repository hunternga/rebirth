import { whatsappLink } from '../data.js';
import { BookButton } from './Booking.jsx';

export default function CtaBand({
  title = 'Ready to start your rebirth?',
  text = 'Book a consultation and let our panel of medical experts build a protocol that is uniquely yours.',
}) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-band__actions">
            <BookButton className="btn btn--dark">Book Consultation</BookButton>
            <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn--outline-dark">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
