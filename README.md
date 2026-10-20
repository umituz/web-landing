# @umituz/web-landing

Public marketing-site shell for the umituz fleet — the public twin of
[`@umituz/web-dashboard`](https://www.npmjs.com/package/@umituz/web-dashboard).
Dashboard owns the authenticated app chrome; this package owns the landing
site chrome. Nothing public ever lives in the dashboard package.

## What's inside

- `PublicSiteLayout` — skip link (first focusable element), header with
  brand slot + NavLink nav (active-state class) + CTA pair (DS `Button`),
  main landmark, footer brand/note/columns/legal, and scroll-restore on
  navigation (owned here — apps don't duplicate it).
- `./site.css` — `ul-*` structural stylesheet on `@umituz/web-design-system`
  semantic color variables. Import after the design-system stylesheet;
  skin via your own `ul-site-*` overrides.

## Usage

```tsx
import { PublicSiteLayout } from '@umituz/web-landing/layouts/components';
import '@umituz/web-design-system/styles.css';
import '@umituz/web-landing/site.css';

<PublicSiteLayout
  config={{
    navItems: [{ to: '/features', label: 'Features' }],
    brand: <Wordmark />,
    ctaPrimary: { to: '/signup', label: 'Open the demo' },
    footerColumns: [{ heading: 'Legal', links: [{ to: '/terms', label: 'Terms' }] }],
    footerLegal: '© 2026',
  }}
>
  {children}
</PublicSiteLayout>
```
