import type { LandingPageScaffoldProps } from '../types/section';

export function LandingPageScaffold({
  id,
  kicker,
  title,
  titleEm,
  intro,
  children,
  alt = false,
  className = '',
}: LandingPageScaffoldProps) {
  return (
    <div className={`ul-land ${className}`.trim()}>
      <section id={id} className={`ul-land-section ${alt ? 'ul-land-section--alt' : ''}`}>
        <div className="ul-land-section-inner">
          {kicker && <p className="ul-land-kicker-plain">{kicker}</p>}
          <h1 className="ul-land-section-title">
            {title}
            {titleEm && <em>{titleEm}</em>}
          </h1>
          {intro && <p className="ul-land-section-intro">{intro}</p>}
          <div className="ul-land-scaffold-body">{children}</div>
        </div>
      </section>
    </div>
  );
}
