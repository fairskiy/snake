class SnakeGame {
    constructor(canvas, scoreElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scoreElement = scoreElement;
        
        this.tileCount = canvas.width / CONFIG.GRID_SIZE;
        this.gameInterval = null; 
    }

    reset() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }

        this.snake = [
            {x: 10, y: 10},
            {x: 9, y: 10},
            {x: 8, y: 10}
        ];
        this.food = this.getRandomFoodPosition();
        this.dx = 1;  
        this.dy = 0;
        this.score = 0;
        this.isGameOver = false;
        this.scoreElement.innerText = this.score;

        // Запуск ігрового циклу
        this.gameInterval = setInterval(() => {
            this.update();
            this.draw();
        }, CONFIG.GAME_SPEED);
    }

    getRandomFoodPosition() {
        return {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }

    changeDirection(direction) {
        if (direction === 'LEFT' && this.dx !== 1) { this.dx = -1; this.dy = 0; }
        if (direction === 'UP' && this.dy !== 1) { this.dx = 0; this.dy = -1; }
        if (direction === 'RIGHT' && this.dx !== -1) { this.dx = 1; this.dy = 0; }
        if (direction === 'DOWN' && this.dy !== -1) { this.dx = 0; this.dy = 1; }
    }

    update() {
        if (this.isGameOver) return;

        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        if (this.checkCollision(head)) {
            this.isGameOver = true;
            clearInterval(this.gameInterval); 
            this.draw(); 
            return;
        }

        this.snake.unshift(head);

        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.scoreElement.innerText = this.score;
            this.food = this.getRandomFoodPosition();
        } else {
            this.snake.pop();
        }
    }

    checkCollision(head) {
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }

    draw() {
        this.ctx.fillStyle = CONFIG.COLORS.BACKGROUND;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.snake.forEach((part, index) => {
            this.ctx.fillStyle = index === 0 ? CONFIG.COLORS.SNAKE_HEAD : CONFIG.COLORS.SNAKE_BODY;
            this.ctx.fillRect(
                part.x * CONFIG.GRID_SIZE, 
                part.y * CONFIG.GRID_SIZE, 
                CONFIG.GRID_SIZE - 2, 
                CONFIG.GRID_SIZE - 2
            );
        });

        this.ctx.fillStyle = CONFIG.COLORS.FOOD;
        this.ctx.fillRect(
            this.food.x * CONFIG.GRID_SIZE, 
            this.food.y * CONFIG.GRID_SIZE, 
            CONFIG.GRID_SIZE - 2, 
            CONFIG.GRID_SIZE - 2
        );

        if (this.isGameOver) {
            this.ctx.fillStyle = CONFIG.COLORS.OVERLAY;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = 'bold 28px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('ГРА ЗАКІНЧЕНА', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
}