import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router';
import { PublicSiteLayout } from './PublicSiteLayout';
import type { PublicLayoutConfig } from '../types/layout';

const config: PublicLayoutConfig = {
  navItems: [
    { to: '/features', label: 'Features' },
    { to: '/pricing', label: 'Pricing' },
  ],
  brand: <a href="/">Brand</a>,
  ctaPrimary: { to: '/signup', label: 'Open the demo' },
  ctaSecondary: { to: '/signin', label: 'Sign in' },
  footerBrand: <a href="/">Brand</a>,
  footerNote: 'An independent workspace.',
  footerColumns: [
    { heading: 'Product', links: [{ to: '/features', label: 'Features' }, { to: '/pricing', label: 'Pricing' }] },
    { heading: 'Legal', links: [{ to: '/terms', label: 'Terms' }] },
  ],
  footerLegal: '© 2026',
};

function renderAt(path: string, overrides: Partial<PublicLayoutConfig> = {}) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="*" element={<PublicSiteLayout config={{ ...config, ...overrides }}>page-content</PublicSiteLayout>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('PublicSiteLayout', () => {
  it('renders a skip link targeting the main landmark', () => {
    renderAt('/features');
    expect(screen.getByRole('link', { name: /skip to content/i }).getAttribute('href')).toBe('#site-main');
    expect(document.getElementById('site-main')).not.toBeNull();
  });

  it('marks the active nav route and leaves others plain', () => {
    renderAt('/pricing');
    const activePricing = screen.getAllByRole('link', { name: 'Pricing', current: 'page' });
    const active = activePricing.find((el) => el.className.includes('ul-site-link')) as HTMLElement;
    expect(active.className).toContain('ul-site-link--active');
    const idle = screen.getAllByRole('link', { name: 'Features' }).find((el) => el.className.includes('ul-site-link')) as HTMLElement;
    expect(idle.className).not.toContain('ul-site-link--active');
  });

  it('renders user dropdown and app button when user is logged in', () => {
    const loggedInConfig: PublicLayoutConfig = {
      ...config,
      user: { name: 'Alice Smith', email: 'alice@example.com' },
      authCta: {
        app: { to: '/app', label: 'Go to App' },
      },
    };
    render(
      <MemoryRouter initialEntries={['/features']}>
        <Routes>
          <Route path="*" element={<PublicSiteLayout config={loggedInConfig}>page-content</PublicSiteLayout>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Go to App' })).toBeTruthy();
    expect(screen.getByText('Alice Smith')).toBeTruthy();
  });

  it('renders CTA buttons, footer columns and the legal line', () => {
    renderAt('/features');
    expect(screen.getByRole('link', { name: 'Open the demo' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Sign in' })).toBeTruthy();
    expect(screen.getByRole('contentinfo')).toBeTruthy();
    expect(screen.getByRole('navigation', { name: 'Legal' })).toBeTruthy();
    expect(screen.getByText('© 2026')).toBeTruthy();
  });

  it('renders children inside the main landmark', () => {
    renderAt('/features');
    expect(document.getElementById('site-main')?.textContent).toContain('page-content');
  });

  it('renders the standard wordmark from brand data', () => {
    renderAt('/features', {
      brand: { mark: 'H', name: 'Hangora', tagline: 'One workspace.', to: '/' },
      footerBrand: { mark: 'H', name: 'Hangora' },
    });
    const headerBrand = document.querySelector('.ul-site-brand .ul-site-brand-link') as HTMLAnchorElement;
    expect(headerBrand.getAttribute('href')).toBe('/');
    expect(headerBrand.textContent).toContain('H');
    expect(headerBrand.textContent).toContain('Hangora');
    expect(headerBrand.textContent).toContain('One workspace.');
    const footerBrand = document.querySelector('.ul-site-footer-brand .ul-site-brand-link') as HTMLAnchorElement;
    expect(footerBrand.textContent).toContain('Hangora');
    expect(footerBrand.textContent).not.toContain('One workspace.');
  });

  it('renders the built-in language selector and reports selections', () => {
    const onSelect = vi.fn();
    renderAt('/features', {
      languageSelector: {
        label: 'Interface language',
        activeId: 'en',
        languages: [
          { id: 'en', label: 'English', flag: '🇬🇧' },
          { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
        ],
        onSelect,
      },
    });
    const trigger = screen.getByRole('button', { name: 'Interface language' });
    expect(trigger.textContent).toContain('English');
    fireEvent.click(trigger);
    const listbox = screen.getByRole('listbox', { name: 'Interface language' });
    expect(listbox).toBeTruthy();
    const option = screen.getByRole('option', { name: /Türkçe/ });
    expect(option.getAttribute('aria-selected')).toBe('false');
    fireEvent.click(option);
    expect(onSelect).toHaveBeenCalledWith('tr');
  });

  it('uses configured chrome labels for sign out and fallback name', () => {
    renderAt('/features', {
      user: { name: null, email: 'member@example.com' },
      onLogout: () => {},
      signOutLabel: 'Çıkış yap',
      profileLabel: 'Profil',
    });
    fireEvent.click(screen.getByRole('button', { name: /member/i }));
    expect(screen.getByText('Çıkış yap')).toBeTruthy();
  });

  it('renders external and mailto footer links as plain anchors', () => {
    renderAt('/features', {
      footerColumns: [
        {
          heading: 'Contact',
          links: [
            { to: 'mailto:hi@example.com', label: 'Email the team' },
            { to: 'https://docs.example.com', label: 'External docs' },
          ],
        },
      ],
      footerLinks: [{ to: 'https://status.example.com', label: 'Status page' }],
    });
    const mail = screen.getByRole('link', { name: 'Email the team' }) as HTMLAnchorElement;
    expect(mail.getAttribute('href')).toBe('mailto:hi@example.com');
    expect(mail.getAttribute('target')).toBeNull();
    const docs = screen.getByRole('link', { name: 'External docs' }) as HTMLAnchorElement;
    expect(docs.getAttribute('href')).toBe('https://docs.example.com');
    expect(docs.getAttribute('target')).toBe('_blank');
    expect(docs.getAttribute('rel')).toBe('noreferrer');
    const status = screen.getByRole('link', { name: 'Status page' }) as HTMLAnchorElement;
    expect(status.getAttribute('href')).toBe('https://status.example.com');
  });

  it('renders hash anchor nav items without route-active state', () => {
    renderAt('/', {
      navItems: [
        { to: '/#features', label: 'Features' },
        { to: '/#pricing', label: 'Pricing' },
      ],
      mobileNavItems: [
        { to: '/#features', label: 'Features' },
        { to: '/#pricing', label: 'Pricing' },
      ],
    });
    const links = screen
      .getAllByRole('link')
      .filter((el) => el.className.includes('ul-site-link') || el.className.includes('ul-site-mobile-link'));
    expect(links.length).toBeGreaterThanOrEqual(4);
    for (const link of links) {
      expect(link.className).not.toContain('--active');
      expect(link.getAttribute('aria-current')).toBeNull();
    }
  });

  it('scrolls the hash target into view instead of resetting scroll', async () => {
    const scrollIntoView = vi.fn();
    const section = document.createElement('section');
    section.id = 'pricing';
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);
    try {
      renderAt('/#pricing');
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' }));
    } finally {
      section.remove();
    }
  });

  it('renders a node brand mark inside the glyph tile', () => {
    renderAt('/features', {
      brand: { mark: <span aria-hidden="true">★</span>, name: 'Starfleet' },
    });
    const tile = document.querySelector('.ul-site-brand-mark') as HTMLElement;
    expect(tile.textContent).toContain('★');
  });

  it('wraps custom header actions in the responsive container', () => {
    renderAt('/features', {
      headerActions: <button type="button">Toggle theme</button>,
    });
    const wrapper = document.querySelector('.ul-site-header-extra') as HTMLElement;
    expect(wrapper.querySelector('button')?.textContent).toBe('Toggle theme');
  });
});
