import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@umituz/web-design-system/atoms';
import type { LandingCtaProps } from '../types/section';

export function LandingCta({ title, titleEm, body, primary, secondary }: LandingCtaProps) {
  return (
    <section className="ul-land-close">
      <h2 className="ul-land-close-title">
        {title}
        {titleEm && <em>{titleEm}</em>}
      </h2>
      <p className="ul-land-close-body">{body}</p>
      <div className="ul-land-cta">
        <Button asChild size="lg">
          <Link to={primary.to}>
            {primary.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Button>
        {secondary && (
          <Button asChild variant="secondary" size="lg">
            <Link to={secondary.to}>{secondary.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
