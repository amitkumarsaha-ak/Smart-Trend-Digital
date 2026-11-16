import { Link, useParams } from "react-router-dom";
import { services } from "../data/services.js";
import ServiceIcon from "../components/ServiceIcon.jsx";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  const others = services.filter((s) => s.slug !== slug).slice(0, 4);

  if (!service) {
    return (
      <div className="page section container">
        <h1>Service not found</h1>
        <Link to="/services" className="btn btn-primary">
          Back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Service</p>
          <div className="detail-title">
            <span className="service-icon large">
              <ServiceIcon slug={service.slug} />
            </span>
            <h1>{service.title}</h1>
          </div>
          <p className="lead">{service.summary}</p>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <div>
            <h2>How we help</h2>
            <p>{service.details}</p>
            <Link to="/contact" className="btn btn-primary">
              Request this service
            </Link>
          </div>
          <aside className="related">
            <h3>Other services</h3>
            <ul>
              {others.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
