import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { LandingCard } from './LandingCard';
import type { LandingSectionProps } from '../types/section';

export function LandingSection({ id, kicker, title, intro, cards, children, action, alt, featured, columns }: LandingSectionProps) {
  return (
    <section id={id} className={`ul-land-section${alt ? ' ul-land-section--alt' : ''}`}>
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">{title}</h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}
        {cards && cards.length > 0 && (
          <div
            className={
              columns
                ? `ul-land-grid ul-land-grid--${columns}`
                : 'ul-land-grid'
            }
          >
            {cards.map((card) => (
              <LandingCard key={card.title} {...card} featured={featured} />
            ))}
          </div>
        )}
        {children}
        {action && (
          <Link to={action.to} className="ul-land-section-action">
            {action.label}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
}
