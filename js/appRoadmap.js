import Container from "./Container.js"
import Roadmap from "./Roadmap.js"
import Printer from "./Printer.js"
import Boss from "./Boss.js"

var roadmapContainer = new Container("roadmapContainer", "roadmap")
let roadmap = new Roadmap(roadmapContainer)
let Cop = new Boss("The Cop", "./img/police.gif", "Easy", 4)
let IceOfficer = new Boss("The ICE Officer", "./img/ice_officer.avif", "Medium", 4)
let PeasantGoy = new Boss("Peasant Goy", "./img/soyjak_outsmarting.avif", "Hard", 4)
let KirkifiedTower = new Boss("The Kirkified Tower", "./img/kirkified_temple.avif", "Easy", 4)

Printer.init("roadmap")