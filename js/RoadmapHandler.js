export default class RoadmapHandler {
    static init() {
        console.log('Roadmap loaded - Select a boss to fight!');
        
        const bossCards = document.querySelectorAll('.boss-card');
        bossCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    RoadmapHandler.init();
});
