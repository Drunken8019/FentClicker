import GameHandler from "./GameHandler.js";
import Building from "./Building.js";
import Container from "./Container.js";
import Printer from "./Printer.js";
import Boost from "./Boost.js";
import Bossfight from "./Bossfight.js";

GameHandler.init();


var buildingContainer = new Container("buildingContainer");
var boostContainer = new Container("boostContainer");

var fentNeedle = new Building(50, 1.2, "Fent Needle", "Adds +1 to your clicks", "fentNeedle.avif", buildingContainer, function(){
    GameHandler.click += 1;
});

var fentPipe = new Building(200, 1.5, "Fent Pipe", "Multiplies your clicks by x2", "fent_pipe.jpg", buildingContainer, function(){
    GameHandler.clickMult += 2;
});

var fentReactor = new Building(5000, 1.1, "Fent Reactor", "Cooks 100 Fent/s", "fentReactor.png", buildingContainer, function(){
    GameHandler.autoFarm += 100;
});

var jewishFloyd = new Building(100000, 1.5, "Jorge Floydstein", "Multiplies your Fent cooking by x2", "jewish-floyd.jpg", buildingContainer, function(){
    GameHandler.autoFarmMult += 2;
});

var fentPress = new Building(100000, 1.1, "Fent Press", "Compresses your Fent into Bricks, increasing your Fent Cooking by 200 Fent/s", "fentPress.jpg",buildingContainer, function(){
    GameHandler.autoFarm += 200;
})

var fentMixer = new Building(200000, 1.1, "Fent Mixer", "Combines your Fent with additives, increasing your Fent Cooking by 400 Fent/s", "fentMixer.jpg",buildingContainer, function(){
    GameHandler.autoFarm += 400;
})

var georgeDroyd = new Building(400000, 1.6, "George Droyd", "Mechanical George Floyd, with unmatched productivity. If you own 5 or more Fent Reactors, 5 will be consumed,"
    + " upgrading Georges Droyd Multiplier to x20. Multiplies Multiplies your Fent cooking by x5/x20", "george-droyd.jpg", buildingContainer, function(){
    if(fentReactor.count >= 5)
        {
            fentReactor.count -= 5;
            GameHandler.autoFarmMult += 20;
            GameHandler.autoFarm -= 100 * 5;
            fentReactor.update();
        }
    else{
            GameHandler.autoFarmMult += 5;
        }
})

var blmBoost = new Boost(1000, 1, "BLM Boost", "Black Lives Matter - Doubles Fent Cooking and Fent Clicks", "blm.jpg", 1000 * 60 * 2, boostContainer, function(){
    GameHandler.globalClickMult += 2;
    GameHandler.globalFarmMult += 2;
},
function(){
    GameHandler.globalClickMult -= 2;
    GameHandler.globalFarmMult -= 2;
});

Printer.init();