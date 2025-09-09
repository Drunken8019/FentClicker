import Component from "./Component.js";
import Printer from "./Printer.js";
import GameHandler from "./GameHandler.js";

export default class Buyable extends Component
{
    constructor(price, priceIncr, container)
    {
        super(container);
        this.price = price;
        this.priceIncr = priceIncr;
        this.event = this.buy;
        this.count = 0;
    }

    buy()
    {
        if(GameHandler.Fent >= this.price)
        {
            GameHandler.Fent -= this.price;
            this.price *= this.priceIncr;
            this.price = Math.round(this.price);
            this.count++;
            this.buyEvent();
            Printer.render(this);
        }
    }

    buyEvent()
    {
        return;
    }

}