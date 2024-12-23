
console.log("popup.js is running!");
// Retrieve typing speed sent by background
chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
    if(message.type === 'popupData'){
        
        //update typing speed 
        document.getElementById('typingSpeed').innerHTML = message.data;
    }
})