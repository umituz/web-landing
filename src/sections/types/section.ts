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
}

export interface LandingChipsProps {
  items: string[];
  label?: string;
}

export interface LandingCardData {
  icon?: LucideIcon;
  title: string;
  body: string;
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
