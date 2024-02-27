
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
}

function recordText(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) {
  const selectedText = info.selectionText.trim();
  chrome.storage.local.get('selectedJourney', function (result) {
    console.log(result);
    const journey = result.selectedJourney;
    const recordedTextObj = {
      text: selectedText,
      url: tab.url,
      createdAt: new Date().toISOString()
    };
    const updatedRecordedText = {
      ...journey,
      recordedTexts: [recordedTextObj, ...journey.recordedTexts]
    };
    chrome.storage.local.get('journeys', function (result) {
      const journeys = result.journeys;
      if (journeys) {
        const updatedJourneys = journeys.map((j: IJourney) => {
          if (j.id === journey.id) {
            return updatedRecordedText;
          }
          return j;
        });
        chrome.storage.local.set({ journeys: updatedJourneys });
      }
    });

    chrome.storage.local.set({ selectedJourney: updatedRecordedText });
  });
}

chrome.contextMenus.create({
  id: 'record-text',
  title: 'Record Text',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  recordText(info, tab);
});

chrome.runtime.onMessage.addListener(function (request, sender, onSuccess) {
  console.log('running check');
  fetch('http://localhost:3000/api/auth/session', {
    mode: 'cors'
  })
    .then(response => response.json())
    .then(session => {
      onSuccess(Object.keys(session).length > 0 ? session : null);
    })
    .catch(err => {
      console.error(err);
      onSuccess(null);
    });

  return true;
});

export {};

export {};



export {};