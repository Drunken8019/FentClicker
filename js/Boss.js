import Roadmap from "./Roadmap.js";

export default class Boss {
    
    constructor(name, img, difficulty, BossFentPerSecond) {
        this.name = name;
        this.img = img;
        this.difficulty = difficulty;
        this.BossFentPerSecond = BossFentPerSecond;
        this.unlocked = false;
        Roadmap.registerBoss(this)
    }


}