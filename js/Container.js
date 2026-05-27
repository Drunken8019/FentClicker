export default class Container
{
    static allContainers = [];

    constructor(id, boundSite = null)
    {
        this.content = "";
        this.id = id;
        this.element = this.load(id);
        this.components = [];
        this.row = 0;
        this.boundSite = boundSite
        Container.allContainers.push(this);
    }

    add(comp)
    {
        this.components.push(comp);
    }

    load(id)
    {
        return document.getElementById(id);
    }

    applyContent()
    {
        this.element.innerHTML = this.content;
    }
}