import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders "No favorites yet" heading', () => {
    render(<EmptyState />);
    expect(screen.getByRole('heading', { name: 'No favorites yet' })).toBeInTheDocument();
  });

  it('renders descriptive message text', () => {
    render(<EmptyState />);
    expect(screen.getByText('Bookmarks you favorite will appear here.')).toBeInTheDocument();
  });

  it('renders a link back to the main bookmarks page', () => {
    render(<EmptyState />);
    const link = screen.getByRole('link', { name: 'Browse your bookmarks' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('has role="status" for screen reader announcement', () => {
    render(<EmptyState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
