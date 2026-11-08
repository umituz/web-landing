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

### Link behavior

Every link slot (`navItems`, `mobileNavItems`, `footerColumns`, `footerLinks`)
renders the right element for its `to` value:

- **Route hrefs** (`/features`) → `NavLink` with active-state styling
  (nav) or `Link` (footer).
- **Hash anchors** (`/#features`) → `Link` without active state — hash items
  never carry `aria-current` or `--active`. The layout scrolls the target
  into view (smooth, deferred one frame) on mount and hash change; give the
  target section `scroll-margin-top` in host CSS so the sticky header
  doesn't cover it.
- **External hrefs** (`https://…`, `mailto:`, `tel:`, `//…`) → a plain
  `<a>`; web URLs additionally get `target="_blank" rel="noreferrer"`.

### Responsive header actions

`headerActions` is wrapped in `.ul-site-header-extra`, which hides below
640px — the same responsive behavior as the CTA buttons. Mobile users reach
those destinations through `mobileNavItems`, so mirror any header action
there (one line of config).

### Brand mark

`PublicBrand.mark` accepts a string (rendered in the glyph tile) or any
`ReactNode` — e.g. a lucide icon or inline SVG — inside the same tile.

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

## Landing section kit (1.6.0)

`PublicSiteLayout` owns the site chrome; the section kit owns the landing
**content skeleton** — hero, chip strip, feature sections, steps and the
closing CTA that every fleet landing was hand-rolling in per-project CSS.
Components live next to the shell, are styled by the same `site.css`
(`ul-land-*` on `@umituz/web-design-system` semantic tokens) and consume DS
atoms directly: `Button` for every CTA, `Badge` for the hero kicker.

```tsx
import {
  LandingContainer,
  LandingHero,
  LandingChips,
  LandingSection,
  LandingSteps,
  LandingCta,
} from '@umituz/web-landing/sections';

<LandingContainer>
  <LandingHero
    kicker={{ icon: Leaf, label: 'Farm operations' }}
    title="Run the farm "
    titleEm="end to end"
    lead="One workspace for fields, livestock and finance."
    primary={{ to: '/dashboard', label: 'Open the app' }}
    secondary={{ to: '/#platform', label: 'Explore the platform' }}
    note="Sign in with an email magic link."
  />
  <LandingChips items={['Fields', 'Livestock', 'Poultry', 'Finance']} label="Modules" />
  <LandingSection
    id="platform"
    kicker="Platform"
    title="Every module your operation needs"
    intro="Fourteen connected modules replace the spreadsheet stack."
    cards={[
      { icon: Sprout, title: 'Fields', body: 'Plan, sow and track every plot.' },
      { icon: Beef, title: 'Livestock', body: 'Herd records, health and yields.' },
    ]}
    alt
  />
  <LandingSteps
    title="How it works"
    steps={[
      { icon: Compass, title: 'Plan', body: 'Set the season.' },
      { icon: Map, title: 'Track', body: 'Follow every plot.' },
    ]}
  />
  <LandingCta
    title="Bring the whole operation "
    titleEm="into one workspace"
    body="Stop stitching spreadsheets together."
    primary={{ to: '/dashboard', label: 'Get started' }}
  />
</LandingContainer>
```

- `LandingHero` — DS `Badge` kicker with optional lucide icon, `title` +
  `titleEm` (the `<em>` accent), lead, CTA pair (DS `Button`), note.
- `LandingChips` — module strip under the hero.
- `LandingSection` — `id` (hash-scroll target), optional kicker/title/intro,
  `cards` (icon + title + body) or custom `children`, `alt` band,
  `featured` cards, `columns` 2/3/4.
- `LandingSteps` — numbered ordered list with icons.
- `LandingCta` — closing panel with `titleEm` accent and primary action.
- `LandingContainer` — the `.ul-land` wrapper; drop it inside
  `PublicSiteLayout`.
