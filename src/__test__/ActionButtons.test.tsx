import { render, screen } from '@testing-library/react';
import ActionButtons from '../components/ActionButtons';

test('renders ActionButtons component', () => {
  render(<ActionButtons />);

  // Ensure that the 'Add Journey' button is present
  const addButton = screen.getByRole('button', { name: 'Add Journey' });
  expect(addButton).toBeInTheDocument();
  expect(addButton.tagName).toBe('BUTTON'); // Ensure it is a button

  // Ensure that the 'Clear Table' button is present
  const clearButton = screen.getByRole('button', { name: 'Clear Table' });
  expect(clearButton).toBeInTheDocument();
  expect(clearButton.tagName).toBe('BUTTON'); // Ensure it is a button
});
