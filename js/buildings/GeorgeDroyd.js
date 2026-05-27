import Building  from "../Building.js";
import GameHandler from "../GameHandler.js";

export default class GeorgeDroyd extends Building
{
    constructor(container, fentReactor)
    {
        super(400000, 1.6, "George Droyd", "", "george-droyd.avif", container);
        this.fentReactor = fentReactor;
        this.desc = this.description
    }

    buyEvent()
    {
        if(this.fentReactor.count >= 5)
        {
            this.fentReactor.count -= 5;
            GameHandler.autoFarmMult += 20;
            GameHandler.autoFarm -= 100 * 5;
            this.fentReactor.update();
        }
        else
        {
            GameHandler.autoFarmMult += 5;
        }
    }

    description()
    {
        let mult = "x5"
        if(this.fentReactor.count >= 5) mult = "x20"

        return `Mechanical George Floyd, with unmatched productivity. If you own 5 or more Fent Reactors, 5 will be consumed,`
        + ` upgrading Georges Droyd Multiplier to x20. Multiplies your Fent cooking by ${mult}`
    }
}