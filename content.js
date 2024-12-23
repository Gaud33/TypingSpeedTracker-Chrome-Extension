let lastTime = 0;
let typedChars = 0;

let calculatedTypingSpeed = ()=>{
    const currTime = Date.now();
    const ellapsedTime = (currTime - lastTime)/1000;

    if(ellapsedTime >0){
        const speed = (typedChars/ellapsedTime).toFixed(2);
        console.log(`Typing speed: ${speed} char/sec`);
    }

    // reset for next calculations
    lastTime = currTime;
    typedChars - 0;
}