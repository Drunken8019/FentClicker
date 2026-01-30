import Perks from './Perks.js';
import BossAnimations from './BossAnimations.js';

export default class Bossfight {
    static copAutoFent = 0;
    static yourClickFent = 0;
    static timeLeft = 15;
    static copInterval = null;
    static bossStarted = false;
    static gameOver = false;
    static currentBoss = 'cop';
    static canClick = true;

    static bossImages = {
        'cop': 'img/cropped.gif',
        'narc': 'img/ice_officer.avif',
        'dealer': 'img/jewleaningback.avif',
        'cartel': 'img/kirkified_temple.avif'
    };

    static bossDanceGifs = {
        'cop': 'img/dancing.gif',
        'narc': 'img/ice_dancing.gif',
        'dealer': 'img/jew_dancing.gif',
        'cartel': 'img/cartel_dancing.gif'
    };

    static fentClickButton = document.getElementById("fentClick");
    static yourFentCounter = document.getElementById("yourFentBossfight");
    static copFentCounter = document.getElementById("copFentBossfight");
    static timerDisplay = document.getElementById("timer");
    static bossImage = document.getElementById("bossImage");

    static popup = document.getElementById("winnerPopup");
    static popupMessage = document.getElementById("winnerMessage");
    static popupClose = document.getElementById("popupClose");
    static animationContainer = document.getElementById("animationContainer");

    static init() {
        Perks.init();
        Bossfight.currentBoss = Bossfight.getBossFromURL();
        Bossfight.loadBossImage();

        Bossfight.fentClickButton.addEventListener("click", function() {
            if(!Bossfight.canClick) return;
            Bossfight.canClick = false;
            Bossfight.fentClickButton.classList.add("clicked");
            setTimeout(() => {
                Bossfight.fentClickButton.classList.remove("clicked");
                Bossfight.canClick = true;
            }, 2);

            if (!Bossfight.bossStarted && !Bossfight.gameOver) {
                Bossfight.bossStarted = true;
                Bossfight.startCopGenerator();
                Bossfight.startTimer();
            }
            if (!Bossfight.gameOver) {
                Bossfight.increaseYourFent();
            }
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

    static loadBossImage() {
        const imageSrc = Bossfight.bossImages[Bossfight.currentBoss] || Bossfight.bossImages['cop'];
        if (Bossfight.bossImage) {
            Bossfight.bossImage.src = imageSrc;
        }
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
        Bossfight.gameOver = true;
        Bossfight.checkWinner();
    }

    static async checkWinner() {
        if (Bossfight.yourClickFent > Bossfight.copAutoFent) {
           
            await BossAnimations.playPlayerWin();
            Bossfight.popupMessage.innerHTML = "GEORGE DROYD WON!<br>BLESSED WITH COKE!";
        } else if (Bossfight.yourClickFent < Bossfight.copAutoFent) {
          
            await BossAnimations.playBossDance();
            Bossfight.popupMessage.innerHTML = "THE COP SWISS CHEESE'D YOUR AHH!";
        } else {
          
            Bossfight.popupMessage.innerHTML = "SWISS CHEESE'D EACH OTHER!";
        }

        Bossfight.popup.classList.remove("hidden");
    }
}
