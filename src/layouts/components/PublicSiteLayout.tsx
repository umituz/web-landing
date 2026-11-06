import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useT } from '@umituz/web-localization/react';
import { Button } from '@umituz/web-design-system/atoms';
import { ChevronDown, LogOut } from 'lucide-react';
import type { PublicLayoutConfig, PublicUser, PublicUserNavAction } from '../types/layout';

export interface PublicSiteLayoutProps {
  config: PublicLayoutConfig;
  children?: ReactNode;
}

function UserMenuDropdown({
  user,
  onLogout,
  actions,
}: {
  user: PublicUser;
  onLogout?: () => void | Promise<void>;
  actions?: PublicUserNavAction[];
}) {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const displayName = user.name || user.email?.split('@')[0] || t('Profile');
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="ul-site-user-menu" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="ul-site-user-btn"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="ul-site-user-avatar" />
        ) : (
          <span className="ul-site-user-initial" aria-hidden="true">
            {initial}
          </span>
        )}
        <span className="ul-site-user-name">{displayName}</span>
        <ChevronDown size={13} className={`ul-site-chevron ${isOpen ? 'ul-site-chevron--open' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div role="menu" className="ul-site-user-dropdown">
          <div className="ul-site-user-info">
            <p className="ul-site-user-title">{displayName}</p>
            {user.email && <p className="ul-site-user-email">{user.email}</p>}
          </div>

          {actions && actions.length > 0 && (
            <div className="ul-site-user-actions">
              {actions.map((action) => {
                const content = (
                  <>
                    {action.icon}
                    <span>{action.label}</span>
                  </>
                );
                if (action.to) {
                  return (
                    <Link
                      key={action.label}
                      to={action.to}
                      onClick={() => setIsOpen(false)}
                      className={`ul-site-dropdown-item ${action.danger ? 'ul-site-dropdown-item--danger' : ''}`}
                    >
                      {content}
                    </Link>
                  );
                }
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      void action.onClick?.();
                    }}
                    className={`ul-site-dropdown-item ${action.danger ? 'ul-site-dropdown-item--danger' : ''}`}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          )}

          {onLogout && (
            <div className="ul-site-user-logout">
              <button
                type="button"
                onClick={async () => {
                  setIsOpen(false);
                  await onLogout();
                }}
                className="ul-site-dropdown-item ul-site-dropdown-item--danger"
              >
                <LogOut size={14} aria-hidden="true" />
                <span>{t('Sign out')}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const PublicSiteLayout = ({ config, children }: PublicSiteLayoutProps) => {
  const location = useLocation();
  const t = useT();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const mainId = config.mainId ?? 'site-main';
  const mobileNav = config.mobileNavItems ?? config.navItems;

  return (
    <div className="ul-site">
      <a href={`#${mainId}`} className="ul-skip-link">
        {config.skipLabel ?? t('Skip to content')}
      </a>

      <header className="ul-site-header">
        <div className="ul-site-header-inner">
          {config.brand && <div className="ul-site-brand">{config.brand}</div>}

          <nav className="ul-site-nav" aria-label={config.navLabel ?? t('Site')}>
            {config.navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `ul-site-link ${isActive ? 'ul-site-link--active' : ''}`}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ul-site-actions">
            {config.headerActions}

            {config.user ? (
              <div className="ul-site-auth-group">
                {config.authCta?.app ? (
                  <Button asChild size="sm" className="ul-site-app-cta">
                    <Link to={config.authCta.app.to}>{config.authCta.app.label}</Link>
                  </Button>
                ) : config.ctaPrimary ? (
                  <Button asChild size="sm" className="ul-site-app-cta">
                    <Link to={config.ctaPrimary.to}>{config.ctaPrimary.label}</Link>
                  </Button>
                ) : null}

                <UserMenuDropdown
                  user={config.user}
                  onLogout={config.onLogout}
                  actions={config.userMenuActions}
                />
              </div>
            ) : (
              <div className="ul-site-guest-group">
                {config.authCta?.login ? (
                  <Button asChild variant="ghost" size="sm" className="ul-site-login-btn">
                    <Link to={config.authCta.login.to}>{config.authCta.login.label}</Link>
                  </Button>
                ) : config.ctaSecondary ? (
                  <Button asChild variant="ghost" size="sm" className="ul-site-login-btn">
                    <Link to={config.ctaSecondary.to}>{config.ctaSecondary.label}</Link>
                  </Button>
                ) : null}

                {config.authCta?.register ? (
                  <Button asChild size="sm" className="ul-site-start-btn">
                    <Link to={config.authCta.register.to}>{config.authCta.register.label}</Link>
                  </Button>
                ) : config.ctaPrimary ? (
                  <Button asChild size="sm" className="ul-site-start-btn">
                    <Link to={config.ctaPrimary.to}>{config.ctaPrimary.label}</Link>
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {mobileNav.length > 0 && (
          <nav className="ul-site-mobile-nav" aria-label={config.navLabel ?? t('Site')}>
            {mobileNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `ul-site-mobile-link ${isActive ? 'ul-site-mobile-link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main id={mainId} className="ul-site-main">
        {children ?? <Outlet />}
      </main>

      <footer className="ul-site-footer">
        <div className="ul-site-footer-inner">
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

          {(config.footerLegal || config.footerLinks) && (
            <div className="ul-site-footer-bottom">
              {config.footerLegal && <div className="ul-site-legal">{config.footerLegal}</div>}
              {config.footerLinks && config.footerLinks.length > 0 && (
                <div className="ul-site-footer-links">
                  {config.footerLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="ul-site-footer-link">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export const LandingLayout = PublicSiteLayout;
export default PublicSiteLayout;
