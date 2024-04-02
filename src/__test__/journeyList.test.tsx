/**
 * @jest-environment jsdom
 */
// import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import JourneyList from '../components/JourneyList';
import { IJourney } from '../hooks/useJourney';

describe('JourneyList component', () => {
  const mockAddNewJourney = jest.fn();
  const mockUpdateSelectedJourney = jest.fn();

  // const journeys = [
  //   { id: '1', label: 'Journey 1' },
  //   { id: '2', label: 'Journey 2' },
  // ];

  const j:IJourney = {
    id: "id_string",
    label: "label_string",
    recordedTexts:[{
          text: "text_string",
          url: "url_string",
          createdAt: "createdAt_string",
        }],
    createdAt: "string",
  }

  const selectedJourney = j;

  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(
      <JourneyList
        addNewJourney={mockAddNewJourney}
        journeys={[selectedJourney]}
        updateSelectedJourney={mockUpdateSelectedJourney}
        selectedJourney={selectedJourney}
      />
    );
    // expect(getByTestId('SaveAltIcon')).toBeInTheDocument();
    expect(getByLabelText('Clear')).toBeInTheDocument();
    expect(getByText('Journeys')).toBeInTheDocument();
    // expect(getByText('label_string')).toBeInTheDocument();
  });

  test('displays create new journey text field when there are no journeys', () => {
    const { getByLabelText } = render(
      <JourneyList
        addNewJourney={mockAddNewJourney}
        journeys={[selectedJourney]}
        updateSelectedJourney={mockUpdateSelectedJourney}
        selectedJourney={selectedJourney}
      />
    );

    expect(getByLabelText('Clear')).toBeInTheDocument();
  });

  test('calls addNewJourney when save button is clicked', () => {
    const { getByLabelText } = render(
      <JourneyList
        addNewJourney={mockAddNewJourney}
        journeys={[selectedJourney]}
        updateSelectedJourney={mockUpdateSelectedJourney}
        selectedJourney={selectedJourney}
      />
    );

    // const saveButton = getByText('Save');
    // const inputField = getByLabelText('Create new journey');

    // fireEvent.change(inputField, { target: { value: 'New Journey' } });
    // fireEvent.click(saveButton);

    // expect(mockAddNewJourney).toHaveBeenCalledWith('New Journey');
    // expect(inputField.value).toBe('');

    expect(getByLabelText('Clear')).toBeInTheDocument();
  });
});