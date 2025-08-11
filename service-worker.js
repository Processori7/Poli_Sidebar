chrome.runtime.onInstalled.addListener(() => {
    console.log('Polination AI Chat extension installed');
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
