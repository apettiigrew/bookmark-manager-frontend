import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('NavBar', () => {
  it('renders a link to "/" labeled "Bookmarks"', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavBar />);
    expect(screen.getByRole('link', { name: 'Bookmarks' })).toHaveAttribute('href', '/');
  });

  it('renders a link to "/favorites" labeled "Favorites"', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavBar />);
    expect(screen.getByRole('link', { name: 'Favorites' })).toHaveAttribute('href', '/favorites');
  });

  it('applies active style to the "/favorites" link when pathname is "/favorites"', () => {
    mockUsePathname.mockReturnValue('/favorites');
    render(<NavBar />);
    const favLink = screen.getByRole('link', { name: 'Favorites' });
    expect(favLink.className).toContain('border-blue-600');
    expect(favLink.className).toContain('text-blue-600');
  });

  it('applies active style to the "/" link when pathname is "/"', () => {
    mockUsePathname.mockReturnValue('/');
    render(<NavBar />);
    const homeLink = screen.getByRole('link', { name: 'Bookmarks' });
    expect(homeLink.className).toContain('border-blue-600');
    expect(homeLink.className).toContain('text-blue-600');
  });

  it('does not apply active style to "/" link when pathname is "/favorites"', () => {
    mockUsePathname.mockReturnValue('/favorites');
    render(<NavBar />);
    const homeLink = screen.getByRole('link', { name: 'Bookmarks' });
    expect(homeLink.className).not.toContain('border-blue-600');
  });
});
