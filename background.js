// receive typingspeed sent from content.js
 chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'contentToPopup') {
        // Forward the data to popup
         chrome.runtime.sendMessage({ type: 'popupData', data: message.data });
        }
      });