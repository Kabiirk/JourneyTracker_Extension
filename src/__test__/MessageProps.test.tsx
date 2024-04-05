import { render } from '@testing-library/react';
import Message from '../components/MessageProps';

describe('Message', () => {
  test('renders message correctly', () => {
    const text = 'Hello, world!';
    const { getByText } = render(<Message text={text} />);
    expect(getByText(text)).toBeInTheDocument();
  });
});
