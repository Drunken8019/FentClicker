var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");
var fentPipeBuy = document.getElementById("fentPipeBuy");

var linearIncr = 0;
var expIncr = 1;
var Fent = 0;




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
        Fent += linearIncr + expIncr;
        this.displayPopUp(linearIncr + expIncr);
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


function update()
{
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}