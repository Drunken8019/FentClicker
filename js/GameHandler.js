export default class GameHandler
{
    static Fent = 0;

    static click = 1;
    static clickMult = 0;
    static globalClickMult = 0;

    static autoFarm = 0;
    static autoFarmMult = 0;
    static globalFarmMult = 0;

    static FentClick = document.getElementById("fentClick");
    static FentAdded = document.getElementById("fentAdded");
    static currentFent = document.getElementById("currentFent");
    static fentPerClick = document.getElementById("fentPerClick");
    static autoFarmAmount = document.getElementById("autoFarm");

    static init()
    {
        GameHandler.FentClick.addEventListener("click", function() {
            GameHandler.increaseFent();
        });
    }

    static clickValue()
    {
        let mult = GameHandler.clickMult || 1;
        let globalMult = GameHandler.globalClickMult || 1;

        return GameHandler.click * mult * globalMult;
    }

    static farmValue()
    {
        let mult = GameHandler.autoFarmMult || 1;
        let globalMult = GameHandler.globalFarmMult || 1;

        return GameHandler.autoFarm * mult * globalMult;
    }

    static displayPopUp()
    {
        let imgId = Math.floor(Math.random() * 9999999);
        let content = `<div class="fentPopUp" id="clickPopUp${imgId}"><img src="img/needle_tp.png" width="200"></div>`;
        GameHandler.FentAdded.innerHTML += content;
        let elem = document.getElementById(`clickPopUp${imgId}`);
        elem.classList.add("visible");
        
        elem.style.left = (event.clientX) + "px";
        elem.style.top = (event.clientY) + "px";

        setTimeout(() => {
            let elem = document.getElementById(`clickPopUp${imgId}`);
            elem.classList.remove("visible");
        }, 800)

        setTimeout(() => {
            let elem = document.getElementById(`clickPopUp${imgId}`);
            if(elem) elem.remove();
        }, 20000);
    }

    static increaseFent()
    {
        GameHandler.Fent += this.clickValue();
        this.displayPopUp();
    }

    static update()
    {
        GameHandler.currentFent.innerHTML = GameHandler.Fent + "g";
        GameHandler.fentPerClick.innerHTML = (GameHandler.clickValue()) + "g";
        GameHandler.autoFarmAmount.innerHTML = GameHandler.farmValue() + "g";
    }

    static secLoop = window.setInterval(function(){
        GameHandler.Fent += GameHandler.farmValue();
    }, 1000);

    static gameLoop = window.setInterval(function(){
        GameHandler.update()
    }, 100);
}