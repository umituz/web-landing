import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { LandingCardProps } from '../types/section';

export function LandingCard({ icon: Icon, title, body, points, to, cta, featured }: LandingCardProps) {
  const className = `ul-land-card${featured ? ' ul-land-card--featured' : ''}${to ? ' ul-land-card--link' : ''}`;
  const content = (
    <>
      {Icon && (
        <span className="ul-land-card-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
      )}
      <h3 className="ul-land-card-title">{title}</h3>
      {body && <p className="ul-land-card-body">{body}</p>}
      {points && points.length > 0 && (
        <ul className="ul-land-card-points">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {to && cta && (
        <span className="ul-land-card-cta">
          {cta}
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      )}
    </>
  );
  return to ? (
    <Link to={to} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
