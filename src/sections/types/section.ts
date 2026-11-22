import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PublicLayoutConfig } from '../../layouts/types/layout';

export interface LandingAction {
  to: string;
  label: string;
}

export interface LandingKicker {
  icon?: LucideIcon;
  label: string;
}

export interface LandingChipItem {
  to: string;
  label: string;
  icon?: ReactNode;
}

export interface LandingStatItem {
  value: string;
  label: string;
}

export interface LandingContainerProps {
  children: ReactNode;
}

export interface LandingHeroProps {
  kicker?: LandingKicker;
  title: string;
  titleEm?: string;
  lead: string;
  primary?: LandingAction;
  secondary?: LandingAction;
  note?: string;
  stats?: readonly LandingStatItem[];
}

export interface LandingChipsProps {
  items: readonly (string | LandingChipItem)[];
  label?: string;
}

export interface LandingCardData {
  icon?: LucideIcon;
  title: string;
  body?: string;
  points?: readonly string[];
  to?: string;
  cta?: string;
}

export interface LandingCardProps extends LandingCardData {
  featured?: boolean;
}

export interface LandingSectionProps {
  id?: string;
  kicker?: string;
  title: string;
  intro?: string;
  cards?: LandingCardData[];
  children?: ReactNode;
  action?: LandingAction;
  alt?: boolean;
  featured?: boolean;
  columns?: 2 | 3 | 4;
}

export interface LandingStepData {
  icon?: LucideIcon;
  title: string;
  body: string;
}

export interface LandingStepsProps {
  id?: string;
  kicker?: string;
  title: string;
  intro?: string;
  steps: LandingStepData[];
}

export interface LandingCtaProps {
  title: string;
  titleEm?: string;
  body: string;
  primary: LandingAction;
  secondary?: LandingAction;
}

export interface LandingPricingPlan {
  name: string;
  badge?: string;
  price: string;
  period?: string;
  description?: string;
  features: readonly string[];
  action: LandingAction;
  featured?: boolean;
}

export interface LandingPricingBillingToggle {
  monthlyLabel: string;
  annualLabel: string;
  isAnnual: boolean;
  onToggle: (annual: boolean) => void;
  discountBadge?: string;
}

export interface LandingPricingProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  billingToggle?: LandingPricingBillingToggle;
  plans: readonly LandingPricingPlan[];
  note?: string;
}

export interface LandingFaqItem {
  question: string;
  answer: ReactNode;
}

export interface LandingFaqProps {
  id?: string;
  kicker?: string;
  title: string;
  intro?: string;
  items: readonly LandingFaqItem[];
}

export interface LandingTestimonialItem {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
}

export interface LandingTestimonialsProps {
  id?: string;
  kicker?: string;
  title: string;
  intro?: string;
  testimonials: readonly LandingTestimonialItem[];
  columns?: 2 | 3;
}

export interface LandingPageScaffoldProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  children: ReactNode;
  alt?: boolean;
  className?: string;
}

export interface LandingStatsItem {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface LandingStatsProps {
  id?: string;
  kicker?: string;
  title?: string;
  titleEm?: string;
  intro?: string;
  stats: readonly LandingStatsItem[];
  columns?: 2 | 3 | 4;
  alt?: boolean;
  className?: string;
}

export interface LandingLogoItem {
  name: string;
  logo?: ReactNode;
  href?: string;
}

export interface LandingLogoCloudProps {
  id?: string;
  title?: string;
  logos: readonly LandingLogoItem[];
  alt?: boolean;
  className?: string;
}

export interface LandingContactChannel {
  icon?: LucideIcon;
  title: string;
  detail: string;
  note?: string;
  href?: string;
}

export interface LandingContactProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  channels?: readonly LandingContactChannel[];
  onSubmit?: (data: { name: string; email: string; subject?: string; message: string }) => void | Promise<void>;
  submitLabel?: string;
  successMessage?: string;
  alt?: boolean;
  className?: string;
}

export interface LandingChangelogItem {
  version: string;
  date: string;
  title: string;
  summary?: string;
  badge?: {
    label: string;
    variant?: 'success' | 'warning' | 'info' | 'neutral' | 'primary' | 'outline';
  };
  items: readonly string[];
}

export interface LandingChangelogProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  entries: readonly LandingChangelogItem[];
  alt?: boolean;
  className?: string;
}

export interface LandingBentoItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  badge?: string;
  colSpan?: 1 | 2 | 3;
  visual?: ReactNode;
  action?: LandingAction;
  tags?: readonly string[];
  children?: ReactNode;
}

export interface LandingBentoGridProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  items: readonly LandingBentoItem[];
  columns?: 2 | 3 | 4;
  alt?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface LandingComparisonTier {
  id: string;
  name: string;
  badge?: string;
  highlight?: boolean;
  action?: LandingAction;
}

export interface LandingComparisonRow {
  category?: string;
  isCategoryHeader?: boolean;
  name: string;
  description?: string;
  values?: Record<string, boolean | string>;
}

export interface LandingComparisonProps {
  id?: string;
  kicker?: string;
  title: string;
  titleEm?: string;
  intro?: string;
  tiers: readonly LandingComparisonTier[];
  rows: readonly LandingComparisonRow[];
  alt?: boolean;
  className?: string;
}

export interface LandingAnnouncementBarProps {
  id?: string;
  badge?: string;
  text: string;
  action?: LandingAction;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export interface TurnkeyLandingPageConfig {
  hero: LandingHeroProps;
  announcementBar?: LandingAnnouncementBarProps;
  chips?: LandingChipsProps;
  logoCloud?: LandingLogoCloudProps;
  stats?: LandingStatsProps;
  section?: LandingSectionProps;
  sections?: readonly LandingSectionProps[];
  bento?: LandingBentoGridProps;
  bentos?: readonly LandingBentoGridProps[];
  steps?: LandingStepsProps;
  comparison?: LandingComparisonProps;
  comparisons?: readonly LandingComparisonProps[];
  testimonials?: LandingTestimonialsProps;
  pricing?: LandingPricingProps;
  faq?: LandingFaqProps;
  changelog?: LandingChangelogProps;
  contact?: LandingContactProps;
  cta?: LandingCtaProps;
  layout?: PublicLayoutConfig;
}

export interface TurnkeyLandingPageProps {
  config: TurnkeyLandingPageConfig;
  layout?: PublicLayoutConfig;
  className?: string;
  children?: ReactNode;
}
