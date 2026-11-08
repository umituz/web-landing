import { ArrowRight } from 'lucide-react';
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
        <Button to={primary.to} size="lg" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
          {primary.label}
        </Button>
        {secondary && (
          <Button to={secondary.to} variant="secondary" size="lg">
            {secondary.label}
          </Button>
        )}
      </div>
    </section>
  );
}
