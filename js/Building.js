import Buyable from "./Buyable.js";

export default class Building extends Buyable
{
    constructor(price, priceIncr, name, desc, img, container, event = null)
    {
        super(price, priceIncr, container);
        this.name = name;
        this.desc = desc;
        this.img = img;
        if(event) this.buyEvent = event;
    }
    
    getHtml()
    {
        return `
        <button id="buildBtn${this.id}">
            <img src="img/${this.img}" style="width: 250px; height: 205px;">
            <h2>${this.name}</h2>
        </button>
        <p>${this.desc}</p>
        <p id="priceTag${this.id}">Price: ${this.price} Fent</p>
        <p id="countTag${this.id}">Owned: ${this.count}</p>`;
    }

    update()
    {
        let priceTag = document.getElementById(`priceTag${this.id}`);
        priceTag.innerHTML = `Price: ${this.price} Fent`;

        let countTag = document.getElementById(`countTag${this.id}`);
        countTag.innerHTML = `Owned: ${this.count}`;
    }

    listener()
    {
        let id = "buildBtn" + this.id;
        return {"action" : "click",
                "id" : id
        };
    }
}