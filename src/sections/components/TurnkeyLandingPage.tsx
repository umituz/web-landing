import { LandingHero } from './LandingHero';
import { LandingLogoCloud } from './LandingLogoCloud';
import { LandingStats } from './LandingStats';
import { LandingSection } from './LandingSection';
import { LandingBentoGrid } from './LandingBentoGrid';
import { LandingSteps } from './LandingSteps';
import { LandingComparison } from './LandingComparison';
import { LandingTestimonials } from './LandingTestimonials';
import { LandingPricing } from './LandingPricing';
import { LandingFaq } from './LandingFaq';
import { LandingChangelog } from './LandingChangelog';
import { LandingContact } from './LandingContact';
import { LandingCta } from './LandingCta';
import type { TurnkeyLandingPageProps } from '../types/section';

export function TurnkeyLandingPage({ config, className = '' }: TurnkeyLandingPageProps) {
  return (
    <div className={`ul-land-page ${className}`.trim()}>
      <LandingHero {...config.hero} />
      {config.logoCloud && <LandingLogoCloud {...config.logoCloud} />}
      {config.stats && <LandingStats {...config.stats} />}
      {config.section && <LandingSection {...config.section} />}
      {config.bento && <LandingBentoGrid {...config.bento} />}
      {config.steps && <LandingSteps {...config.steps} />}
      {config.comparison && <LandingComparison {...config.comparison} />}
      {config.testimonials && <LandingTestimonials {...config.testimonials} />}
      {config.pricing && <LandingPricing {...config.pricing} />}
      {config.faq && <LandingFaq {...config.faq} />}
      {config.changelog && <LandingChangelog {...config.changelog} />}
      {config.contact && <LandingContact {...config.contact} />}
      {config.cta && <LandingCta {...config.cta} />}
    </div>
  );
}
