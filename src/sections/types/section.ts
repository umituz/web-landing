import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

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
