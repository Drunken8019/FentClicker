var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");
var fentPipeBuy = document.getElementById("fentPipeBuy");
var fentBlmBoost = document.getElementById("blmBoost");

var linearIncr = 0;
var expIncr = 1;
var Fent = 0;
var countdown;
var duration = 3 * 60;
var blmBoostActive = false;


class FentNeedle
{
    constructor()
    {
        this.price = 50;

    }
    buy()
    {
        if(Fent >= this.price)
        {
            Fent -= this.price;
            linearIncr++;
        }
        update(); 
    }
}

class FentPipe
{
    constructor()
    {
        this.price = 200;
    }

    buy()
    {
        if(Fent >= this.price)
        {
            Fent -= this.price;
            expIncr *= 2;
        }
        update(); 
    }
}

class GameHandler
{
    static increaseFent(mult)
    {
        let baseFent = linearIncr + expIncr;
        let boost = blmBoostActive ? 2 : 1;

        let total = baseFent * boost;

        Fent += total;
        this.displayPopUp("+" + total);
        update();
    }

    static displayPopUp(content)
    {
        FentAdded.innerHTML = content;
        FentAdded.style.opacity = "100%";
        FentAdded.style.left = (event.clientX + 5) + "px";
        FentAdded.style.top = (event.clientY + 15) + "px";
        setTimeout(() => {FentAdded.style.opacity = "0";}, 500)
    }
}

var fentNeedle = new FentNeedle;
var fentPipe = new FentPipe;
FentClick.addEventListener("click", function() {
    GameHandler.increaseFent(linearIncr);
});

fentNeedleBuy.addEventListener("click", function() {
    fentNeedle.buy();
});

fentPipeBuy.addEventListener("click", function() {
    fentPipe.buy();
});

fentBlmBoost.addEventListener("click", () => {
    startTimer();
})
function startTimer() {
    clearInterval(countdown);
    let timeLeft = duration;
    blmBoostActive = true;

    countdown = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById("timer").textContent = `BLM FENT BOOST: ${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            blmBoostActive = false; 
            document.getElementById("timer").textContent = "No more time";
        }

        timeLeft--;
    }, 1000);
}


function update()
{
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}