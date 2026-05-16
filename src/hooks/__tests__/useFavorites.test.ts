import { act, renderHook, waitFor } from '@testing-library/react';
import { useFavorites } from '../useFavorites';
import { fetchFavorites, unfavoriteBookmark } from '@/lib/api/bookmarks';
import type { Bookmark } from '@/types/bookmark';

jest.mock('@/lib/api/bookmarks');

const mockFetchFavorites = fetchFavorites as jest.MockedFunction<typeof fetchFavorites>;
const mockUnfavoriteBookmark = unfavoriteBookmark as jest.MockedFunction<typeof unfavoriteBookmark>;

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

describe('useFavorites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts with isLoading true, empty bookmarks, and null error', () => {
    mockFetchFavorites.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useFavorites());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('populates bookmarks and sets isLoading false after successful fetch', async () => {
    const bookmarks = [makeBookmark({ id: '1' }), makeBookmark({ id: '2' })];
    mockFetchFavorites.mockResolvedValue(bookmarks);

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.bookmarks).toEqual(bookmarks);
    expect(result.current.error).toBeNull();
  });

  it('sets error and clears isLoading when fetch fails', async () => {
    mockFetchFavorites.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.error).toBe('Network error');
  });

  it('optimistically removes the bookmark before the API call resolves', async () => {
    const bookmark = makeBookmark({ id: '42' });
    mockFetchFavorites.mockResolvedValue([bookmark]);
    mockUnfavoriteBookmark.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.unfavorite('42');
    });

    expect(result.current.bookmarks).toEqual([]);
  });

  it('calls unfavoriteBookmark with the correct id', async () => {
    const bookmark = makeBookmark({ id: '7' });
    mockFetchFavorites.mockResolvedValue([bookmark]);
    mockUnfavoriteBookmark.mockResolvedValue({ id: '7', isFavorited: false });

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.unfavorite('7');
    });

    expect(mockUnfavoriteBookmark).toHaveBeenCalledWith('7');
  });

  it('restores bookmark and sets error when unfavorite API call fails', async () => {
    const bookmark = makeBookmark({ id: '3' });
    mockFetchFavorites.mockResolvedValue([bookmark]);
    mockUnfavoriteBookmark.mockRejectedValue(new Error('Server error'));

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.unfavorite('3');
    });

    expect(result.current.bookmarks).toEqual([bookmark]);
    expect(result.current.error).toBe('Server error');
  });

  it('refetch triggers a new fetch call', async () => {
    mockFetchFavorites.mockResolvedValue([]);

    const { result } = renderHook(() => useFavorites());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(mockFetchFavorites).toHaveBeenCalledTimes(2));
  });

  it('aborts the fetch when the component unmounts', () => {
    const abortSpy = jest.fn();
    const mockController = { signal: { aborted: false }, abort: abortSpy };
    jest.spyOn(global, 'AbortController').mockImplementation(() => mockController as unknown as AbortController);

    mockFetchFavorites.mockReturnValue(new Promise(() => {}));

    const { unmount } = renderHook(() => useFavorites());
    unmount();

    expect(abortSpy).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});
