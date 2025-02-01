/*let fentCount = 0;
let fentPerClick = 1;
let highscore = localStorage.getItem("highscore") || 0;

const fentDisplay = document.getElementById("currentFent");
const fentClickButton = document.getElementById("fentClick");
const highscoreDisplay = document.getElementById("highscore");
highscoreDisplay.innerText = `Highscore: ${highscore}`;

document.body.insertBefore(highscoreDisplay, fentDisplay.nextSibling);

fentClickButton.addEventListener("click", () => {
    fentCount += fentPerClick;
    fentDisplay.innerText = `FentStash: ${fentCount}`;

    if (fentCount > highscore) {
        highscore = fentCount;
        localStorage.setItem("highscore", highscore);
        highscoreDisplay.innerText = `Highscore: ${highscore}`;
    }
});

geht nu nd zählt immer mit 1 egal ob upgraded
*/