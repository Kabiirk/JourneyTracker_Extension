// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
//     console.log(msg);
//     console.log(sender);
//     sendResponse("Front the background Script");
// })

function recordText(info, tab) {
    console.log([info.frameUrl, info.selectionText]);
    // console.log(tab);
    // const selectedText = window.getSelection().toString().trim();
    const selectedText = "";
    
    // Check if selected text is not empty
    if (info.selectionText !== "") {
      // Store the selected text locally
      chrome.storage.local.get({ recordedTexts: [], recordedURLs:[] }, function (result) {
        const recordedTexts = result.recordedTexts;
        const recordedURLs = result.recordedURLs;
        recordedTexts.push(info.selectionText);
        recordedURLs.push(info.frameUrl);
        chrome.storage.local.set({ recordedTexts });
        chrome.storage.local.set({ recordedURLs });
      });
  
      // Notify the popup to update UI
    //   chrome.runtime.sendMessage({ action: "updateUI" });
    }
}
  
// Create context menu item
chrome.contextMenus.create({
    id: "record-text",
    title: "Record Text",
    contexts: ["selection"],
    // onclick: recordText,
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
        recordText(info, tab);
});

chrome.runtime.onMessage.addListener(function (request, sender, onSuccess) {
  console.log('running check');
  fetch('http://localhost:3000/api/auth/session', {
    mode: 'cors'
  })
    .then(response => response.json())
    .then(session => {
      if (Object.keys(session).length > 0) {
        onSuccess(session);
      } else {
        onSuccess(null);
      }
    })
    .catch(err => {
      console.error(err);
      onSuccess(null);
    });

  return true; // Will respond asynchronously.
});
