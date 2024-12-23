
console.log("popup.js is running!");
// Send requests to background for updated data
chrome.runtime.sendMessage({type: 'requestData'}, (response) =>{
    // Update typing speed when updated data is received
        if(response && response.data){
            document.getElementById('typingSpeed').innerHTML = response.data;
        }
    }
);