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
import type { LandingBlock, TurnkeyLandingPageProps } from '../types/section';

function LandingBlockView({ block }: { block: LandingBlock }) {
  switch (block.kind) {
    case 'announcementBar': {
      const { kind: _kind, ...props } = block;
      return <LandingAnnouncementBar {...props} />;
    }
    case 'hero': {
      const { kind: _kind, ...props } = block;
      return <LandingHero {...props} />;
    }
    case 'chips': {
      const { kind: _kind, ...props } = block;
      return <LandingChips {...props} />;
    }
    case 'logoCloud': {
      const { kind: _kind, ...props } = block;
      return <LandingLogoCloud {...props} />;
    }
    case 'stats': {
      const { kind: _kind, ...props } = block;
      return <LandingStats {...props} />;
    }
    case 'section': {
      const { kind: _kind, ...props } = block;
      return <LandingSection {...props} />;
    }
    case 'bento': {
      const { kind: _kind, ...props } = block;
      return <LandingBentoGrid {...props} />;
    }
    case 'steps': {
      const { kind: _kind, ...props } = block;
      return <LandingSteps {...props} />;
    }
    case 'comparison': {
      const { kind: _kind, ...props } = block;
      return <LandingComparison {...props} />;
    }
    case 'testimonials': {
      const { kind: _kind, ...props } = block;
      return <LandingTestimonials {...props} />;
    }
    case 'pricing': {
      const { kind: _kind, ...props } = block;
      return <LandingPricing {...props} />;
    }
    case 'faq': {
      const { kind: _kind, ...props } = block;
      return <LandingFaq {...props} />;
    }
    case 'changelog': {
      const { kind: _kind, ...props } = block;
      return <LandingChangelog {...props} />;
    }
    case 'contact': {
      const { kind: _kind, ...props } = block;
      return <LandingContact {...props} />;
    }
    case 'cta': {
      const { kind: _kind, ...props } = block;
      return <LandingCta {...props} />;
    }
    case 'custom':
      return (
        <div id={block.id} className={block.className}>
          {block.children}
        </div>
      );
  }
}

export function TurnkeyLandingPage({
  config,
  layout,
  className = '',
  children,
}: TurnkeyLandingPageProps) {
  const effectiveLayout = layout ?? config.layout;

  const content = (
    <div className={`ul-land-page ${className}`.trim()}>
      {config.blocks ? (
        config.blocks.map((block, idx) => <LandingBlockView key={block.kind === 'custom' ? `custom-${idx}` : `${block.kind}-${idx}`} block={block} />)
      ) : (
        <>
          {config.announcementBar && <LandingAnnouncementBar {...config.announcementBar} />}
          {config.hero && <LandingHero {...config.hero} />}
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
        </>
      )}
      {children}
    </div>
  );

  if (effectiveLayout) {
    return <PublicSiteLayout config={effectiveLayout}>{content}</PublicSiteLayout>;
  }

  return content;
}
