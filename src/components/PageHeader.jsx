import { Link } from 'react-router-dom';

export default function PageHeader({ eyebrow, title, lead, crumb }) {
  return (
    <section className="page-header">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container page-header__inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span>{crumb}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
        {lead && <p className="page-header__lead">{lead}</p>}
      </div>
    </section>
  );
}
