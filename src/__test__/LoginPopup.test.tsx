import { render, fireEvent } from '@testing-library/react';
import Login from '../popup/Login';

// Mock the chrome object
global.chrome = {
//@ts-ignore
  tabs: {
    create: jest.fn(),
  },
};

describe('Login component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Login />);
    expect(getByText('Welcome to User Journey')).toBeInTheDocument();
    expect(getByText('Login to Start Using')).toBeInTheDocument();
  });

  it('calls handleClick function when button is clicked', () => {
    const { getByText } = render(<Login />);
    const button = getByText('Login to Start Using');
    fireEvent.click(button);
    expect(chrome.tabs.create).toHaveBeenCalledWith({ url: 'http://localhost:3000/login' });
  });
});
