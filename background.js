let currentData = "0";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   
  // message from content
  if (message.type === "contentToPopup") {
    currentData = message.data;
  }

  // handle page reload (user presses Enter)
  if(message.type === "openPopup"){
    //logic
  }
  
  // received request from popup
  if (message.type === "requestData") {
    sendResponse({ data: currentData });
  }
});
