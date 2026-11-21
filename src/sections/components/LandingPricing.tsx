import { Check } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Button } from '@umituz/web-design-system/atoms';
import type { LandingPricingProps } from '../types/section';

export function LandingPricing({
  id,
  kicker,
  title,
  titleEm,
  intro,
  billingToggle,
  plans,
  note,
}: LandingPricingProps) {
  return (
    <section id={id} className="ul-land-section ul-land-pricing">
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">
          {title}
          {titleEm && <em>{titleEm}</em>}
        </h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}

        {billingToggle && (
          <div className="ul-land-pricing-toggle" role="group" aria-label="Billing frequency">
            <button
              type="button"
              className={`ul-land-pricing-toggle-btn${!billingToggle.isAnnual ? ' is-active' : ''}`}
              onClick={() => billingToggle.onToggle(false)}
              aria-pressed={!billingToggle.isAnnual}
            >
              {billingToggle.monthlyLabel}
            </button>
            <button
              type="button"
              className={`ul-land-pricing-toggle-btn${billingToggle.isAnnual ? ' is-active' : ''}`}
              onClick={() => billingToggle.onToggle(true)}
              aria-pressed={billingToggle.isAnnual}
            >
              {billingToggle.annualLabel}
              {billingToggle.discountBadge && (
                <Badge variant="success" size="sm" className="ul-land-pricing-discount">
                  {billingToggle.discountBadge}
                </Badge>
              )}
            </button>
          </div>
        )}

        <div className={`ul-land-pricing-grid ul-land-pricing-grid--${Math.min(Math.max(plans.length, 1), 4)}`}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`ul-land-price-card${plan.featured ? ' ul-land-price-card--featured' : ''}`}
            >
              <div className="ul-land-price-header">
                <div className="ul-land-price-title-row">
                  <h3 className="ul-land-price-name">{plan.name}</h3>
                  {plan.badge && (
                    <Badge variant={plan.featured ? 'primary' : 'neutral'} size="sm">
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                {plan.description && <p className="ul-land-price-desc">{plan.description}</p>}
              </div>

              <div className="ul-land-price-amount">
                <span className="ul-land-price-value">{plan.price}</span>
                {plan.period && <span className="ul-land-price-period">{plan.period}</span>}
              </div>

              <ul className="ul-land-price-features" aria-label={`${plan.name} features`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="ul-land-price-feature-item">
                    <Check size={16} className="ul-land-price-check" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="ul-land-price-action">
                <Button
                  asChild
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                >
                  <Link to={plan.action.to}>{plan.action.label}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {note && <p className="ul-land-note text-center">{note}</p>}
      </div>
    </section>
  );
}
