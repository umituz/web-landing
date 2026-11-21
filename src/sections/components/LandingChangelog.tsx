import { Badge } from '@umituz/web-design-system/atoms';
import type { LandingChangelogProps } from '../types/section';

export function LandingChangelog({
  id,
  kicker,
  title,
  titleEm,
  intro,
  entries,
  alt = false,
  className = '',
}: LandingChangelogProps) {
  return (
    <section id={id} className={`ul-land-section ul-land-changelog-wrap ${alt ? 'ul-land-section--alt' : ''} ${className}`.trim()}>
      <div className="ul-land-section-inner">
        {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
        <h2 className="ul-land-section-title">
          {title}
          {titleEm && <em>{titleEm}</em>}
        </h2>
        {intro && <p className="ul-land-section-intro">{intro}</p>}

        <div className="ul-land-changelog-timeline">
          {entries.map((entry) => (
            <article key={entry.version} className="ul-land-changelog-entry">
              <div className="ul-land-changelog-aside">
                <span className="ul-land-changelog-version">{entry.version}</span>
                <time className="ul-land-changelog-date">{entry.date}</time>
                {entry.badge && (
                  <Badge variant={entry.badge.variant ?? 'neutral'} size="sm">
                    {entry.badge.label}
                  </Badge>
                )}
              </div>
              <div className="ul-land-changelog-content">
                <h3 className="ul-land-changelog-heading">{entry.title}</h3>
                {entry.summary && <p className="ul-land-changelog-summary">{entry.summary}</p>}
                <ul className="ul-land-changelog-list">
                  {entry.items.map((item, idx) => (
                    <li key={idx} className="ul-land-changelog-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
