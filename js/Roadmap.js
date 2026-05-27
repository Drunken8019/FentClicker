import Component from "./Component.js";
import Container from "./Container.js";
import Printer from "./Printer.js";
import Boss from "./Boss.js";

export default class Roadmap extends Component
{
    static allBoses = []

    constructor(container)
    {
        super(container, true);
    }

    getHtml()
    {
        let x = 0
        let y = 100
        let xIncr = 600
        let yIncr = 300
        let yOffset = 150
        let yOffset2 = 0
        let totalWidth = Roadmap.allBoses.length * xIncr
        if(Roadmap.allBoses == undefined) { return "<h1>No bosses :(</h1>";}
        let result = `<svg width="${totalWidth}" height="600">`;
        for(let [count, boss] of Roadmap.allBoses.entries())
        {
            if(yIncr < 0) {yOffset = 0; yOffset2 = 150} else {yOffset = 150; yOffset2 = 0}
            result += this.buildRect(x, y, 400, 150)
            result += `<svg x=${x} y=${y} width="400px" height = "150px">`
                + this.buildImage(100, 0, boss.img) // `<image x="${x}" y="${y}" width="200" height="150" href="${boss.img}"/>`
                + this.buildText(4, 20, boss.name) // `<text x="${x}" y="${y+25}" stroke="white" fill="white">${boss.name}</text>`
                + this.buildText(4, 50, boss.difficulty) // `<text x="${x}" y="${y+50}" stroke="white" fill="white">${boss.difficulty}</text>`
            + `</svg>`
            if(count !== Roadmap.allBoses.length - 1) {result += this.buildPath(x+400, y+yOffset, x+xIncr, y+yIncr+yOffset2) } // `<path d="M ${x+200} ${y+yOffset} L ${x+xIncr} ${y+yIncr+yOffset2}" stroke="white"/>`}
            x += xIncr
            y += yIncr
            yIncr *= -1
        }
        result += "</svg>"
        return result
    }

    static registerBoss(boss)
    {
        this.allBoses.push(boss)
    }

    buildImage(x, y, imgHref, width = "50%", height = "100%")
    {
        return `<image x="${x}" y="${y}" width="${width}" height="${height}" href="${imgHref}"/>`
    }

    buildText(x, y, content, fill = "white", stroke = "white")
    {
        return `<text x="${x}" y="${y}" stroke="${stroke}" fill="${fill}">${content}</text>`
    }

    buildPath(originX, originY, destX, destY, stroke = "white")
    {
        return `<path d="M ${originX} ${originY} L ${destX} ${destY}" stroke="${stroke}"/>`
    }

    buildRect(x, y, width, height, stroke="white", fill="none")
    {
        return `<rect x="${x}" y="${y}" width="${width}" height="${height}" style="fill:${fill}; stroke:${stroke};" />`
    }
}
