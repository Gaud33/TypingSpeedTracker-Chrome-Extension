let currentData = "0";


// badge to display the typing text
function updateBadgeText(text) {
  chrome.action.setBadgeText({ text: text  });
  chrome.action.setBadgeBackgroundColor({ color: "#FFFFFF" });
}
// initial call
updateBadgeText(currentData);

// Inject content script into pre loaded tabs
chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url && /^https?:\/\//.test(tab.url)) {
        console.log("injecting content script");
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
      }
    });
  });
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  updateBadgeText(currentData);
   
  // message from content
  if (message.type === "contentToPopup") {
    currentData = message.data;
  }

  // handle page reload (user presses Enter)
  if(message.type === "openPopup"){
    chrome.action.setBadgeBackgroundColor({color:"#FFFF0F"});
  }
  
  // received request from popup
  if (message.type === "requestData") {
    //update badge on each request from popup
    updateBadgeText(currentData);
    sendResponse({ data: currentData }); 
  }

  // handle clear speed
  if(message.type === "clearData"){
    
    // get the active tab 
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
      if(tabs.length> 0){
        const activeTab = tabs[0];
        console.log('message sent by bg');
        
        // send message to content of active tab
        chrome.tabs.sendMessage(activeTab.id, {type:'clear'}, (response)=>{
          currentData = "0";
          updateBadgeText(currentData);
        })
      }
    });
  }
});


 
  
