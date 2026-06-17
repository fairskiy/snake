document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restartBtn');

    // Створюємо гру
    const game = new SnakeGame(canvas, scoreElement);
    
    // Одразу запускаємо змійку
    game.reset();

    // Обробник клавіатури (стрілочки та WASD)
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        
        if (key === 'arrowleft' || key === 'a' || key === 'а') game.changeDirection('LEFT');
        if (key === 'arrowup' || key === 'w' || key === 'ц') game.changeDirection('UP');
        if (key === 'arrowright' || key === 'd' || key === 'в') game.changeDirection('RIGHT');
        if (key === 'arrowdown' || key === 's' || key === 'і' || key === 'ы') game.changeDirection('DOWN');
    });

    // Кнопка перезапуску
    restartBtn.addEventListener('click', () => {
        game.reset();
    });
});