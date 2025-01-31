var FentClick = document.getElementById("fentClick");
var FentAdded = document.getElementById("fentAdded");
var Fent = 0;
FentClick.addEventListener("click", increaseFent);

function increaseFent()
{
    Fent++;
    FentAdded.innerHTML = Fent;
    FentAdded.style.opacity = "100%";
    FentAdded.style.left = (event.clientX + 5) + "px";
    FentAdded.style.top = (event.clientY + 15) + "px";
    setTimeout(() => {FentAdded.style.opacity = "0";}, 500)
    
}