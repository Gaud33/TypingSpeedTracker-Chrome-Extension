
console.log("popup.js is running!");

function requestData(){
    chrome.runtime.sendMessage({type: 'requestData'}, (response) =>{
        // Update typing speed when updated data is received
            if(response && response.data){
                document.getElementById('typingSpeed').innerHTML = response.data;
            }
        }
    );
}
// Send requests to background for updated data
requestData();

// handle clear button press
document.getElementById("clear-btn").addEventListener("click", ()=>{
    chrome.runtime.sendMessage({type:'clearData'}, (response)=>{
        
    });
    document.getElementById('typingSpeed').innerHTML = "0";


    
})