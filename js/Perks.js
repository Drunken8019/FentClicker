export default class Perks {
    static perks = {
        'q': { name: 'Double Click', multiplier: 2, duration: 5000, key: 'q' },
        'w': { name: 'Fast Mode', multiplier: 1.5, duration: 8000, key: 'w' },
        'e': { name: 'Mega Boost', multiplier: 3, duration: 3000, key: 'e' },
        'r': { name: 'Frenzy', multiplier: 5, duration: 2000, key: 'r' }
    };

    static activePerks = {};
    static multiplier = 1;
    static perkDisplay = null;

    static init() {
        Perks.perkDisplay = document.getElementById('perkDisplay') || Perks.createPerkDisplay();
        
        document.addEventListener('keydown', (e) => {
            if (Perks.perks[e.key.toLowerCase()]) {
                e.preventDefault();
                Perks.activatePerk(e.key.toLowerCase());
            }
        });
    }

    static createPerkDisplay() {
        const display = document.createElement('div');
        display.id = 'perkDisplay';
        display.className = 'perk-display';
        display.innerHTML = `
            <div class="perk-info">
                <p class="neon-green">Perks (Press Q, W, E, R)</p>
                <div id="activePerksList" class="active-perks"></div>
            </div>
        `;
        document.body.appendChild(display);
        return display;
    }

    static activatePerk(key) {
        const perk = Perks.perks[key];
        if (!perk) return;

        // Add to active perks
        if (!Perks.activePerks[key]) {
            Perks.activePerks[key] = {
                ...perk,
                endTime: Date.now() + perk.duration
            };

            Perks.updateMultiplier();
            Perks.updatePerkDisplay();

            // Remove after duration
            setTimeout(() => {
                delete Perks.activePerks[key];
                Perks.updateMultiplier();
                Perks.updatePerkDisplay();
            }, perk.duration);
        }
    }

    static updateMultiplier() {
        Perks.multiplier = 1;
        Object.values(Perks.activePerks).forEach(perk => {
            Perks.multiplier *= perk.multiplier;
        });
    }

    static updatePerkDisplay() {
        const list = document.getElementById('activePerksList');
        if (!list) return;

        if (Object.keys(Perks.activePerks).length === 0) {
            list.innerHTML = '<p class="neon-purple">No active perks</p>';
            return;
        }

        list.innerHTML = Object.values(Perks.activePerks).map(perk => `
            <div class="perk-item neon-yellow">
                ${perk.name} x${perk.multiplier}
            </div>
        `).join('');
    }

    static getMultiplier() {
        return Perks.multiplier;
    }
}
