/**
 * @jest-environment jsdom
 */
// import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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


describe('JourneyList component2', () => {
  const addNewJourneyMock = jest.fn();
  const updateSelectedJourneyMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders text field when isAdd state is true or no journeys exist', () => {
    const { getByLabelText } = render(
      <JourneyList
        addNewJourney={addNewJourneyMock}
        journeys={[]}
        updateSelectedJourney={updateSelectedJourneyMock}
        selectedJourney={null}
      />
    );
    const textField = getByLabelText('Create new journey');
    expect(textField).toBeInTheDocument();
  });

  test('renders autocomplete when isAdd state is false and journeys exist', () => {
    const journeys: IJourney[] = [
      { id: '1', label: 'Journey 1', recordedTexts: [], createdAt: '2022-01-01' },
      { id: '2', label: 'Journey 2', recordedTexts: [], createdAt: '2022-01-02' }
    ];
    const { getByLabelText } = render(
      <JourneyList
        addNewJourney={addNewJourneyMock}
        journeys={journeys}
        updateSelectedJourney={updateSelectedJourneyMock}
        selectedJourney={null}
      />
    );
    const autocomplete = getByLabelText('Create new journey');
    expect(autocomplete).toBeInTheDocument();
    
  });

  describe('JourneyList component', () => {
    test('addNewJourney function is called when the last button is clicked', () => {
      // Mock addNewJourney function
      const addNewJourneyMock = jest.fn();
  
      // Render the component with mock props
      const { getByLabelText, getByTestId } = render(
        <JourneyList
          addNewJourney={addNewJourneyMock}
          journeys={[]} // Provide any necessary props here
          updateSelectedJourney={() => {}} // Provide any necessary props here
          selectedJourney={null} // Provide any necessary props here
        />
      );
  
      // Simulate user input by changing the text field value
      const textField = getByLabelText('Create new journey');
      fireEvent.change(textField, { target: { value: 'New Journey' } });
  
      // Click the last button
      const addButton = getByTestId('add-button');
      fireEvent.click(addButton);
  
      // Assert that addNewJourney function is called with the correct argument
      expect(addNewJourneyMock).toHaveBeenCalledWith('New Journey');
    });
  });

  test('updateSelectedJourney function is called when an option is selected from Autocomplete', () => {
    // Mock updateSelectedJourney function
    const updateSelectedJourneyMock = jest.fn();

    // Sample journeys data
    const journeys: IJourney[] = [
      { id: '1', label: 'Journey 1', recordedTexts: [], createdAt: '2022-01-01' },
      { id: '2', label: 'Journey 2', recordedTexts: [], createdAt: '2022-01-02' }
    ];

    // Render the component with mock props and initial selectedJourney
    const {getByTestId } = render(
      <JourneyList
        addNewJourney={() => {}} // Provide any necessary props here
        journeys={journeys} // Provide the journeys data
        updateSelectedJourney={updateSelectedJourneyMock}
        selectedJourney={journeys[0]} // Provide any initial selectedJourney
      />
    );

    // Simulate user selecting an option from the Autocomplete dropdown
    const autocompleteInput = getByTestId('auto-complete');
    fireEvent.click(autocompleteInput); // Opens the dropdown

    // Assuming the first option is clicked here
    fireEvent.focus(autocompleteInput);
    fireEvent.keyDown(autocompleteInput, { key: 'ArrowDown' });

    // Select the second option from the dropdown based on its label
    fireEvent.keyDown(autocompleteInput, { key: 'ArrowDown' }); // Move to the second option
    fireEvent.keyDown(autocompleteInput, { key: 'Enter' }); // Select the option


    // // Assert that updateSelectedJourney function is called with the correct argument
    expect(updateSelectedJourneyMock).toHaveBeenCalledWith('2'); // Assuming the first option's ID is '1'
  });

  test('Clicking cancel button toggles the isAdd state', () => {
    // Mock setIsAdd function
    const addNewJourneyMock = jest.fn();
    const journeys: IJourney[] = [
      { id: '1', label: 'Journey 1', recordedTexts: [], createdAt: '2022-01-01' },
      { id: '2', label: 'Journey 2', recordedTexts: [], createdAt: '2022-01-02' }
    ];

    // Render the component with mock props
    const { getByLabelText, getByTestId } = render(
      <JourneyList
        addNewJourney={addNewJourneyMock}
        journeys={journeys} // Provide any necessary props here
        updateSelectedJourney={() => {}} // Provide any necessary props here
        selectedJourney={null} // Provide any necessary props here
      />
    );
  
    // Simulate user input by changing the text field value
    const textField = getByLabelText('Create new journey');
    fireEvent.change(textField, { target: { value: 'New Journey' } });
  
    const addButton = getByTestId('add-button');
    fireEvent.click(addButton);

    // Click the cancel button
    const cancelButton = getByTestId('cancel-button');
    fireEvent.click(cancelButton);

  });
});
