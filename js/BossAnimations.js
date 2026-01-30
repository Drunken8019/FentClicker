export default class BossAnimations {
    
    static async playBossDance() {
        const container = document.getElementById('animationContainer');
        
    
        const backdrop = document.createElement('div');
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 600;
        `;
        
        const img = document.createElement('img');
        img.style.cssText = `
            width: 500px;
            height: 400px;
            object-fit: contain;
            animation: bossDanceAnimation 0.5s infinite;
        `;
        
        const currentBoss = new URLSearchParams(window.location.search).get('boss') || 'cop';
        const danceGifSrc = 'img/jews_dancing.gif';
        
        img.src = danceGifSrc;
        img.alt = 'Victory Dance';
        backdrop.appendChild(img);
        container.appendChild(backdrop);

  
        await new Promise(resolve => setTimeout(resolve, 4000));
        

        backdrop.remove();
    }

    static async playPlayerWin() {
        const container = document.getElementById('animationContainer');
        
      
        const blessing = document.createElement('div');
        blessing.className = 'coke-blessing';
        
        const text1 = document.createElement('div');
        text1.className = 'blessing-text neon-green';
        text1.innerHTML = 'GEORGE DROYD WON!';
        
        const text2 = document.createElement('div');
        text2.className = 'blessing-text neon-yellow';
        text2.innerHTML = 'BLESSED WITH FENT!';
        
        const img = document.createElement('img');
        img.className = 'coke-image';
        img.src = 'img/fentNeedle.avif';
        img.alt = 'Fent Blessing';
        
        blessing.appendChild(text1);
        blessing.appendChild(text2);
        blessing.appendChild(img);
        container.appendChild(blessing);

   
        await new Promise(resolve => setTimeout(resolve, 2500));

        blessing.remove();

        const bossImage = document.getElementById('bossImage');
        if (bossImage) {
            bossImage.classList.add('thrown-animation');
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }

    static createExplosionEffect(element) {
        const rect = element.getBoundingClientRect();
        const container = document.getElementById('animationContainer');
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = rect.left + 'px';
        explosion.style.top = rect.top + 'px';
        explosion.innerHTML = `<div class="explosion-particles"></div>`;
        
        container.appendChild(explosion);

        setTimeout(() => explosion.remove(), 1000);
    }
}
