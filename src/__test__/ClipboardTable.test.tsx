// import React from 'react';
import { render, screen } from '@testing-library/react';
import ClipboardTable from '../components/ClipboardTable';

test('renders ClipboardTable component', () => {
  render(<ClipboardTable />);

  // Ensure that the table headers are present
  expect(screen.getByText('Text')).toBeInTheDocument();
  expect(screen.getByText('URL')).toBeInTheDocument();
});
