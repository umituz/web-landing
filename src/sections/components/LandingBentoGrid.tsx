import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@umituz/web-design-system/atoms';
import type { LandingBentoGridProps } from '../types/section';

export function LandingBentoGrid({
  id,
  kicker,
  title,
  titleEm,
  intro,
  items,
  columns = 3,
  alt = false,
  className,
  children,
}: LandingBentoGridProps) {
  const rootClasses = [
    'ul-land-section',
    alt ? 'ul-land-section--alt' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const gridClasses = [
    'ul-land-bento-grid',
    `ul-land-bento-grid--cols-${columns}`,
  ].join(' ');

  return (
    <section id={id} className={rootClasses}>
      <div className="ul-land-section-inner">
        {kicker ? <p className="ul-land-kicker-plain">{kicker}</p> : null}
        <h2 className="ul-land-section-title">
          {title}
          {titleEm ? <em>{titleEm}</em> : null}
        </h2>
        {intro ? <p className="ul-land-section-intro">{intro}</p> : null}

        <div className={gridClasses}>
          {items.map((item) => {
            const Icon = item.icon;
            const spanClass = item.colSpan ? `ul-land-bento-card--span-${item.colSpan}` : '';
            return (
              <div
                key={item.id}
                className={`ul-land-bento-card ${spanClass}`.trim()}
              >
                <div className="ul-land-bento-card-header">
                  {Icon ? (
                    <div className="ul-land-bento-icon-box">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                  ) : null}
                  {item.badge ? (
                    <Badge variant="primary" size="sm">
                      {item.badge}
                    </Badge>
                  ) : null}
                </div>

                <div className="ul-land-bento-card-body">
                  <h3 className="ul-land-bento-card-title">{item.title}</h3>
                  <p className="ul-land-bento-card-desc">{item.description}</p>
                </div>

                {item.tags && item.tags.length > 0 ? (
                  <div className="ul-land-bento-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="ul-land-bento-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {item.visual ? (
                  <div className="ul-land-bento-card-visual">{item.visual}</div>
                ) : null}

                {item.children}

                {item.action ? (
                  <Link to={item.action.to} className="ul-land-bento-action">
                    {item.action.label}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
        {children}
      </div>
    </section>
  );
}
