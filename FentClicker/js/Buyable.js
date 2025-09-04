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
    }

    buy()
    {
        if(GameHandler.Fent >= this.price)
        {
            GameHandler.Fent -= this.price;
            this.price *= this.priceIncr;
            this.buyEvent();
            Printer.render(this);
        }
    }

    buyEvent()
    {
        return;
    }

}