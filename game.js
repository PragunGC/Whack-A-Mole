let start = document.getElementById("start");
let score = document.getElementById("score");
let reset = document.getElementById("reset");
let time = document.getElementById("time");
let timing = document.getElementById("time-text");
let scorecount = document.getElementById("score-count");
let minSpawnInterval = 500;
let stopping = 0;
let score_count = 0;
let started = 1;
function rng(a, b) {
    return Math.floor((Math.random() * (b - a)) + a);       //Random number generation between an interval
}
function resetGame() {
    timing.innerHTML = "02:00";                             //Setting timer back to 2 min
    scorecount.innerHTML = "0";                             //Reseting Score
    clearInterval(moleend);                                 //Ending any instance of the mole appearing function
    clearTimeout(moledis);                                  //Ending any instance of the mole dissapearing function
    for (let i = 0; i < 9; i++) {
        let numText = i.toString();
        let moleID = "mole" + numText;
        moleNo = document.getElementById(moleID);
        moleNo.classList.remove('moleAni');                 //Reseting all moles styling properties(animations) added due to the moleMove function
    }                                                       // i.e.Making it back to original state
}
function moleMove() {
    let timeint = minSpawnInterval + rng(0, 300);           //Set a random interval 
    moleend = setInterval(function () {                     //Repeat the mole appearing animation after the interval time
        let num = rng(0, 9);
        let numText = num.toString();
        let moleID = "mole" + numText;                      //get a certain moleID 
        moleNo = document.getElementById(moleID);           
        moleNo.classList.add('moleAni');                    //adding animation class to selected moleID
        moleNo.onclick = function () {                         
            score_count = score_count + 1;                  //Incrementing score if we click on mole when it appears
            scorecount.innerHTML = score_count;             //Writing score in HTML as soon as we click on mole
        };
        moledis = setTimeout(function () {                  //Remove animation from the mole to which we added the animation class 
            let numText = num.toString();
            let moleID = "mole" + numText;
            moleNo = document.getElementById(moleID);
            moleNo.classList.remove('moleAni');             //Removing the added animation class from selected moleID
        }, timeint);
    }, timeint);

}
function startTimer(duration, display) {                    //Function for countdown function
    var timer = duration, minutes, seconds;
    var ended = 0;
    stopping = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
            alert("Your score is " + score_count);
            clearInterval(stopping)
            resetGame();
            ended = 1;
            started = 1;
        }
    }, 1000);
    return ended;
}

start.onclick = function () {
    if (started == 1) {                                 //To not run function of Start is already clicked on once
        started = 0;
        var fiveMinutes = 60 * 2,
            display = document.querySelector('#time-text');
        startTimer(fiveMinutes, display);
        moleMove();
    }
};
reset.onclick = function () {                         //Reseting to original state when Reset is clicked
    started = 1;                                
    clearInterval(stopping)                         //Stop timer
    resetGame();
}