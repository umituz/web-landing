export interface PublicNavLink {
  to: string;
  label: string;
}

export interface PublicFooterColumn {
  heading: string;
  links: PublicNavLink[];
}

export interface PublicLayoutConfig {
  /** Header navigation items, rendered with NavLink active-state styling. */
  navItems: PublicNavLink[];
  /** Accessible name for the header nav (defaults to the localized "Site"). */
  navLabel?: string;
  /** Brand mark (wordmark) rendered at the start of the header. */
  brand?: React.ReactNode;
  /** Primary header CTA — rendered as an ink button. */
  ctaPrimary?: PublicNavLink;
  /** Secondary header CTA — rendered as a ghost button. */
  ctaSecondary?: PublicNavLink;
  /** Brand mark inside the footer (e.g. the on-ink wordmark variant). */
  footerBrand?: React.ReactNode;
  /** Short paragraph under the footer brand. */
  footerNote?: React.ReactNode;
  /** Footer link columns. */
  footerColumns: PublicFooterColumn[];
  /** Bottom legal line. */
  footerLegal?: React.ReactNode;
  /** id of the main landmark — also the skip-link target. */
  mainId?: string;
  /** Skip-link label (a11y); defaults to the localized "Skip to content". */
  skipLabel?: string;
}
