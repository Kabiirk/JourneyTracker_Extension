interface RecordedData {
  recordedTexts: string[];
  recordedURLs: string[];
}

function recordText(
  info: chrome.contextMenus.OnClickData,
  tab: chrome.tabs.Tab
) {
  console.log([info.frameUrl, info.selectionText]);
  const selectedText = info.selectionText.trim();

  if (selectedText !== '') {
    chrome.storage.local.get(
      { recordedTexts: [], recordedURLs: [] },
      function (result: RecordedData) {
        const recordedTexts = result.recordedTexts;
        const recordedURLs = result.recordedURLs;
        recordedTexts.push(selectedText);
        recordedURLs.push(info.frameUrl);
        chrome.storage.local.set({ recordedTexts, recordedURLs });
      }
    );
  }
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