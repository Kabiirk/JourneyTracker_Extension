import { useEffect, useState } from 'react';
import { axiosHelper } from '../utils/axiosHelper';

export interface IJourney {
  id?: string;
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

  useEffect(() => {
    chrome.runtime.onMessage.addListener(message => {
      if (message.action === 'updateUI') {
        updateUI();
      }
    });
    // getJourneyFromStorage();
    getJourneys();
    // updateUI();
  }, []);

  const updateUI = () => {
    // get the selected journey from storage
    chrome.storage.local.get('selectedJourney', function (result) {
      const journey = result.selectedJourney;
      if (journey) {
        setSelectedJourney(journey);
      }
      chrome.storage.local.get('journeys', function (result) {
        const journeys = result.journeys;
        if (journeys && journeys.length > 0) {
          setJourneys(journeys);
        }
      });
    });
  };

  const addNewJourney = (title: string) => {
    const newJourney: IJourney = {
      id: new Date().toISOString(),
      label: title,
      recordedTexts: [],
      createdAt: new Date().toISOString()
    };
    chrome.storage.local.set({
      selectedJourney: newJourney,
      journeys: [...journeys, newJourney]
    });

    setJourneys([...journeys, newJourney]);
    setSelectedJourney(newJourney);
  };

  // const getJourneyFromStorage = () => {
  //   chrome.storage.local.get('selectedJourney', function (result) {
  //     const journey = result.selectedJourney;
  //     setSelectedJourney(journey);
  //   });

  //   chrome.storage.local.get('journeys', function (result) {
  //     const journeys = result.journeys;
  //     if (journeys && journeys.length > 0) {
  //       setJourneys(journeys);
  //     }
  //   });
  // };

const getJourneys = async () => {
  // First, get the journeys from your server or API.
  const journeysResponse = await axiosHelper<IJourney[]>({
    url: '/journeys',
    method: 'GET'
  });

  if (
    !journeysResponse.error &&
    journeysResponse.data &&
    journeysResponse.data.length > 0
  ) {
    setJourneys(journeysResponse.data);
    // save the journeys in chrome.storage
    chrome.storage.local.set({ journeys: journeysResponse.data });


    // Then, asynchronously get the selected journey from chrome.storage.
    chrome.storage.local.get('selectedJourney', function (result) {
      let journey = result.selectedJourney;

      // If there is no selected journey, set the first journey as selected.
      if (!journey) {
        journey = journeysResponse.data[0];
        chrome.storage.local.set({ selectedJourney: journey }, function () {
          console.log('Selected journey is set to the first journey.');
        });
      }

      setSelectedJourney(journey);
    });
  } else {
    // Handle the case where there are no journeys or an error occurred.
    setJourneys([]);
    console.error('No journeys found or an error occurred');
  }
};

  const addNewJourneyInDb = async (title: string) => {
    const newJourney = {
      label: title,
      recordedTexts: [] as any
    };
    const response = await axiosHelper<IJourney>({
      url: '/journeys/create',
      method: 'POST',
      data: newJourney
    });
    if (!response.error) {
      chrome.storage.local.set({
        selectedJourney: response.data,
        journeys: [...journeys, response.data]
      });

      setJourneys([...journeys, response.data]);
      setSelectedJourney(response.data);
    }
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
        updateUI();
      }
    });
  };
  
  const clearSelectedJourneyRecordedTexts = async () => {
    try {
      const res = await axiosHelper<IJourney>({
        method: 'DELETE',
        url: `/journeys/${selectedJourney.id}/recordedTexts/clear`
      });
      console.log('res', res);
      if (!res.error) {
        const updatedJourney = {
          ...selectedJourney,
          // @ts-ignore
          recordedTexts: []
        };
        setSelectedJourney(updatedJourney);
        chrome.storage.local.set({ selectedJourney: updatedJourney });
        updateUI();
      }
      
    } catch (error) {
      
    }
  }

  console.log('selectedJourney', selectedJourney);

  return {
    journeys,
    addNewJourney,
    updateSelectedJourney,
    selectedJourney,
    addNewJourneyInDb,
    clearSelectedJourneyRecordedTexts
  };
};
