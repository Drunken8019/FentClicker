import Container from "./Container.js";

export default class Component
{
    static curId = 0;

    constructor(container, formatless = false)
    {
        this.id = Component.curId;
        this.formatless = formatless;
        Component.curId++;
        container.add(this);
    }


    getHtml()
    {
        return "";
    }

    listener()
    {
        return {"id" : null,
                "action" : null
        };
    }

    update(){} 

    event()
    {
        console.log("Component event");
    }
}