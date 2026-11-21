import { Badge } from '@umituz/web-design-system/atoms';
import type { LandingStatsProps } from '../types/section';

export function LandingStats({
  id,
  kicker,
  title,
  titleEm,
  intro,
  stats,
  columns = 4,
  alt = false,
  className = '',
}: LandingStatsProps) {
  const colClass = columns === 2 ? 'ul-land-stats--2' : columns === 3 ? 'ul-land-stats--3' : 'ul-land-stats--4';
  return (
    <section id={id} className={`ul-land-section ul-land-stats-wrap ${alt ? 'ul-land-section--alt' : ''} ${className}`.trim()}>
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        {title && (
          <h2 className="ul-land-section-title">
            {title}
            {titleEm && <em>{titleEm}</em>}
          </h2>
        )}
        {intro && <p className="ul-land-section-intro">{intro}</p>}
        <div className={`ul-land-stats-grid ${colClass}`}>
          {stats.map((s) => (
            <div key={s.label} className="ul-land-stats-card">
              <div className="ul-land-stats-head">
                <span className="ul-land-stats-val">{s.value}</span>
                {s.badge && (
                  <Badge variant="success" size="sm" className="ul-land-stats-badge">
                    {s.badge}
                  </Badge>
                )}
              </div>
              <span className="ul-land-stats-label">{s.label}</span>
              {s.description && <p className="ul-land-stats-desc">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
