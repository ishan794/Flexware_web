import { render, screen } from '@testing-library/react';
import HeroSection from '../components/sections/HeroSection';

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../lib/theme-context', () => ({
  useTheme: () => ({ theme: 'dark', toggle: jest.fn() }),
}));

describe('HeroSection', () => {
  it('renders the heading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Build Tomorrow.*Digital Products/)).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Flxware crafts cutting-edge/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<HeroSection />);
    expect(screen.getByText('Get started')).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('renders the announcement badge', () => {
    render(<HeroSection />);
    expect(screen.getByText(/AI Business Assistant/)).toBeInTheDocument();
  });
});
