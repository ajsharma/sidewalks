import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    
    // Check for key elements
    expect(screen.getByAltText('Next.js logo')).toBeInTheDocument();
    expect(screen.getByText('Get started by editing')).toBeInTheDocument();
    expect(screen.getByText('src/app/page.tsx')).toBeInTheDocument();
  });

  it('displays the main navigation links', () => {
    render(<Home />);
    
    expect(screen.getByRole('link', { name: /deploy now/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /read our docs/i })).toBeInTheDocument();
  });

  it('displays footer links', () => {
    render(<Home />);
    
    expect(screen.getByRole('link', { name: /learn/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /examples/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go to nextjs.org/i })).toBeInTheDocument();
  });

  it('has proper external link attributes', () => {
    render(<Home />);
    
    const deployLink = screen.getByRole('link', { name: /deploy now/i });
    expect(deployLink).toHaveAttribute('target', '_blank');
    expect(deployLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays the correct instructions', () => {
    render(<Home />);
    
    expect(screen.getByText('Save and see your changes instantly.')).toBeInTheDocument();
  });
});