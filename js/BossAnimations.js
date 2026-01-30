export default class BossAnimations {
    
    static async playBossDance() {
        const copImg = document.querySelector('#copFent img');
        if (!copImg) return;

        copImg.classList.add('dancing');
        await new Promise(resolve => setTimeout(resolve, 3000));
        copImg.classList.remove('dancing');
    }

    static async playPlayerWin() {
        const playerContainer = document.querySelector('.five.columns:first-of-type');
        if (!playerContainer) return;

        // Create coke blessing animation
        const blessing = document.createElement('div');
        blessing.className = 'coke-blessing';
        blessing.innerHTML = `
            <div class="blessing-text neon-green">GEORGE DROYD WON!</div>
            <div class="blessing-text neon-yellow">BLESSED WITH COKE!</div>
            <img src="img/coke.gif" class="coke-image" alt="Coke Blessing">
        `;
        
        playerContainer.appendChild(blessing);

        // Animate blessing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Throw boss into fent reactor
        const copImg = document.querySelector('#copFent img');
        if (copImg) {
            copImg.classList.add('thrown-animation');
            await new Promise(resolve => setTimeout(resolve, 1500));
            copImg.classList.add('disappeared');
        }

        // Remove blessing
        blessing.remove();
    }

    static async playBossWin() {
        const copImg = document.querySelector('#copFent img');
        if (!copImg) return;

        // Play dancing gif
        copImg.classList.add('boss-victory-dance');
        await new Promise(resolve => setTimeout(resolve, 4000));
        copImg.classList.remove('boss-victory-dance');
    }

    static createExplosionEffect(element) {
        const rect = element.getBoundingClientRect();
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = rect.left + 'px';
        explosion.style.top = rect.top + 'px';
        explosion.innerHTML = `<div class="explosion-particles"></div>`;
        
        document.body.appendChild(explosion);

        setTimeout(() => explosion.remove(), 1000);
    }
}
