let lastTime = 0;
let words = 0;

let finalSpeed = 0;
iterations = 0;

console.log("Content script is running!");

let calculatedTypingSpeed = () => {
  iterations++;
  const speed = words / 0.01667;

  // Calculate average of current speed and new speed
  finalSpeed += speed;

  // send the typing speed to be handled by background
  chrome.runtime.sendMessage({
    type: "contentToPopup",
    data: (finalSpeed / iterations).toFixed(0),
  });

  // reset for next calculations
  words = 0;
};

//throttle function to execute every 2 seconds
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
const throttleCalculate = throttle(calculatedTypingSpeed, 1000);


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
