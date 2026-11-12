export default function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q} className="faq__item">
          <summary>{q}</summary>
          <p className="muted">{a}</p>
        </details>
      ))}
    </div>
  );
}
