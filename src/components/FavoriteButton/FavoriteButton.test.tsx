import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteButton from './FavoriteButton';

describe('FavoriteButton', () => {
  it('has aria-label "Remove from favorites" when isFavorited is true', () => {
    render(<FavoriteButton isFavorited onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Remove from favorites' })).toBeInTheDocument();
  });

  it('has aria-label "Add to favorites" when isFavorited is false', () => {
    render(<FavoriteButton isFavorited={false} onToggle={() => {}} />);
    expect(screen.getByRole('button', { name: 'Add to favorites' })).toBeInTheDocument();
  });

  it('calls onToggle when clicked', async () => {
    const onToggle = jest.fn();
    render(<FavoriteButton isFavorited onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not call onToggle when isLoading is true', async () => {
    const onToggle = jest.fn();
    render(<FavoriteButton isFavorited onToggle={onToggle} isLoading />);
    await userEvent.click(screen.getByRole('button'));
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('button is disabled when isLoading is true', () => {
    render(<FavoriteButton isFavorited onToggle={() => {}} isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('uses custom label prop as aria-label when provided', () => {
    render(<FavoriteButton isFavorited onToggle={() => {}} label="Custom label" />);
    expect(screen.getByRole('button', { name: 'Custom label' })).toBeInTheDocument();
  });
});
