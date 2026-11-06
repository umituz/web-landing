import type { ReactNode } from 'react';

export interface PublicNavLink {
  to: string;
  label: string;
  icon?: ReactNode;
}

export interface PublicFooterColumn {
  heading: string;
  links: PublicNavLink[];
}

export interface PublicUserNavAction {
  to?: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void | Promise<void>;
  danger?: boolean;
}

export interface PublicUser {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
}

export interface PublicLayoutConfig {
  navItems: PublicNavLink[];
  navLabel?: string;
  brand?: ReactNode;
  ctaPrimary?: PublicNavLink;
  ctaSecondary?: PublicNavLink;
  // Auth & Session
  user?: PublicUser | null;
  onLogout?: () => void | Promise<void>;
  userMenuActions?: PublicUserNavAction[];
  authCta?: {
    login?: PublicNavLink;
    register?: PublicNavLink;
    app?: PublicNavLink;
  };
  // Custom header actions (Language switcher, theme toggle, etc.)
  headerActions?: ReactNode;
  // Mobile navigation
  mobileNavItems?: PublicNavLink[];
  // Footer
  footerBrand?: ReactNode;
  footerNote?: ReactNode;
  footerColumns: PublicFooterColumn[];
  footerLegal?: ReactNode;
  footerLinks?: PublicNavLink[];
  mainId?: string;
  skipLabel?: string;
}

export type LandingLayoutConfig = PublicLayoutConfig;
