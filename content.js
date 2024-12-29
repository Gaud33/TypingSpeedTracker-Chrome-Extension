let lastTime = 0;
let words = 0;

let finalSpeed = 0;
let iterations = 0;

let cleared = false;

console.log("Content script is running!");

// listen and handle clear message from bg
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.type === "clear"){
    cleared = true;
    sendResponse({status:'success', message: 'response from content'});
  }
});


let calculatedTypingSpeed = () => {
  iterations++;
  const speed = words / 0.00833;

  // Calculate average of current speed and new speed
  finalSpeed += speed;

  // reset if cleared
  if(cleared){
    iterations = 1;
    finalSpeed = 0;
    cleared = false;
  }

  // send the typing speed to be handled by background
  chrome.runtime.sendMessage({
    type: "contentToPopup",
    data: (finalSpeed / iterations).toFixed(0),
  });

  
  
  

  // reset for next calculations
  words = 0;
};

//throttle function to execute every second
function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}
const throttleCalculate = throttle(calculatedTypingSpeed, 500);


// handle when user presses 'Enter' / page reloads
window.addEventListener("beforeunload", (event) => {
    chrome.runtime.sendMessage({ type: 'openPopup' });
  });

document.addEventListener("input", (event) => {
  // run only on valid input fields
  if (event.target.matches("input[type='text'], textarea")) {
    // logic to detect space pressed
    if (event.data && event.data.length) {
      // increment words typed if space encountered
      if (event.data === " ") {
        words++;
      } 
    }
        
   throttleCalculate();
  }
});
