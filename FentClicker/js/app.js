var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");

var Fent = 0;
var linearIncr = 0;
var fentPipeBuy = document.getElementById("fentPipeBuy");
var expIncr = 1;



FentClick.addEventListener("click", function() {
    increaseFent(linearIncr);
});

fentNeedleBuy.addEventListener("click", function() {
    FentNeedle.buy();
});

fentPipeBuy.addEventListener("click", () => FentPipe.buy());

function increaseFent(mult) {
    let added = (1 + mult) * expIncr;
    Fent += added;
    FentAdded.innerHTML = added;
    FentAdded.style.opacity = "100%";
    FentAdded.style.left = (event.clientX + 5) + "px";
    FentAdded.style.top = (event.clientY + 15) + "px";
    setTimeout(() => (FentAdded.style.opacity = "0"), 500);
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}

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
    }
}

class FentPipe {
    static price = 100;
    static priceIncr = 2;

    static buy() {
        if (Fent >= this.price) {
            Fent -= this.price;
            expIncr *= 2;
            this.price += this.priceIncr;
            this.priceIncr *= 2;
        }
    }
}
