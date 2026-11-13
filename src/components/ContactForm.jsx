import { useState } from 'react';
import { formOptions, whatsappLink } from '../data.js';

const empty = { firstName: '', lastName: '', source: '', goal: '', category: '', note: '' };

// `initial` pre-fills fields (e.g. the goal or fee category of the button that opened it).
// `bare` drops the card styling and title when the form sits inside the booking pop-up.
export default function ContactForm({ initial, bare = false }) {
  const [form, setForm] = useState(() => ({ ...empty, ...initial }));
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = 'Please enter your first name';
    if (!form.goal) next.goal = 'Please choose a consultation goal';
    if (!form.category) next.category = 'Please choose a category';
    return next;
  };

  // Sends the enquiry as a pre-filled WhatsApp message to the clinic.
  const submit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;
    const message = [
      'New consultation enquiry',
      `Name: ${form.firstName} ${form.lastName}`.trim(),
      form.source && `Heard about us via: ${form.source}`,
      `Goal: ${form.goal}`,
      `Category: ${form.category}`,
      form.note && `Health note: ${form.note}`,
    ].filter(Boolean).join('\n');
    window.open(whatsappLink(message), '_blank', 'noopener');
    setSent(true);
    setForm(empty);
  };

  return (
    <form className={bare ? 'form form--bare' : 'card form'} onSubmit={submit} noValidate>
      {sent ? (
        <div className="form__success" role="status">
          <h3>Thank you!</h3>
          <p className="muted">
            Your enquiry has been opened in WhatsApp — just press send. Our team will assign you
            a date for your consultation.
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
            Send another
          </button>
        </div>
      ) : (
        <>
          {!bare && <h3 className="form__title">Book a consultation</h3>}
          <div className="form__row">
            <Field label="First name" name="firstName" value={form.firstName} onChange={update} error={errors.firstName} />
            <Field label="Last name" name="lastName" value={form.lastName} onChange={update} />
          </div>
          <Select label="How did you know about us?" name="source" value={form.source} onChange={update} options={formOptions.source} />
          <Select label="Consultation goal" name="goal" value={form.goal} onChange={update} options={formOptions.goal} error={errors.goal} />
          <Select label="Category" name="category" value={form.category} onChange={update} options={formOptions.category} error={errors.category} />
          <label className="field">
            <span>Brief health note</span>
            <textarea name="note" rows="4" value={form.note} onChange={update} />
          </label>
          <button type="submit" className="btn btn--primary btn--block">Submit Enquiry</button>
          <p className="form__hint muted">Submitting opens WhatsApp with your details filled in.</p>
        </>
      )}
    </form>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span>{label}</span>
      <input {...props} aria-invalid={!!error} />
      {error && <small>{error}</small>}
    </label>
  );
}

function Select({ label, options, error, ...props }) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span>{label}</span>
      <select {...props} aria-invalid={!!error}>
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      {error && <small>{error}</small>}
    </label>
  );
}
