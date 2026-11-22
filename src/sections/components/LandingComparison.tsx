import { Fragment } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router';
import { Badge, Button } from '@umituz/web-design-system/atoms';
import type { LandingComparisonProps } from '../types/section';

export function LandingComparison({
  id,
  kicker,
  title,
  titleEm,
  intro,
  tiers,
  rows,
  alt = false,
  className,
}: LandingComparisonProps) {
  const rootClasses = [
    'ul-land-section',
    alt ? 'ul-land-section--alt' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} className={rootClasses}>
      <div className="ul-land-section-inner">
        {kicker ? <p className="ul-land-kicker-plain">{kicker}</p> : null}
        <h2 className="ul-land-section-title">
          {title}
          {titleEm ? <em>{titleEm}</em> : null}
        </h2>
        {intro ? <p className="ul-land-section-intro">{intro}</p> : null}

        <div className="ul-land-comparison-wrapper">
          <table className="ul-land-comparison-table">
            <thead>
              <tr>
                <th className="ul-land-comparison-feature-col">Feature</th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    className={`ul-land-comparison-tier-header ${
                      tier.highlight ? 'ul-land-comparison-tier-header--highlight' : ''
                    }`}
                  >
                    <div className="ul-land-comparison-tier-title-row">
                      <span className="ul-land-comparison-tier-name">{tier.name}</span>
                      {tier.badge ? (
                        <Badge variant={tier.highlight ? 'primary' : 'neutral'} size="sm">
                          {tier.badge}
                        </Badge>
                      ) : null}
                    </div>
                    {tier.action ? (
                      <div className="ul-land-comparison-tier-action">
                        <Button
                          asChild
                          size="sm"
                          variant={tier.highlight ? 'default' : 'secondary'}
                        >
                          <Link to={tier.action.to}>{tier.action.label}</Link>
                        </Button>
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                if (row.isCategoryHeader) {
                  return (
                    <tr key={`cat-${row.name}-${idx}`} className="ul-land-comparison-category-row">
                      <td colSpan={tiers.length + 1}>
                        <span className="ul-land-comparison-category-label">{row.name}</span>
                      </td>
                    </tr>
                  );
                }

                const prevRow = idx > 0 ? rows[idx - 1] : undefined;
                const showCategoryDivider =
                  row.category && (!prevRow || prevRow.category !== row.category);

                return (
                  <Fragment key={`${row.name}-${idx}`}>
                    {showCategoryDivider ? (
                      <tr className="ul-land-comparison-category-row">
                        <td colSpan={tiers.length + 1}>
                          <span className="ul-land-comparison-category-label">{row.category}</span>
                        </td>
                      </tr>
                    ) : null}
                    <tr className="ul-land-comparison-row">
                      <td className="ul-land-comparison-feature-cell">
                        <div className="ul-land-comparison-feature-name">{row.name}</div>
                        {row.description ? (
                          <div className="ul-land-comparison-feature-desc">{row.description}</div>
                        ) : null}
                      </td>
                      {tiers.map((tier) => {
                        const value = row.values?.[tier.id];
                        return (
                          <td
                            key={`${tier.id}-${row.name}`}
                            className={`ul-land-comparison-value-cell ${
                              tier.highlight ? 'ul-land-comparison-value-cell--highlight' : ''
                            }`}
                          >
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check
                                  size={18}
                                  className="ul-land-comparison-check"
                                  aria-label="Included"
                                />
                              ) : (
                                <X
                                  size={18}
                                  className="ul-land-comparison-cross"
                                  aria-label="Not included"
                                />
                              )
                            ) : (
                              <span className="ul-land-comparison-text-value">
                                {value ?? '-'}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
