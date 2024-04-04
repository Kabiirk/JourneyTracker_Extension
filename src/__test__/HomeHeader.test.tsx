/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeHeader from '../components/HomeHeader';

describe('HomeHeader component', () => {
  test('renders HomeHeader component', () => {
    // @ts-ignore
    render(<HomeHeader />);
  
    // Ensure that the avatar is present
    const avatarElement = screen.getByAltText('Remy Sharp');
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement.tagName).toBe('IMG'); // Ensure it is an image
  
    // Ensure that the greeting text is present
    // expect(screen.getByText('Hi Talal')).toBeInTheDocument();
  
    // Ensure that the logout button is present
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton.tagName).toBe('BUTTON'); // Ensure it is a button
  });
});
