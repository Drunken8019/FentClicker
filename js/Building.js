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
            <img src="img/${this.computeImage()}" style="width: 250px; height: 205px;">
            <h2 id="building-name${this.id}">${this.computeName()}</h2>
        </button>
        <p id="building-desc${this.id}">${this.computeDescr()}</p>
        <p id="building-priceTag${this.id}">Price: ${this.computePrice()} Fent</p>
        <p id="building-countTag${this.id}">Owned: ${this.count}</p>`;
    }

    update()
    {

        let priceTag = document.getElementById(`building-priceTag${this.id}`);
        priceTag.innerHTML = `Price: ${this.computePrice()} Fent`;

        let countTag = document.getElementById(`building-countTag${this.id}`);
        countTag.innerHTML = `Owned: ${this.count}`;

        let descTag = document.getElementById(`building-desc${this.id}`);
        descTag.innerHTML = this.computeDescr();

        let nameTag = document.getElementById(`building-name${this.id}`);
        nameTag.innerHTML = this.computeName();
    }

    listener()
    {
        let id = "buildBtn" + this.id;
        return {"action" : "click",
                "id" : id
        };
    }

    computePrice()
    {
        if(this.price instanceof Function)
        {
            return this.price()
        } else return this.price
    }

    computePriceIncr()
    {
        if(this.priceIncr instanceof Function)
        {
            return this.priceIncr()
        } else return this.priceIncr
    }

    computeName()
    {
        if(this.name instanceof Function)
        {
            return this.name()
        } else return this.name
    }

    computeDescr()
    {
        if(this.desc instanceof Function) 
        {
            return this.desc();
        } else return this.desc

    }

    computeImage()
    {
        if(this.img instanceof Function)
        {
            return this.img()
        } else return this.img
    }
}