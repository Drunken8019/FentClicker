var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var fentNeedleBuy = document.getElementById("fentNeedleBuy");

var Fent = 0;
var linearIncr = 0;

FentClick.addEventListener("click", function() {
    increaseFent(linearIncr);
});

fentNeedleBuy.addEventListener("click", function() {
    if(Fent >= 50)
        {
            Fent -= 50;
            linearIncr++;
        }
});

function increaseFent(mult)
{
    Fent += 1 + mult;
    FentAdded.innerHTML = 1 + mult;
    FentAdded.style.opacity = "100%";
    FentAdded.style.left = (event.clientX + 5) + "px";
    FentAdded.style.top = (event.clientY + 15) + "px";
    setTimeout(() => {FentAdded.style.opacity = "0";}, 500)
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}