import { render, screen } from '@testing-library/react';
import LogoCloud from '../components/sections/LogoCloud';
import StatsSection from '../components/sections/StatsSection';
import TeamSection from '../components/sections/TeamSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

// jsdom has no IntersectionObserver (used by <Reveal>)
beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
});

describe('verified-content sections', () => {
  it('render nothing while no verified content exists', () => {
    const { container } = render(
      <>
        <LogoCloud />
        <StatsSection />
        <TeamSection />
        <TestimonialsSection />
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('render real content when provided', () => {
    render(
      <>
        <LogoCloud logos={[{ name: 'Client One' }]} />
        <StatsSection stats={[{ value: '12', label: 'Launches' }]} />
        <TeamSection members={[{ name: 'Ada Lovelace', role: 'Engineer' }]} />
        <TestimonialsSection testimonials={[{ quote: 'Great partner.', name: 'Grace Hopper', role: 'CTO' }]} />
      </>
    );
    expect(screen.getByText('Client One')).toBeInTheDocument();
    expect(screen.getByText('Launches')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument(); // initials fallback when no photo
    expect(screen.getByText('Great partner.')).toBeInTheDocument();
  });

  it('switches testimonials to an accessible marquee at 4+ quotes', () => {
    const quotes = ['A', 'B', 'C', 'D'].map((n) => ({ quote: `Quote ${n}`, name: `Person ${n}`, role: 'Role' }));
    render(<TestimonialsSection testimonials={quotes} />);
    expect(screen.getByRole('region', { name: 'Client testimonials' })).toBeInTheDocument();
    // Duplicated loop copies are hidden from assistive tech: one accessible match per quote
    expect(screen.getAllByText('Quote A')).toHaveLength(2);
    expect(screen.getAllByRole('figure')).toHaveLength(4);
  });
});
