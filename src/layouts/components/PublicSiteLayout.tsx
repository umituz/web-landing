import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';
import { Button } from '@umituz/web-design-system/atoms';
import { Check, ChevronDown, Globe, LogOut } from 'lucide-react';
import type {
  PublicBrand,
  PublicLanguageSelector,
  PublicLayoutConfig,
  PublicNavLink,
  PublicUser,
  PublicUserNavAction,
} from '../types/layout';

export interface PublicSiteLayoutProps {
  config: PublicLayoutConfig;
  children?: ReactNode;
}

/** mailto:, tel:, https://, protocol-relative //… — anything react-router should not handle. */
const EXTERNAL_HREF = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const WEB_HREF = /^(?:https?:)?\/\//i;

function isExternalHref(to: string) {
  return EXTERNAL_HREF.test(to);
}

function isHashHref(to: string) {
  return to.includes('#');
}

function isBrandData(value: ReactNode | PublicBrand): value is PublicBrand {
  return (
    typeof value === 'object' &&
    value !== null &&
    'mark' in value &&
    'name' in value &&
    !('$$typeof' in value)
  );
}

function BrandWordmark({ brand, variant }: { brand: PublicBrand; variant: 'header' | 'footer' }) {
  const footer = variant === 'footer';
  return (
    <Link to={brand.to ?? '/'} className={`ul-site-brand-link${footer ? ' ul-site-brand-link--footer' : ''}`}>
      <span className={`ul-site-brand-mark${footer ? ' ul-site-brand-mark--footer' : ''}`} aria-hidden="true">
        {brand.mark}
      </span>
      <span className="ul-site-brand-text">
        <span className="ul-site-brand-name">{brand.name}</span>
        {brand.tagline && !footer && <span className="ul-site-brand-tagline">{brand.tagline}</span>}
      </span>
    </Link>
  );
}

function BrandSlot({ value, variant }: { value: ReactNode | PublicBrand; variant: 'header' | 'footer' }) {
  if (isBrandData(value)) return <BrandWordmark brand={value} variant={variant} />;
  return <>{value}</>;
}

/** Plain anchor for external/mailto hrefs, Link (no active state) for hash anchors, NavLink otherwise. */
function NavAnchor({ item, className, activeClassName }: { item: PublicNavLink; className: string; activeClassName: string }) {
  if (isExternalHref(item.to)) {
    const web = WEB_HREF.test(item.to);
    return (
      <a href={item.to} className={className} {...(web ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {item.icon}
        {item.label}
      </a>
    );
  }
  if (isHashHref(item.to)) {
    return (
      <Link to={item.to} className={className}>
        {item.icon}
        {item.label}
      </Link>
    );
  }
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) => `${className}${isActive ? ` ${activeClassName}` : ''}`}
    >
      {item.icon}
      {item.label}
    </NavLink>
  );
}

/** Footer links: same external handling, styled by the caller's class. */
function FooterAnchor({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  if (isExternalHref(to)) {
    const web = WEB_HREF.test(to);
    return (
      <a href={to} className={className} {...(web ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function useDismissOnOutsideClick<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  return ref;
}

function LanguageMenu({ selector }: { selector: PublicLanguageSelector }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useDismissOnOutsideClick<HTMLDivElement>(isOpen, () => setIsOpen(false));
  const active = selector.languages.find((language) => language.id === selector.activeId);

  return (
    <div className="ul-site-lang" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={selector.label}
        className="ul-site-lang-btn"
      >
        <Globe size={13} aria-hidden="true" />
        {active?.flag && (
          <span aria-hidden="true">{active.flag}</span>
        )}
        <span>{active?.label}</span>
        <ChevronDown size={13} className={`ul-site-chevron ${isOpen ? 'ul-site-chevron--open' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div role="listbox" aria-label={selector.label} className="ul-site-lang-menu">
          {selector.languages.map((language) => {
            const isActive = language.id === selector.activeId;
            return (
              <button
                key={language.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setIsOpen(false);
                  selector.onSelect(language.id);
                }}
                className={`ul-site-lang-option${isActive ? ' ul-site-lang-option--active' : ''}`}
              >
                <span className="ul-site-lang-option-label">
                  {language.flag && <span aria-hidden="true">{language.flag}</span>}
                  {language.label}
                </span>
                {isActive && <Check size={14} className="ul-site-lang-check" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserMenuDropdown({
  user,
  onLogout,
  actions,
  signOutLabel,
  profileLabel,
}: {
  user: PublicUser;
  onLogout?: () => void | Promise<void>;
  actions?: PublicUserNavAction[];
  signOutLabel?: string;
  profileLabel?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useDismissOnOutsideClick<HTMLDivElement>(isOpen, () => setIsOpen(false));

  const displayName = user.name || user.email?.split('@')[0] || profileLabel || 'Profile';
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
                <span>{signOutLabel ?? 'Sign out'}</span>
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

  useEffect(() => {
    if (location.hash) {
      // Defer one frame so the target section is painted before scrolling to it.
      const id = decodeURIComponent(location.hash.slice(1));
      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth' });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  const mainId = config.mainId ?? 'site-main';
  const mobileNav = config.mobileNavItems ?? config.navItems;

  return (
    <div className="ul-site">
      <a href={`#${mainId}`} className="ul-skip-link">
        {config.skipLabel ?? 'Skip to content'}
      </a>

      <header className="ul-site-header">
        <div className="ul-site-header-inner">
          {config.brand && (
            <div className="ul-site-brand">
              <BrandSlot value={config.brand} variant="header" />
            </div>
          )}

          <nav className="ul-site-nav" aria-label={config.navLabel ?? 'Site'}>
            {config.navItems.map((item) => (
              <NavAnchor
                key={item.to}
                item={item}
                className="ul-site-link"
                activeClassName="ul-site-link--active"
              />
            ))}
          </nav>

          <div className="ul-site-actions">
            {config.languageSelector && <LanguageMenu selector={config.languageSelector} />}
            {config.headerActions && <div className="ul-site-header-extra">{config.headerActions}</div>}

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
                  signOutLabel={config.signOutLabel}
                  profileLabel={config.profileLabel}
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
          <nav className="ul-site-mobile-nav" aria-label={config.navLabel ?? 'Site'}>
            {mobileNav.map((item) => (
              <NavAnchor
                key={item.to}
                item={item}
                className="ul-site-mobile-link"
                activeClassName="ul-site-mobile-link--active"
              />
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
                {config.footerBrand && <BrandSlot value={config.footerBrand} variant="footer" />}
                {config.footerNote && <div className="ul-site-note">{config.footerNote}</div>}
              </div>
            )}
            {config.footerColumns.map((col) => (
              <nav key={col.heading} className="ul-site-col" aria-label={col.heading}>
                <h4>{col.heading}</h4>
                {col.links.map((link) => (
                  <FooterAnchor key={link.to} to={link.to}>
                    {link.label}
                  </FooterAnchor>
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
                    <FooterAnchor key={link.to} to={link.to} className="ul-site-footer-link">
                      {link.label}
                    </FooterAnchor>
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
