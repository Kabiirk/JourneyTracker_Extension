import { useEffect, useState } from 'react';

export interface IJourney {
  id: string;
  label: string;
  recordedTexts:
    | {
        text: string;
        url: string;
        createdAt: string;
      }[]
    | [];
  createdAt: string;
}

export const useJourney = () => {
  const [journeys, setJourneys] = useState<IJourney[]>([]);
  const [selectedJourney, setSelectedJourney] = useState({} as IJourney);
  console.log('useJourney', journeys);
  useEffect(() => {
    chrome.runtime.onMessage.addListener(message => {
      console.log(message, 'message');
      if (message.action === 'updateUI') {
        updateUI();
      }
    });
    getJourneyFromStorage();
    // updateUI();
  }, []);
  const updateUI = () => {
    console.log('updateUI');
    // get the selected journey from storage
    chrome.storage.local.get('selectedJourney', function (result) {
      console.log(result, 'result');
      const journey = result.selectedJourney;
      if (journey) {
        setJourneys([...journeys, journey]);
      }
      chrome.storage.local.get('journeys', function (result) {
        const journeys = result.journeys;
        if (journeys) {
          setJourneys([...journeys, journey]);
        }
      });
    });
  };

  console.log(selectedJourney, 'this is what i have to see  ')

  const addNewJourney = (title: string) => {
    const newJourney: IJourney = {
      id: new Date().toISOString(),
      label: title,
      recordedTexts: [],
      createdAt: new Date().toISOString()
    };
    console.log('newJourney', journeys, newJourney);
    chrome.storage.local.set({
      selectedJourney: newJourney,
      journeys: [...journeys, newJourney]
    });

    setJourneys([...journeys, newJourney]);
    setSelectedJourney(newJourney);
  };

  const getJourneyFromStorage = () => {
    chrome.storage.local.get('selectedJourney', function (result) {
      const journey = result.selectedJourney;
      setSelectedJourney(journey);
    });

    chrome.storage.local.get('journeys', function (result) {
      const journeys = result.journeys;
      console.log(journeys, 'journeys from storage');
      if (journeys && journeys.length > 0) {
        setJourneys(journeys);
      }
    });
  };

  const updateSelectedJourney = (journeyId: string) => {
    chrome.storage.local.get('journeys', function (result) {
      const journeys = result.journeys;
      const selectedJourney = journeys.find(
        (j: IJourney) => j.id === journeyId
      );
      if (selectedJourney) {
        chrome.storage.local.set({ selectedJourney });
        setSelectedJourney(selectedJourney);
      }
    });
  };

  return { journeys, addNewJourney, updateSelectedJourney, selectedJourney };
};
