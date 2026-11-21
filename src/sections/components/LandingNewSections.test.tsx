import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Mail, Sparkles } from 'lucide-react';
import { LandingPageScaffold } from './LandingPageScaffold';
import { LandingStats } from './LandingStats';
import { LandingLogoCloud } from './LandingLogoCloud';
import { LandingContact } from './LandingContact';
import { LandingChangelog } from './LandingChangelog';
import { TurnkeyLandingPage } from './TurnkeyLandingPage';

function renderKit(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('LandingPageScaffold', () => {
  it('renders kicker, title, titleEm, intro, and children', () => {
    renderKit(
      <LandingPageScaffold
        id="about-scaffold"
        kicker="About Texora"
        title="We build"
        titleEm="modern tools"
        intro="The future of textile supply chain."
        alt
      >
        <div data-testid="scaffold-child">Child Content</div>
      </LandingPageScaffold>
    );

    expect(screen.getByText('About Texora')).toBeTruthy();
    expect(screen.getByText(/We build/)).toBeTruthy();
    expect(screen.getByText('modern tools')).toBeTruthy();
    expect(screen.getByText('The future of textile supply chain.')).toBeTruthy();
    expect(screen.getByTestId('scaffold-child')).toBeTruthy();
  });
});

describe('LandingStats', () => {
  it('renders stats metrics with badges and descriptions', () => {
    const stats = [
      { value: '99.99%', label: 'Uptime SLA', badge: 'High Availability' },
      { value: '10M+', label: 'Events processed', description: 'Real-time telemetry daily' },
    ];

    renderKit(
      <LandingStats
        id="stats-sec"
        kicker="Performance"
        title="Engineered for reliability"
        stats={stats}
      />
    );

    expect(screen.getByText('Performance')).toBeTruthy();
    expect(screen.getByText('Engineered for reliability')).toBeTruthy();
    expect(screen.getByText('99.99%')).toBeTruthy();
    expect(screen.getByText('Uptime SLA')).toBeTruthy();
    expect(screen.getByText('High Availability')).toBeTruthy();
    expect(screen.getByText('10M+')).toBeTruthy();
    expect(screen.getByText('Real-time telemetry daily')).toBeTruthy();
  });
});

describe('LandingLogoCloud', () => {
  it('renders partner logos and links', () => {
    const logos = [
      { name: 'Acme Corp', href: 'https://acme.example' },
      { name: 'Beta Systems' },
    ];

    renderKit(<LandingLogoCloud title="Trusted by teams worldwide" logos={logos} />);

    expect(screen.getByText('Trusted by teams worldwide')).toBeTruthy();
    const acmeLink = screen.getByTitle('Acme Corp');
    expect(acmeLink.getAttribute('href')).toBe('https://acme.example');
    expect(screen.getByTitle('Beta Systems')).toBeTruthy();
  });
});

describe('LandingContact', () => {
  it('renders direct channels and submits form', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    const channels = [
      { icon: Mail, title: 'Support', detail: 'support@example.com', href: 'mailto:support@example.com' },
    ];

    renderKit(
      <LandingContact
        id="contact"
        title="Get in touch"
        channels={channels}
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByText('Get in touch')).toBeTruthy();
    expect(screen.getByText('Support')).toBeTruthy();
    expect(screen.getByText('support@example.com')).toBeTruthy();

    const nameInput = screen.getByPlaceholderText('Jane Doe');
    const emailInput = screen.getByPlaceholderText('jane@company.com');
    const messageInput = screen.getByPlaceholderText('Tell us about your project or inquiry...');

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'We need enterprise pricing.' } });

    fireEvent.click(screen.getByText('Send message'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'Alice',
        email: 'alice@example.com',
        subject: '',
        message: 'We need enterprise pricing.',
      });
      expect(screen.getByText('Thank you! Your message has been sent successfully.')).toBeTruthy();
    });
  });
});

describe('LandingChangelog', () => {
  it('renders timeline entries with versions and badges', () => {
    const entries = [
      {
        version: 'v2.0.0',
        date: 'November 2026',
        title: 'Major Engine Upgrade',
        summary: 'Complete overhaul of performance and presentation.',
        badge: { label: 'Major', variant: 'success' as const },
        items: ['Turnkey billing pages', 'AI presentation layer'],
      },
    ];

    renderKit(
      <LandingChangelog
        title="Product Changelog"
        entries={entries}
      />
    );

    expect(screen.getByText('Product Changelog')).toBeTruthy();
    expect(screen.getByText('v2.0.0')).toBeTruthy();
    expect(screen.getByText('November 2026')).toBeTruthy();
    expect(screen.getByText('Major Engine Upgrade')).toBeTruthy();
    expect(screen.getByText('Major')).toBeTruthy();
    expect(screen.getByText('Turnkey billing pages')).toBeTruthy();
    expect(screen.getByText('AI presentation layer')).toBeTruthy();
  });
});

describe('TurnkeyLandingPage', () => {
  it('renders full declarative landing page', () => {
    renderKit(
      <TurnkeyLandingPage
        config={{
          hero: {
            kicker: { icon: Sparkles, label: 'New Release' },
            title: 'Modern Platform',
            lead: 'Build and scale faster.',
          },
          stats: {
            stats: [{ value: '99.9%', label: 'Uptime' }],
          },
          cta: {
            title: 'Start building today',
            body: 'Zero setup required.',
            primary: { to: '/register', label: 'Get Started' },
          },
        }}
      />
    );

    expect(screen.getByText('New Release')).toBeTruthy();
    expect(screen.getByText('Modern Platform')).toBeTruthy();
    expect(screen.getByText('99.9%')).toBeTruthy();
    expect(screen.getByText('Start building today')).toBeTruthy();
  });
});
