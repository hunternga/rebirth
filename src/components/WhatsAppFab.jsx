import { contact, whatsappLink } from '../data.js';
import { WhatsAppIcon } from './Icons.jsx';

// Floating WhatsApp button, visible on every page.
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      aria-label={`Chat with us on WhatsApp (${contact.whatsappDisplay})`}
    >
      <span className="wa-fab__label">
        <strong>Chat with us</strong>
        <small>Usually replies quickly</small>
      </span>
      <span className="wa-fab__btn">
        <WhatsAppIcon size={30} />
      </span>
    </a>
  );
}
