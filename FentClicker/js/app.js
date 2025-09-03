var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentPerClick = document.getElementById("fentPerClick");
var autoFarmAmount = document.getElementById("autoFarm");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");
var fentPipeBuy = document.getElementById("fentPipeBuy");
var fentReactorBuy = document.getElementById("fentReactorBuy");
var jewishFloydBuy = document.getElementById("jewishFloydBuy");
var crackBuy = document.getElementById("crackBuy");
var boostContainer = document.getElementById("boostContainer");
var dealer = document.getElementById("dealer");

var click = 1;
var clickMult = 1;
var Fent = 9999999;
var autoFarm = 0;
var autoFarmMult = 1;
var globalClickMult = 1;

class GameHandler
{
    static setPrice(price, elem)
    {
        elem.innerHTML = "Price: " + price + " Fent";
    }

    static clickValue()
    {
        return click * clickMult * globalClickMult;
    }

    static farmValue()
    {
        return autoFarm * autoFarmMult;
    }

    static increaseFent()
    {
        Fent += this.clickValue();
        this.displayPopUp(this.clickValue());
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
            click++;
        }
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
            if(clickMult == 1) clickMult = 2;
            else clickMult += 2;
            this.price *= 10;
        }
        GameHandler.setPrice(this.price, document.getElementById("fentPipeBuyPrice"));
    }
}

class FentReactor
{
    constructor()
    {
        this.price = 5000;
    }

    buy()
    {
        if(Fent >= this.price)
        {
            Fent -= this.price;
            autoFarm += 100;
        }
    }
}

class JewishFloyd
{
    constructor()
    {
        this.price = 1000000;
    }

    buy()
    {
        if(Fent >= this.price)
        {
            Fent -= this.price;
            if(autoFarmMult == 1) autoFarmMult = 2;
            else autoFarmMult += 2;
            this.price *= 10;
        }
        GameHandler.setPrice(this.price, document.getElementById("jewishFloydBuyPrice"));
    }
}

var fentNeedle = new FentNeedle;
var fentPipe = new FentPipe;
var fentReactor = new FentReactor;
var jewishFloyd = new JewishFloyd;

FentClick.addEventListener("click", function() {
    GameHandler.increaseFent();
});

fentNeedleBuy.addEventListener("click", function() {
    fentNeedle.buy();
});

fentPipeBuy.addEventListener("click", function() {
    fentPipe.buy();
});

fentReactorBuy.addEventListener("click", function() {
    fentReactor.buy();
});

jewishFloydBuy.addEventListener("click", function() {
    jewishFloyd.buy();
});

crackBuy.addEventListener("click", function() {
    if(Fent >= 90000)
    {
        Fent -= 90000;
        if(globalClickMult == 1) globalClickMult = 10;
        else globalClickMult += 10;

        crackBuy.setAttribute("disabled", "");
        boostContainer.innerHTML = "<p>Crack boost (x10 Clicks)</p>"

        window.setTimeout(function (){
            boostContainer.innerHTML = "";
            globalClickMult -= 10;
            if(globalClickMult == 0) globalClickMult = 1;
            crackBuy.removeAttribute("disabled");
        }, 1000 * 60 * 5);
    }
});

function update()
{
    currentFent.innerHTML = "FentStash: " + Fent + "g";
    fentPerClick.innerHTML = "Fent per click: " + (GameHandler.clickValue()) + "g";
    autoFarmAmount.innerHTML = "Fent per Second: " + GameHandler.farmValue() + "g";
}

var secLoop = window.setInterval(function(){
  Fent += GameHandler.farmValue();
}, 1000);

var gameLoop = window.setInterval(function(){
  update();
  if(Fent > localStorage.getItem("highscore") || 0)
    {
        localStorage.setItem("highscore", Fent); 
    }
}, 10);

var hourly = window.setInterval(function(){
    dealer.classList.remove("hidden");
    window.setTimeout(function (){
        dealer.classList.add("hidden");
    }, 1000 * 60 * 2);
}, 1000 * 60 * 60)