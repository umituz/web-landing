export interface PublicNavLink {
  to: string;
  label: string;
}

export interface PublicFooterColumn {
  heading: string;
  links: PublicNavLink[];
}

export interface PublicLayoutConfig {
  navItems: PublicNavLink[];
  navLabel?: string;
  brand?: React.ReactNode;
  ctaPrimary?: PublicNavLink;
  ctaSecondary?: PublicNavLink;
  footerBrand?: React.ReactNode;
  footerNote?: React.ReactNode;
  footerColumns: PublicFooterColumn[];
  footerLegal?: React.ReactNode;
  mainId?: string;
  skipLabel?: string;
}
