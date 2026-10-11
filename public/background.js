
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "LOOKUP_WORD" && sender.tab?.id !== undefined) {
    chrome.storage.session.set({
      selectedWord: message.word
    });

    chrome.sidePanel.open({
      tabId: sender.tab.id
    });
  }
});

chrome.sidePanel.setPanelBehavior({
  openPanelOnActionClick: true
});
