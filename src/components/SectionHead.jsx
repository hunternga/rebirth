export default function SectionHead({ eyebrow, title, children, align = 'center' }) {
  return (
    <div className={`section__head ${align === 'left' ? 'section__head--left' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section__title">{title}</h2>
      {children && <p className="muted">{children}</p>}
    </div>
  );
}
