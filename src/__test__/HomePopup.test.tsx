// import React from 'react';
import { render } from '@testing-library/react';
import Home from '../popup/Home';

// Mock data
const mockProps = {
  addNewJourney: jest.fn(),
  journeys: [
    {
      id: '1',
      label: 'Journey 1',
      recordedTexts: [
        {
          text: 'Recorded text 1',
          url: 'http://example.com/recorded_text_1',
          createdAt: '2024-04-05T12:00:00Z'
        },
        {
          text: 'Recorded text 2',
          url: 'http://example.com/recorded_text_2',
          createdAt: '2024-04-05T12:30:00Z'
        }
      ],
      createdAt: '2024-04-05T11:00:00Z'
    },
    {
      id: '2',
      label: 'Journey 2',
      recordedTexts: [],
      createdAt: '2024-04-05T10:00:00Z'
    }
  ],
  updateSelectedJourney: jest.fn(),
  selectedJourney: {
    id: '1',
    label: 'Journey 1',
    recordedTexts: [
      {
        text: 'Recorded text 1',
        url: 'http://example.com/recorded_text_1',
        createdAt: '2024-04-05T12:00:00Z'
      },
      {
        text: 'Recorded text 2',
        url: 'http://example.com/recorded_text_2',
        createdAt: '2024-04-05T12:30:00Z'
      }
    ],
    createdAt: '2024-04-05T11:00:00Z'
  },
  user: 'Test User',
  clearTable: jest.fn()
};

describe('Home component', () => {
  it('renders HomeHeader with correct props', () => {
    const {  } = render(<Home {...mockProps} />);
    // expect(getByText(`Welcome, ${mockProps.user}`)).toBeInTheDocument();
  });
});
