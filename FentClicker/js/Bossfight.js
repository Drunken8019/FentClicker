export default class Bossfight {
    static copAutoFent = 0;
    static yourClickFent = 0;
    static timeLeft = 15; // sekunden timer am anfang
    static copInterval = null; 

    static fentClickButton = document.getElementById("fentClick");
    static yourFentCounter = document.getElementById("yourFentBossfight");
    static copFentCounter = document.getElementById("copFentBossfight");
    static timerDisplay = document.getElementById("timer");

    static popup = document.getElementById("winnerPopup");
    static popupMessage = document.getElementById("winnerMessage");
    static popupClose = document.getElementById("popupClose");

    static init() {
        Bossfight.fentClickButton.addEventListener("click", function() {
            Bossfight.increaseYourFent();
        });

        Bossfight.startCopGenerator();
        Bossfight.startTimer();

        Bossfight.popupClose.addEventListener("click", () => {
            Bossfight.popup.classList.add("hidden");
        });
    }

    static increaseYourFent() {
        Bossfight.yourClickFent += 1;
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
            result = "you swiss chees'ed the cop!";
        } else if (Bossfight.yourClickFent < Bossfight.copAutoFent) {
            result = "the cop swiss chees'ed your ahh!";
        } else {
            result = "swiss chees'ed each other!";
        }

        Bossfight.popupMessage.innerHTML = result;
        Bossfight.popup.classList.remove("hidden");
    }
}
