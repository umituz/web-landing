import type { LandingLogoCloudProps } from '../types/section';

export function LandingLogoCloud({
  id,
  title,
  logos,
  alt = false,
  className = '',
}: LandingLogoCloudProps) {
  return (
    <section id={id} className={`ul-land-logos-section ${alt ? 'ul-land-section--alt' : ''} ${className}`.trim()}>
      <div className="ul-land-section-inner">
        {title && <p className="ul-land-logos-title">{title}</p>}
        <div className="ul-land-logos-grid">
          {logos.map((logo) => {
            const content = logo.logo ?? <span className="ul-land-logo-text">{logo.name}</span>;
            return logo.href ? (
              <a
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="ul-land-logo-item ul-land-logo-item--link"
                title={logo.name}
              >
                {content}
              </a>
            ) : (
              <div key={logo.name} className="ul-land-logo-item" title={logo.name}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
