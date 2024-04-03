/**
 * @jest-environment jsdom
 */
// // import React from 'react';

// test('renders ClipboardTable component', () => {
//   // render(<ClipboardTable />);

//   expect(true).toBe(true);
//   // // Ensure that the table headers are present
//   // expect(screen.getByText('Text')).toBeInTheDocument();
//   // expect(screen.getByText('URL')).toBeInTheDocument();
// });

// export { }
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClipboardTable from '../components/ClipboardTable';

export interface IRecText {
        text: string;
        url: string;
        createdAt: string;
      }


describe('ClipboardTable component', () => {
  const selectedJourneyWithTexts = {
    id: '1',
    label: 'Journey 1',
    recordedTexts: [
      {
        text: 'Text 1',
        url: 'https://example.com/text1',
        createdAt: '2024-03-27T12:00:00Z',
      },
      {
        text: 'Text 2',
        url: 'https://example.com/text2',
        createdAt: '2024-03-27T12:15:00Z',
      },
    ],
    createdAt: '2024-03-27T11:00:00Z',
  };

  const selectedJourneyWithoutTexts = {
    id: '2',
    label: 'Journey 2',
    recordedTexts: [] as IRecText[],
    createdAt: '2024-03-28T09:00:00Z',
  };

  test('renders correctly with texts', () => {
    const { getByText, getByRole } = render(
      <ClipboardTable selectedJourney={selectedJourneyWithTexts} />
    );

    expect(getByRole('table')).toBeInTheDocument();

    expect(getByText('Text 1')).toBeInTheDocument();
    expect(getByText('Text 2')).toBeInTheDocument();

    expect(getByText('https://example.com/text1')).toBeInTheDocument();
    expect(getByText('https://example.com/text2')).toBeInTheDocument();
  });

  test('renders correctly without texts', () => {
    const { getByText } = render(
      <ClipboardTable selectedJourney={selectedJourneyWithoutTexts} />
    );

    expect(getByText('No data')).toBeInTheDocument();
  });
});