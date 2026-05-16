import { render, screen } from '@testing-library/react';
import LoadingState from './LoadingState';

describe('LoadingState', () => {
  it('renders 6 skeleton cards by default', () => {
    render(<LoadingState />);
    const container = screen.getByRole('status');
    expect(container.children).toHaveLength(6);
  });

  it('renders the specified count of skeleton cards', () => {
    render(<LoadingState count={3} />);
    const container = screen.getByRole('status');
    expect(container.children).toHaveLength(3);
  });

  it('container has role="status"', () => {
    render(<LoadingState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('container has an accessible label', () => {
    render(<LoadingState />);
    expect(screen.getByRole('status', { name: 'Loading favorites...' })).toBeInTheDocument();
  });
});
