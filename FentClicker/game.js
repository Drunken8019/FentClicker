var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var currentFent = document.getElementById("currentFent");
var Fent = 0;
FentClick.addEventListener("click", function() {
    increaseFent(1);
});

function increaseFent(mult)
{
    Fent++;
    FentAdded.innerHTML = 1 * mult;
    FentAdded.style.opacity = "100%";
    FentAdded.style.left = (event.clientX + 5) + "px";
    FentAdded.style.top = (event.clientY + 15) + "px";
    setTimeout(() => {FentAdded.style.opacity = "0";}, 500)
    currentFent.innerHTML = "FentStash: " + Fent + "g";
}