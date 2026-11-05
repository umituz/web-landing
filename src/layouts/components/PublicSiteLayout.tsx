import { useEffect, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useT } from '@umituz/web-localization/react';
import { Button } from '@umituz/web-design-system/atoms';
import type { PublicLayoutConfig } from '../types/layout';

export interface PublicSiteLayoutProps {
  config: PublicLayoutConfig;
  children: ReactNode;
}

export const PublicSiteLayout = ({ config, children }: PublicSiteLayoutProps) => {
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const mainId = config.mainId ?? 'site-main';

  return (
    <div className="ul-site">
      <a href={`#${mainId}`} className="ul-skip-link">
        {config.skipLabel ?? t('Skip to content')}
      </a>

      <header className="ul-site-header">
        {config.brand && <div className="ul-site-brand">{config.brand}</div>}
        <nav className="ul-site-nav" aria-label={config.navLabel ?? t('Site')}>
          {config.navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `ul-site-link ${isActive ? 'ul-site-link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        {(config.ctaSecondary || config.ctaPrimary) && (
          <div className="ul-site-cta">
            {config.ctaSecondary && (
              <Button asChild variant="ghost" size="sm">
                <Link to={config.ctaSecondary.to}>{config.ctaSecondary.label}</Link>
              </Button>
            )}
            {config.ctaPrimary && (
              <Button asChild variant="ink" size="sm">
                <Link to={config.ctaPrimary.to}>{config.ctaPrimary.label}</Link>
              </Button>
            )}
          </div>
        )}
      </header>

      <main id={mainId} className="ul-site-main">
        {children}
      </main>

      <footer className="ul-site-footer">
        <div className="ul-site-footer-grid">
          {(config.footerBrand || config.footerNote) && (
            <div className="ul-site-footer-brand">
              {config.footerBrand}
              {config.footerNote && <div className="ul-site-note">{config.footerNote}</div>}
            </div>
          )}
          {config.footerColumns.map((col) => (
            <nav key={col.heading} className="ul-site-col" aria-label={col.heading}>
              <h4>{col.heading}</h4>
              {col.links.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        {config.footerLegal && <p className="ul-site-legal">{config.footerLegal}</p>}
      </footer>
    </div>
  );
};

export default PublicSiteLayout;
