import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Sprout, Map } from 'lucide-react';
import {
  LandingContainer,
  LandingHero,
  LandingChips,
  LandingSection,
  LandingSteps,
  LandingCta,
} from './index';

function renderKit(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('LandingHero', () => {
  it('renders kicker badge, accented title, CTA pair and note', () => {
    renderKit(
      <LandingHero
        kicker={{ icon: Sprout, label: 'Field OS' }}
        title="Run the farm"
        titleEm="end to end"
        lead="One workspace for every field."
        primary={{ to: '/dashboard', label: 'Open app' }}
        secondary={{ to: '/#platform', label: 'Explore' }}
        note="No card required."
      />,
    );
    expect(screen.getByText('Field OS').textContent).toBe('Field OS');
    const title = screen.getByRole('heading', { level: 1 });
    expect(title.textContent).toBe('Run the farmend to end');
    expect(title.querySelector('em')?.textContent).toBe('end to end');
    expect(screen.getByRole('link', { name: 'Open app' }).getAttribute('href')).toBe('/dashboard');
    expect(screen.getByRole('link', { name: 'Explore' }).getAttribute('href')).toBe('/#platform');
    expect(screen.getByText('No card required.').textContent).toContain('No card');
  });

  it('renders without kicker and secondary CTA', () => {
    renderKit(<LandingHero title="T" lead="L" primary={{ to: '/go', label: 'Go' }} />);
    expect(screen.queryByText('Field OS')).toBeNull();
    expect(screen.getByRole('link', { name: 'Go' }).getAttribute('href')).toBe('/go');
  });
});

describe('LandingChips', () => {
  it('renders one chip per item inside a labelled strip', () => {
    renderKit(<LandingChips items={['Fields', 'Livestock', 'Finance']} label="Modules" />);
    const strip = screen.getByLabelText('Modules');
    expect(strip.querySelectorAll('.ul-land-chip')).toHaveLength(3);
  });
});

describe('LandingSection', () => {
  it('renders id, kicker, heading, intro and featured cards with a column grid', () => {
    renderKit(
      <LandingSection
        id="platform"
        kicker="Platform"
        title="Every module"
        intro="Connected from day one."
        cards={[
          { icon: Sprout, title: 'Fields', body: 'Plan and track.' },
          { icon: Map, title: 'Maps', body: 'See every plot.' },
        ]}
        columns={2}
        featured
        alt
      />,
    );
    const section = document.getElementById('platform');
    expect(section).not.toBeNull();
    expect(section?.className).toContain('ul-land-section--alt');
    expect(screen.getByRole('heading', { level: 2, name: 'Every module' }).textContent).toBe('Every module');
    expect(screen.getByText('Connected from day one.').textContent).toContain('Connected');
    const grid = section?.querySelector('.ul-land-grid');
    expect(grid?.className).toContain('ul-land-grid--2');
    expect(grid?.querySelectorAll('.ul-land-card--featured')).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 3, name: 'Fields' }).textContent).toBe('Fields');
  });

  it('renders custom children alongside the heading', () => {
    renderKit(
      <LandingSection title="Custom">
        <p>child-content</p>
      </LandingSection>,
    );
    expect(screen.getByText('child-content').textContent).toBe('child-content');
  });
});

describe('LandingSteps', () => {
  it('renders a numbered ordered list of steps', () => {
    renderKit(
      <LandingSteps
        title="How it works"
        intro="Three steps."
        steps={[
          { icon: Sprout, title: 'Plan', body: 'Set the season.' },
          { icon: Map, title: 'Track', body: 'Follow every plot.' },
          { icon: Sprout, title: 'Harvest', body: 'Close the books.' },
        ]}
      />,
    );
    const list = screen.getByRole('list');
    expect(list.tagName).toBe('OL');
    const items = list.querySelectorAll('.ul-land-step');
    expect(items).toHaveLength(3);
    expect(items[0].querySelector('.ul-land-step-num')?.textContent).toBe('1');
    expect(items[2].querySelector('.ul-land-step-num')?.textContent).toBe('3');
  });
});

describe('LandingCta', () => {
  it('renders accented closing title and primary action', () => {
    renderKit(
      <LandingCta
        title="Bring the whole operation "
        titleEm="into one workspace"
        body="Stop stitching spreadsheets."
        primary={{ to: '/dashboard', label: 'Get started' }}
      />,
    );
    const title = screen.getByRole('heading', { level: 2 });
    expect(title.querySelector('em')?.textContent).toBe('into one workspace');
    expect(screen.getByRole('link', { name: 'Get started' }).getAttribute('href')).toBe('/dashboard');
  });
});

describe('LandingContainer', () => {
  it('wraps children in the ul-land shell', () => {
    renderKit(<LandingContainer><span>inner</span></LandingContainer>);
    expect(document.querySelector('.ul-land')).not.toBeNull();
    expect(screen.getByText('inner').textContent).toBe('inner');
  });
});
