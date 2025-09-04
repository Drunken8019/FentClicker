import Component from "./Component.js";
import Container from "./Container.js";

export default class Printer
{

    static init()
    {
        Container.allContainers.forEach(function (container, index){
            //debugger;
            container.components.forEach(function (comp, index) {
                if(comp.formatless) container.content += comp.getHtml();
                else
                {
                    container.row++;
                    if(container.row == 1) container.content += '<div class="row">';
                    container.content += `<div class="six columns" id="comp${comp.id}">` + comp.getHtml() + '</div>';
                    if(container.row == 2) {container.content += '</div>'; container.row = 0;}
                }
            });
            container.applyContent();
        });

        Container.allContainers.forEach(function (container, index){
            container.components.forEach(function (comp, index) {
                Printer.registerListener(comp);
            });
        });
    }

    static renderAll()
    {
        Component.allComponents.forEach(function (comp, index) {
            render(comp);
        });
    }

    static render(comp)
    {
        let elem = document.getElementById("comp" + comp.id);
        if(elem)
        {
            comp.update();
        }
    }

    static clear(comp)
    {
        if(comp.formatless) {
            comp.clearSelf();
            return;
        }
        let elem = document.getElementById("comp" + comp.id);
        elem.innerHTML = "";
    }

    static registerListener(comp)
    {
        let listener = comp.listener();
        if(!listener.id) return;
        let elem = document.getElementById(listener.id);
        elem.addEventListener(listener.action, function() {
            comp.event();
        });
    }
}