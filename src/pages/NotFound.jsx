import { Link } from 'react-router-dom';
import { FaPaw } from 'react-icons/fa';
import PageWrapper from '../components/common/PageWrapper';
import Button from '../components/ui/Button';
import { NAV_LINKS } from '../constants';

export default function NotFound() {
  return (
    <PageWrapper
      title="Page Not Found"
      description="The page you were looking for could not be found. Browse Asha Pets grooming services, service areas or get in touch."
      path="/404"
      noindex
    >
      <section className="notfound">
        <span className="notfound__paw">
          <FaPaw aria-hidden="true" />
        </span>
        <h1>404</h1>
        <h2>Oops! This page went for a walk.</h2>
        <p>The page you&apos;re looking for couldn&apos;t be found. Try one of these:</p>
        <ul className="notfound__links">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Button variant="primary" to="/">
          Back to Home
        </Button>
      </section>
    </PageWrapper>
  );
}
