import Perks from './Perks.js';
import BossAnimations from './BossAnimations.js';

export default class Bossfight {
    static copAutoFent = 0;
    static yourClickFent = 0;
    static timeLeft = 15; // sekunden timer am anfang
    static copInterval = null;
    static bossStarted = false;
    static currentBoss = 'cop';

    static fentClickButton = document.getElementById("fentClick");
    static yourFentCounter = document.getElementById("yourFentBossfight");
    static copFentCounter = document.getElementById("copFentBossfight");
    static timerDisplay = document.getElementById("timer");

    static popup = document.getElementById("winnerPopup");
    static popupMessage = document.getElementById("winnerMessage");
    static popupClose = document.getElementById("popupClose");

    static init() {
        Perks.init();
        Bossfight.currentBoss = Bossfight.getBossFromURL();

        Bossfight.fentClickButton.addEventListener("click", function() {
            if (!Bossfight.bossStarted) {
                Bossfight.bossStarted = true;
                Bossfight.startCopGenerator();
                Bossfight.startTimer();
            }
            Bossfight.increaseYourFent();
        });

        Bossfight.popupClose.addEventListener("click", () => {
            Bossfight.popup.classList.add("hidden");
            setTimeout(() => {
                window.location.href = 'roadmap.html';
            }, 500);
        });
    }

    static getBossFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get('boss') || 'cop';
    }

    static increaseYourFent() {
        const multiplier = Perks.getMultiplier();
        Bossfight.yourClickFent += (1 * multiplier);
        Bossfight.updateYourFentDisplay();
    }

    static updateYourFentDisplay() {
        Bossfight.yourFentCounter.innerHTML = Bossfight.yourClickFent + "g";
    }

    static startCopGenerator() {
        Bossfight.copInterval = setInterval(() => {
            Bossfight.copAutoFent += 1;
            Bossfight.updateCopFentDisplay();
        }, 160);
    }

    static updateCopFentDisplay() {
        Bossfight.copFentCounter.innerHTML = Bossfight.copAutoFent + "g";
    }

    static startTimer() {
        Bossfight.timerDisplay.innerHTML = Bossfight.timeLeft;
        let countdown = setInterval(() => {
            Bossfight.timeLeft -= 1;
            Bossfight.timerDisplay.innerHTML = Bossfight.timeLeft;

            if (Bossfight.timeLeft <= 0) {
                clearInterval(countdown);   
                Bossfight.endGame();
            }
        }, 1000);
    }

    static endGame() {
       
        if (Bossfight.copInterval) {
            clearInterval(Bossfight.copInterval);
        }
        Bossfight.checkWinner();
    }


    static checkWinner() {
        let result;
        if (Bossfight.yourClickFent > Bossfight.copAutoFent) {
            result = "GEORGE DROYD WON!<br>Blessed with COKE!";
            Bossfight.popupMessage.innerHTML = result;
            Bossfight.popup.classList.remove("hidden");
            BossAnimations.playPlayerWin().then(() => {
                // Keep popup visible for result
            });
        } else if (Bossfight.yourClickFent < Bossfight.copAutoFent) {
            result = "THE COP SWISS CHEESE'D YOUR AHH!";
            Bossfight.popupMessage.innerHTML = result;
            Bossfight.popup.classList.remove("hidden");
            BossAnimations.playBossDance();
        } else {
            result = "SWISS CHEESE'D EACH OTHER!";
            Bossfight.popupMessage.innerHTML = result;
            Bossfight.popup.classList.remove("hidden");
        }
    }
}
