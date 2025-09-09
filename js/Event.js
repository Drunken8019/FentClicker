export default class Event
{
    static eventPool = [];

    constructor(title, rarity, boost)
    {
        this.title = title;
        this.rarity = rarity;
        this.boost = boost;
        Event.eventPool.push(this);
    }
}