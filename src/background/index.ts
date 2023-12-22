chrome.action.onClicked.addListener((tab) => {
  console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
  if (tab?.id) {
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      files: ['content.js']
    }, () => {})
  }
})
