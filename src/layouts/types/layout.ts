import type { ReactNode } from 'react';

export interface PublicNavLink {
  to: string;
  label: string;
  icon?: ReactNode;
}

/** Brand rendered from data: glyph tile, name and optional tagline. */
export interface PublicBrand {
  mark: string;
  name: string;
  tagline?: string;
  to?: string;
}

export interface PublicLanguageOption {
  id: string;
  label: string;
  flag?: string;
}

export interface PublicLanguageSelector {
  /** Accessible label for the trigger and the listbox. */
  label?: string;
  languages: PublicLanguageOption[];
  activeId: string;
  onSelect: (id: string) => void;
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
  /** Rendered as the standard wordmark, or pass any ReactNode for a custom brand slot. */
  brand?: ReactNode | PublicBrand;
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
  // Built-in language switcher rendered next to the auth actions
  languageSelector?: PublicLanguageSelector;
  // Custom header actions (theme toggle, etc.)
  headerActions?: ReactNode;
  // Mobile navigation
  mobileNavItems?: PublicNavLink[];
  // Footer
  footerBrand?: ReactNode | PublicBrand;
  footerNote?: ReactNode;
  footerColumns: PublicFooterColumn[];
  footerLegal?: ReactNode;
  footerLinks?: PublicNavLink[];
  mainId?: string;
  // Chrome strings (provide translated labels from the host app)
  skipLabel?: string;
  signOutLabel?: string;
  profileLabel?: string;
}

export type LandingLayoutConfig = PublicLayoutConfig;
