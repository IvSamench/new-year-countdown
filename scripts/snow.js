class Snowflake {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.initialize();
        this.originX = 0;
        this.originY = 0;
        this.isAffectedByMouse = false;
        this.mouseForceX = 0;
        this.mouseForceY = 0;
        this.mouseForceDecay = 0.95;
    }

    initialize() {
        this.x = Math.random() * this.canvas.width;
        this.y = -10;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + this.size * 0.2;
        this.wind = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 1.5 + 0.5;
        
        this.originX = this.x;
        this.originY = this.y;
    }

    update() {
        if (this.isAffectedByMouse) {
            this.x += this.mouseForceX;
            this.y += this.mouseForceY;
            
            this.mouseForceX *= this.mouseForceDecay;
            this.mouseForceY *= this.mouseForceDecay;
            
            if (Math.abs(this.mouseForceX) < 0.1 && Math.abs(this.mouseForceY) < 0.1) {
                this.isAffectedByMouse = false;
                this.mouseForceX = 0;
                this.mouseForceY = 0;
            }
        } else {
            this.y += this.speed;
            this.x += this.wind;
        }

        if (this.y > this.canvas.height) {
            this.initialize();
            this.y = -10;
        }

        if (this.x > this.canvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.canvas.width;
        }
    }

    applyMouseForce(mouseX, mouseY, force) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const mouseRadius = 100;
        
        if (distance < mouseRadius) {
            const power = (1 - distance / mouseRadius) * force;
            
            const angle = Math.atan2(dy, dx);
            this.mouseForceX = Math.cos(angle) * power;
            this.mouseForceY = Math.sin(angle) * power;
            
            this.isAffectedByMouse = true;
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.fill();
    }
}

class Snow {
    constructor(canvasId, count = 150) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas с id ${canvasId} не найден`);
        }
        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.count = count;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseSpeed = 0;
        this.prevMouseX = 0;
        this.prevMouseY = 0;
        this.isMouseMoving = false;
        
        this.initialize();
        this.setupMouseTracking();
    }

    initialize() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        for (let i = 0; i < this.count; i++) {
            this.snowflakes.push(new Snowflake(this.canvas));
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
            
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            const dx = this.mouseX - this.prevMouseX;
            const dy = this.mouseY - this.prevMouseY;
            this.mouseSpeed = Math.sqrt(dx * dx + dy * dy);
            
            this.isMouseMoving = this.mouseSpeed > 5;
            
            if (this.isMouseMoving && this.mouseSpeed > 10) {
                this.blowSnowflakes();
            }
        });
    }
    
    blowSnowflakes() {
        const force = Math.min(this.mouseSpeed * 0.2, 10);
        
        this.snowflakes.forEach(snowflake => {
            snowflake.applyMouseForce(this.mouseX, this.mouseY, force);
        });
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });
        requestAnimationFrame(() => this.update());
    }

    start() {
        this.update();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('snow-canvas')) {
        const snowCanvas = document.createElement('canvas');
        snowCanvas.id = 'snow-canvas';
        snowCanvas.className = 'snow-canvas';
        document.body.appendChild(snowCanvas);
    }

    const snow = new Snow('snow-canvas');
    snow.start();
});