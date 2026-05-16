import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookmarkCard from './BookmarkCard';
import type { Bookmark, Tag } from '@/types/bookmark';

const makeTag = (overrides: Partial<Tag> = {}): Tag => ({
  id: '1',
  name: 'Tag 1',
  ...overrides,
});

const makeBookmark = (overrides: Partial<Bookmark> = {}): Bookmark => ({
  id: '1',
  title: 'Example Site',
  url: 'https://example.com/path',
  isFavorited: true,
  tags: [],
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('BookmarkCard', () => {
  it('renders the bookmark title as a link to the bookmark URL', () => {
    render(<BookmarkCard bookmark={makeBookmark()} onUnfavorite={() => {}} />);
    const link = screen.getByRole('link', { name: 'Example Site' });
    expect(link).toHaveAttribute('href', 'https://example.com/path');
  });

  it('displays hostname-only URL text', () => {
    render(<BookmarkCard bookmark={makeBookmark()} onUnfavorite={() => {}} />);
    expect(screen.getByText('example.com')).toBeInTheDocument();
  });

  it('renders description when present', () => {
    render(
      <BookmarkCard
        bookmark={makeBookmark({ description: 'A great site' })}
        onUnfavorite={() => {}}
      />,
    );
    expect(screen.getByText('A great site')).toBeInTheDocument();
  });

  it('does not render description element when description is undefined', () => {
    render(<BookmarkCard bookmark={makeBookmark({ description: undefined })} onUnfavorite={() => {}} />);
    expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
  });

  it('renders up to 3 tag pills', () => {
    const tags = [
      makeTag({ id: '1', name: 'React' }),
      makeTag({ id: '2', name: 'TypeScript' }),
      makeTag({ id: '3', name: 'Next.js' }),
    ];
    render(<BookmarkCard bookmark={makeBookmark({ tags })} onUnfavorite={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
  });

  it('shows "+N more" label when there are more than 3 tags', () => {
    const tags = [
      makeTag({ id: '1', name: 'React' }),
      makeTag({ id: '2', name: 'TypeScript' }),
      makeTag({ id: '3', name: 'Next.js' }),
      makeTag({ id: '4', name: 'Tailwind' }),
      makeTag({ id: '5', name: 'Jest' }),
    ];
    render(<BookmarkCard bookmark={makeBookmark({ tags })} onUnfavorite={() => {}} />);
    expect(screen.getByText('+2 more')).toBeInTheDocument();
    expect(screen.queryByText('Tailwind')).not.toBeInTheDocument();
  });

  it('renders favicon image when faviconUrl is provided', () => {
    const { container } = render(
      <BookmarkCard
        bookmark={makeBookmark({ faviconUrl: 'https://example.com/favicon.ico' })}
        onUnfavorite={() => {}}
      />,
    );
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('src', 'https://example.com/favicon.ico');
  });

  it('renders a fallback src when faviconUrl is undefined', () => {
    const { container } = render(
      <BookmarkCard
        bookmark={makeBookmark({ faviconUrl: undefined })}
        onUnfavorite={() => {}}
      />,
    );
    const img = container.querySelector('img')!;
    expect(img.getAttribute('src')).toContain('data:image/svg+xml');
  });

  it('swaps favicon to fallback src on image error', () => {
    const { container } = render(
      <BookmarkCard
        bookmark={makeBookmark({ faviconUrl: 'https://example.com/favicon.ico' })}
        onUnfavorite={() => {}}
      />,
    );
    const img = container.querySelector('img')!;
    fireEvent.error(img);
    expect(img.getAttribute('src')).toContain('data:image/svg+xml');
  });

  it('calls onUnfavorite with the correct bookmark id when FavoriteButton is clicked', async () => {
    const onUnfavorite = jest.fn();
    render(<BookmarkCard bookmark={makeBookmark({ id: '99' })} onUnfavorite={onUnfavorite} />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove from favorites' }));
    expect(onUnfavorite).toHaveBeenCalledWith('99');
  });
});
