import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritesContent from '../FavoritesContent';
import { useFavorites } from '@/hooks/useFavorites';
import type { Bookmark } from '@/types/bookmark';

jest.mock('@/hooks/useFavorites');

const mockUseFavorites = useFavorites as jest.MockedFunction<typeof useFavorites>;

const makeBookmark = (overrides: Partial<Bookmark> = {}): Bookmark => ({
  id: '1',
  title: 'Test Bookmark',
  url: 'https://example.com',
  isFavorited: true,
  tags: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

const defaultHookState = {
  bookmarks: [],
  isLoading: false,
  error: null,
  unfavorite: jest.fn(),
  refetch: jest.fn(),
};

describe('FavoritesContent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFavorites.mockReturnValue(defaultHookState);
  });

  it('renders LoadingState when isLoading is true', () => {
    mockUseFavorites.mockReturnValue({ ...defaultHookState, isLoading: true });
    render(<FavoritesContent />);
    expect(screen.getByRole('status', { name: 'Loading favorites...' })).toBeInTheDocument();
  });

  it('renders error message when error is set', () => {
    mockUseFavorites.mockReturnValue({ ...defaultHookState, error: 'Network error' });
    render(<FavoritesContent />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  it('renders retry button when error is set', () => {
    mockUseFavorites.mockReturnValue({ ...defaultHookState, error: 'Oops' });
    render(<FavoritesContent />);
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('calls refetch when retry button is clicked', async () => {
    const refetch = jest.fn();
    mockUseFavorites.mockReturnValue({ ...defaultHookState, error: 'Oops', refetch });
    render(<FavoritesContent />);
    await userEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders EmptyState when bookmarks is empty and not loading', () => {
    mockUseFavorites.mockReturnValue({ ...defaultHookState, bookmarks: [] });
    render(<FavoritesContent />);
    expect(screen.getByRole('heading', { name: 'No favorites yet' })).toBeInTheDocument();
  });

  it('renders a BookmarkCard for each bookmark', () => {
    const bookmarks = [
      makeBookmark({ id: '1', title: 'First Bookmark' }),
      makeBookmark({ id: '2', title: 'Second Bookmark' }),
    ];
    mockUseFavorites.mockReturnValue({ ...defaultHookState, bookmarks });
    render(<FavoritesContent />);
    expect(screen.getByRole('link', { name: 'First Bookmark' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Second Bookmark' })).toBeInTheDocument();
  });

  it('renders an h1 with text "Favorites"', () => {
    render(<FavoritesContent />);
    expect(screen.getByRole('heading', { level: 1, name: 'Favorites' })).toBeInTheDocument();
  });

  it('does not render BookmarkCards when loading', () => {
    const bookmarks = [makeBookmark()];
    mockUseFavorites.mockReturnValue({ ...defaultHookState, isLoading: true, bookmarks });
    render(<FavoritesContent />);
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
