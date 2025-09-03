let highscore = localStorage.getItem("highscore") || 0;

const highscoreDisplay = document.getElementById("highscoreDisplay");
highscoreDisplay.innerHTML = `${highscore} g's of Fent`;