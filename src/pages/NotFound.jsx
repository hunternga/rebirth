import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.jsx';

export default function NotFound() {
  return (
    <>
      <PageHeader crumb="Not found" eyebrow="404" title="Page not found" lead="The page you are looking for doesn't exist or has moved." />
      <section className="section section--tight">
        <div className="container">
          <Link to="/" className="btn btn--primary">Back to home</Link>
        </div>
      </section>
    </>
  );
}
