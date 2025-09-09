import Buyable from "./Buyable.js";
import Component from "./Component.js";
import Container from "./Container.js";
import Printer from "./Printer.js";

class BoostTimer extends Component
{
    static second = 1000;
    static minute = BoostTimer.second * 60;
    static hour = BoostTimer.minute * 60;

    constructor(container, name, ttl, id, dieEvent = null)
    {
        super(container, true);
        this.name = name;
        this.ttl = ttl;
        this.storedTtl = ttl;
        this.id = id;
        this.timerInterval;
        if(dieEvent) this.dieEvent = dieEvent;
    }

    disableBoostButton(btn)
    {
        this.btn = btn;
        this.btn.setAttribute("disabled", "");
    }

    enableBoostButton()
    {
        this.btn.removeAttribute("disabled");
    }

    dieEvent()
    {}

    getHtml()
    {
        return `
            <h6 id="boostTimer${this.id}" class="neon-purple"></h6>
        `
    }

    clearSelf()
    {
        let field = document.getElementById(`boostTimer${this.id}`)
        if(!field) return;
        field.innerText = "";
    }

    start()
    {
        let field = document.getElementById(`boostTimer${this.id}`)
        if(!field) return;

        let mins = Math.floor(this.ttl / BoostTimer.minute);
        let remaining = this.ttl - mins * BoostTimer.minute;
        let secs = remaining / BoostTimer.second;
        field.innerText = `${this.name}: ${mins}:${secs}`;
        this.ttl -= BoostTimer.second;

        this.timerInterval = window.setInterval(function(timer) {
            let mins = Math.floor(timer.ttl / BoostTimer.minute);
            let remaining = timer.ttl - mins * BoostTimer.minute;
            let secs = remaining / BoostTimer.second;
            field.innerText = `${timer.name}: ${mins}:${secs}`;
            timer.ttl -= BoostTimer.second;
        }, BoostTimer.second ,this);

        window.setTimeout(function(timer) {
            clearInterval(timer.timerInterval);
            Printer.clear(timer);
            timer.dieEvent();
            timer.ttl = timer.storedTtl;
            timer.enableBoostButton();
        }, this.ttl + 1500, this);
    }
}

export default class Boost extends Buyable
{
    static boostContainer = new Container('boostTimeContainer');

    constructor(price, priceIncr, name, desc, img, ttl, container, event = null, dieEvent = null)
    {
        super(price, priceIncr, container);
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.ttl = ttl;
        if(event) this.buyEvent = event;
        if(dieEvent) this.dieEvent = dieEvent;
        this.timer = new BoostTimer(Boost.boostContainer, name, ttl, this.id, dieEvent);
    }

    getHtml()
    {
        return `
        <button id="boostBtn${this.id}">
            <img src="img/${this.img}" style="width: 250px; height: 205px;">
            <h2>${this.name}</h2>
        </button>
        <p>${this.desc}</p>
        <p id="priceTag${this.id}">Price: ${this.price} Fent</p>`;
    }

    dieEvent()
    {}

    buy()
    {
        super.buy();
        this.timer.disableBoostButton(document.getElementById(`boostBtn${this.id}`));
        this.timer.start();
    }

    start()
    {
        this.timer.start();
    }

    update()
    {
        let priceTag = document.getElementById(`priceTag${this.id}`);
        priceTag.innerHTML = `Price: ${this.price} Fent`;
    }

    listener()
    {
        let id = "boostBtn" + this.id;
        return {"action" : "click",
                "id" : id
        };
    }
}