
// @ts-ignore
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000/api';
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
}

function recordText(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) {
  const selectedText = info.selectionText.trim();
  chrome.storage.local.get('selectedJourney', function (result) {
    const journey = result.selectedJourney;
    const recordedTextObj = {
      text: selectedText,
      url: tab.url,
      createdAt: new Date().toISOString()
    };
  
        // const res = await axiosHelper<IJourney>({
        //   method: 'PUT',
        //   url: `/journeys/${journey.id}/recordedTexts/add`,
        //   data: recordedTextObj
        // });

     fetch(
       `${API_BASE_URL}/journeys/${journey.id}/recordedTexts/add`,
       {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(recordedTextObj)
       }
     )
       .then(response => response.json())
       .then(data => {
         const updatedRecordedText = {
           ...journey,
           recordedTexts: [data, ...journey.recordedTexts]
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
         chrome.runtime.sendMessage({ action: 'updateUI' });
       })
       .catch(error => {
         console.error('Error:', error);
       });
  
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
  fetch(`${API_BASE_URL}/auth/session`, {
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

export { };

  export { };

  
