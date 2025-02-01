var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");

var linearIncr = 0;
var Fent = 0;

class FentNeedle
{
    constructor()
    {
        this.price = 50;
        this.priceIncr = 2;
    }

    static buy()
    {
        if(Fent >= 50)
        {
            Fent -= 50;
            linearIncr++;
            this.price = this.price + this.priceIncr;
            this.priceIncr *= 2;
        }
        update(); 
    }
}

class GameHandler
{
    static increaseFent(mult)
    {
        Fent += 1 + mult;
        this.displayPopUp(1 + mult);
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

FentClick.addEventListener("click", function() {
    GameHandler.increaseFent(linearIncr);
});

fentNeedleBuy.addEventListener("click", function() {
    FentNeedle.buy();
});



function update()
{
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}