import { PublicSiteLayout } from '../../layouts/components/PublicSiteLayout';
import { LandingAnnouncementBar } from './LandingAnnouncementBar';
import { LandingChips } from './LandingChips';
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

export function TurnkeyLandingPage({
  config,
  layout,
  className = '',
  children,
}: TurnkeyLandingPageProps) {
  const effectiveLayout = layout ?? config.layout;

  const content = (
    <div className={`ul-land-page ${className}`.trim()}>
      {config.announcementBar && <LandingAnnouncementBar {...config.announcementBar} />}
      <LandingHero {...config.hero} />
      {config.chips && <LandingChips {...config.chips} />}
      {config.logoCloud && <LandingLogoCloud {...config.logoCloud} />}
      {config.stats && <LandingStats {...config.stats} />}
      {config.section && <LandingSection {...config.section} />}
      {config.sections?.map((s, idx) => (
        <LandingSection key={s.id ?? `section-${idx}`} {...s} />
      ))}
      {config.bento && <LandingBentoGrid {...config.bento} />}
      {config.bentos?.map((b, idx) => (
        <LandingBentoGrid key={b.id ?? `bento-${idx}`} {...b} />
      ))}
      {config.steps && <LandingSteps {...config.steps} />}
      {config.comparison && <LandingComparison {...config.comparison} />}
      {config.comparisons?.map((c, idx) => (
        <LandingComparison key={c.id ?? `comp-${idx}`} {...c} />
      ))}
      {config.testimonials && <LandingTestimonials {...config.testimonials} />}
      {config.pricing && <LandingPricing {...config.pricing} />}
      {config.faq && <LandingFaq {...config.faq} />}
      {config.changelog && <LandingChangelog {...config.changelog} />}
      {config.contact && <LandingContact {...config.contact} />}
      {config.cta && <LandingCta {...config.cta} />}
      {children}
    </div>
  );

  if (effectiveLayout) {
    return <PublicSiteLayout config={effectiveLayout}>{content}</PublicSiteLayout>;
  }

  return content;
}
