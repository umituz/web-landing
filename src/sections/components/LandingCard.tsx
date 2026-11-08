import type { LandingCardProps } from '../types/section';

export function LandingCard({ icon: Icon, title, body, featured }: LandingCardProps) {
  return (
    <div className={`ul-land-card${featured ? ' ul-land-card--featured' : ''}`}>
      {Icon && (
        <span className="ul-land-card-icon">
          <Icon size={18} aria-hidden="true" />
        </span>
      )}
      <h3 className="ul-land-card-title">{title}</h3>
      <p className="ul-land-card-body">{body}</p>
    </div>
  );
}
