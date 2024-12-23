let lastTime = 0;
let words = 0;

let finalSpeed = 0;

console.log("Content script is running!");

let calculatedTypingSpeed = ()=>{   
        const speed = (words/0.03);

        // Calculate average of current speed and new speed
        finalSpeed = (finalSpeed + speed) /2; 
        
        // send the typing speed to be handled by background
        chrome.runtime.sendMessage({type: 'contentToPopup', data: (finalSpeed).toFixed(0)});

    // reset for next calculations
    words = 0;
}

//throttle function to execute every 2 seconds
 function throttle (func, delay){
    let lastCall = 0;

    return function(...args){
        const now = Date.now();
        if (now - lastCall >= delay){
            lastCall = now;
            func(...args);
        }
    };   
 }
 const throttleCalculate = throttle(calculatedTypingSpeed, 2000);



// Detect input fields
document.addEventListener("input", (event)=>{
    
    // run only on valid input fields
    if(event.target.matches("input[type='text'], textarea")){
        // logic to detect space pressed
        if(event.data && event.data.length){
            // increment words typed if space encountered
            if(event.data === " "){
                words++;
            }
        }
        throttleCalculate();         
    }
});
