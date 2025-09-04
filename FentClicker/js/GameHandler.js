export default class GameHandler
{
    static Fent = 9999999;

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

    static displayPopUp(content)
    {
        GameHandler.FentAdded.innerHTML = content;
        GameHandler.FentAdded.style.opacity = "100%";
        GameHandler.FentAdded.style.left = (event.clientX + 5) + "px";
        GameHandler.FentAdded.style.top = (event.clientY + 15) + "px";
        setTimeout(() => {GameHandler.FentAdded.style.opacity = "0";}, 500)
    }

    static increaseFent()
    {
        GameHandler.Fent += this.clickValue();
        this.displayPopUp(this.clickValue());
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