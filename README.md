# @umituz/web-landing

Public marketing-site shell for the umituz fleet — the public twin of
[`@umituz/web-dashboard`](https://www.npmjs.com/package/@umituz/web-dashboard).
Dashboard owns the authenticated app chrome; this package owns the landing
site chrome. Nothing public ever lives in the dashboard package.

## What's inside

- `PublicSiteLayout` — skip link (first focusable element), header with
  brand wordmark + NavLink nav (active-state class) + CTA pair (DS `Button`),
  built-in language selector, user menu with dropdown, main landmark,
  footer brand/note/columns/legal, and scroll-restore on navigation
  (owned here — apps don't duplicate it).
- `./site.css` — `ul-*` structural stylesheet on `@umituz/web-design-system`
  semantic color variables. Import after the design-system stylesheet;
  skin via your own `ul-site-*` overrides.

## Usage

Everything is config. The host app supplies content (labels, routes,
translations); the package owns structure and behavior.

```tsx
import { PublicSiteLayout } from '@umituz/web-landing/layouts/components';
import '@umituz/web-design-system/styles.css';
import '@umituz/web-landing/site.css';

<PublicSiteLayout
  config={{
    // Brand as data renders the standard wordmark (ReactNode still works for custom brands)
    brand: { mark: 'H', name: 'Hangora', tagline: 'Every language, one workspace.' },
    navItems: [{ to: '/features', label: 'Features' }],
    // Built-in language selector — no per-app toggle component
    languageSelector: {
      label: 'Interface language',
      activeId,
      languages: [{ id: 'en', label: 'English', flag: '🇬🇧' }],
      onSelect: setActiveId,
    },
    user: { name, email, avatarUrl },
    authCta: {
      login: { to: '/login', label: 'Sign in' },
      register: { to: '/login?mode=register', label: 'Get started' },
      app: { to: '/app', label: 'Open the app' },
    },
    footerBrand: { mark: 'H', name: 'Hangora' },
    footerColumns: [{ heading: 'Legal', links: [{ to: '/terms', label: 'Terms' }] }],
    footerLegal: '© 2026',
    // Chrome strings — pass translated labels from the host i18n
    skipLabel: 'Skip to content',
    signOutLabel: 'Sign out',
    profileLabel: 'Profile',
  }}
>
  {children}
</PublicSiteLayout>
```

The package is i18n-agnostic: every visible chrome string comes from the
config, so the host app decides how it is translated.
