
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




// handle theme change press
let circle = document.getElementsByClassName("circle");
let toggle_btn = document.querySelector(".toggle-btn");
let body = document.querySelector(".main");

// check local storage for dark mode status
chrome.storage.local.get(["darkMode"], (result)=>{
    if(result.darkMode){
        document.body.classList.add("darkmode");
        circle[0].classList.add ('dark-circle');
        // document.getElementsByClassName("circle").classList.add("dark-circle");
    }
})


toggle_btn.addEventListener("click", ()=>{
    const isDarkMode =  body.classList.toggle("darkmode");
    circle[0].classList.toggle("dark-circle");

    // set the darkmode status to local storage
    chrome.storage.local.set({darkMode: isDarkMode});
})


