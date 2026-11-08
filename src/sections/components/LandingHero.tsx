import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Button } from '@umituz/web-design-system/atoms';
import type { LandingHeroProps } from '../types/section';

export function LandingHero({ kicker, title, titleEm, lead, primary, secondary, note }: LandingHeroProps) {
  const KickerIcon = kicker?.icon;
  return (
    <section className="ul-land-hero">
      {kicker && (
        <Badge variant="neutral" size="sm" className="ul-land-hero-badge">
          {KickerIcon && <KickerIcon size={13} aria-hidden="true" />}
          {kicker.label}
        </Badge>
      )}
      <h1 className="ul-land-hero-title">
        {title}
        {titleEm && <em>{titleEm}</em>}
      </h1>
      <p className="ul-land-hero-lead">{lead}</p>
      {(primary || secondary) && (
        <div className="ul-land-cta">
          {primary && (
            <Button asChild size="lg">
              <Link to={primary.to}>
                {primary.label} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          )}
          {secondary && (
            <Button asChild variant="secondary" size="lg">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
      {note && <p className="ul-land-note">{note}</p>}
    </section>
  );
}
