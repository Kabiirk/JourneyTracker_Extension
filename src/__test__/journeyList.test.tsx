// import React from 'react';
import { render, screen } from '@testing-library/react';
import JourneyList from '../components/JourneyList';

test('renders JourneyList component', () => {
  render(<JourneyList />);

  // Ensure that the label 'Journeys' is present
  expect(screen.getByLabelText('Journeys')).toBeInTheDocument();
});

