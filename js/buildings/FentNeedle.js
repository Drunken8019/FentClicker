import Building  from "../Building.js";
import GameHandler from "../GameHandler.js";

export default class FentNeedle extends Building
{
    constructor(container)
    {
        super(50, 1.2, "Fent Needle", "Adds +1 to your clicks", "fentNeedle.avif", container);
    }

    buyEvent()
    {
        GameHandler.click += 1;
    }

    
}