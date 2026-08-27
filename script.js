const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const gameOver = document.getElementById("gameOver");

const healthText = document.getElementById("health");
const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");
const bestText = document.getElementById("best");
const bestMenu = document.getElementById("bestMenu");

const finalScore = document.getElementById("finalScore");
const finalLevel = document.getElementById("finalLevel");

const powerFill = document.getElementById("powerFill");
const bossWarning = document.getElementById("bossWarning");

let W, H;

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

/* =========================
   ESTADO DO JOGO
========================= */

let playing = false;

let score = 0;
let level = 1;
let health = 100;
let best = Number(localStorage.getItem("neonBest")) || 0;

let kills = 0;
let spawnTimer = 0;
let shootCooldown = 0;
let power = 0;

let player;
let enemies = [];
let bullets = [];
let particles = [];
let coins = [];
let powerUps = [];

let keys = {};
let mouse = {
    x: W / 2,
    y: H / 2,
    down: false
};

bestText.textContent = best;
bestMenu.textContent = best;

/* =========================
   CONTROLES
========================= */

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;

    if (
        ["arrowup", "arrowdown", "arrowleft", "arrowright", " "]
        .includes(e.key.toLowerCase())
    ) {
        e.preventDefault();
    }
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});

canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener("mousedown", () => {
    mouse.down = true;
});

window.addEventListener("mouseup", () => {
    mouse.down = false;
});

/* CONTROLE MOBILE */

canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];

    mouse.x = t.clientX;
    mouse.y = t.clientY;
    mouse.down = true;
}, { passive: true });

canvas.addEventListener("touchmove", e => {
    const t = e.touches[0];

    mouse.x = t.clientX;
    mouse.y = t.clientY;
}, { passive: true });

canvas.addEventListener("touchend", () => {
    mouse.down = false;
});

/* =========================
   CLASSES
========================= */

class Player {

    constructor() {
        this.x = W / 2;
        this.y = H / 2;
        this.radius = 17;
        this.speed = 5;
        this.angle = 0;
    }

    update() {

        let dx = 0;
        let dy = 0;

        if (keys.w || keys.arrowup) dy--;
        if (keys.s || keys.arrowdown) dy++;
        if (keys.a || keys.arrowleft) dx--;
        if (keys.d || keys.arrowright) dx++;

        if (dx || dy) {
            const length = Math.hypot(dx, dy);

            this.x += dx / length * this.speed;
            this.y += dy / length * this.speed;
        }

        this.x = Math.max(20, Math.min(W - 20, this.x));
        this.y = Math.max(20, Math.min(H - 20, this.y));

        this.angle = Math.atan2(
            mouse.y - this.y,
            mouse.x - this.x
        );

        if (mouse.down) shoot();
    }

    draw() {

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00f7ff";

        /* corpo */

        ctx.fillStyle = "#00f7ff";

        ctx.beginPath();
        ctx.moveTo(23, 0);
        ctx.lineTo(-13, -14);
        ctx.lineTo(-7, 0);
        ctx.lineTo(-13, 14);
        ctx.closePath();
        ctx.fill();

        /* núcleo */

        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(2, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class Enemy {

    constructor(type = "normal") {

        this.type = type;

        const side = Math.floor(Math.random() * 4);

        if (side === 0) {
            this.x = Math.random() * W;
            this.y = -40;
        } else if (side === 1) {
            this.x = W + 40;
            this.y = Math.random() * H;
        } else if (side === 2) {
            this.x = Math.random() * W;
            this.y = H + 40;
        } else {
            this.x = -40;
            this.y = Math.random() * H;
        }

        if (type === "fast") {
            this.radius = 11;
            this.speed = 2.8 + level * .08;
            this.health = 1;
            this.color = "#ffe600";
            this.points = 20;
        }

        else if (type === "tank") {
            this.radius = 25;
            this.speed = .7 + level * .04;
            this.health = 4 + Math.floor(level / 3);
            this.color = "#a020f0";
            this.points = 50;
        }

        else {
            this.radius = 16;
            this.speed = 1.2 + level * .08;
            this.health = 1 + Math.floor(level / 7);
            this.color = "#ff1744";
            this.points = 10;
        }
    }

    update() {

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        const distance = Math.hypot(dx, dy);

        this.x += dx / distance * this.speed;
        this.y += dy / distance * this.speed;

        if (distance < this.radius + player.radius) {

            health -= this.type === "tank" ? .8 : 1.5;

            createExplosion(
                this.x,
                this.y,
                this.color,
                4
            );

            this.x = -9999;
        }
    }

    draw() {

        ctx.save();

        ctx.shadowBlur = 22;
        ctx.shadowColor = this.color;

        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = "#ffffff55";

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius * .35,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }
}

class Bullet {

    constructor(x, y, angle) {

        this.x = x;
        this.y = y;
        this.radius = 4;
        this.speed = 12;

        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {

        ctx.save();

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffe600";

        ctx.fillStyle = "#ffe600";

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }
}

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;
        this.color = color;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.life = 1;
        this.size = Math.random() * 4 + 1;
    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= .96;
        this.vy *= .96;

        this.life -= .025;
    }

    draw() {

        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.globalAlpha = 1;
    }
}

class Coin {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.radius = 9;
        this.life = 600;
    }

    update() {

        this.life--;

        if (
            Math.hypot(
                this.x - player.x,
                this.y - player.y
            ) < this.radius + player.radius
        ) {

            score += 50;

            createExplosion(
                this.x,
                this.y,
                "#ffe600",
                10
            );

            this.life = 0;
        }
    }

    draw() {

        ctx.save();

        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ffe600";

        ctx.fillStyle = "#ffe600";

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = "#fff8a0";

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            4,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }
}

class PowerUp {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.radius = 13;
        this.life = 700;
    }

    update() {

        this.life--;

        if (
            Math.hypot(
                this.x - player.x,
                this.y - player.y
            ) < this.radius + player.radius
        ) {

            power = Math.min(100, power + 35);

            health = Math.min(100, health + 20);

            createExplosion(
                this.x,
                this.y,
                "#00f7ff",
                20
            );

            this.life = 0;
        }
    }

    draw() {

        ctx.save();

        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00f7ff";

        ctx.strokeStyle = "#00f7ff";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );
        ctx.stroke();

        ctx.fillStyle = "#00f7ff";

        ctx.fillRect(
            this.x - 3,
            this.y - 8,
            6,
            16
        );

        ctx.fillRect(
            this.x - 8,
            this.y - 3,
            16,
            6
        );

        ctx.restore();
    }
}

/* =========================
   EFEITOS
========================= */

function createExplosion(x, y, color, amount = 12) {

    for (let i = 0; i < amount; i++) {
        particles.push(
            new Particle(x, y, color)
        );
    }
}

/* =========================
   TIRO
========================= */

function shoot() {

    if (shootCooldown > 0) return;

    const angle = Math.atan2(
        mouse.y - player.y,
        mouse.x - player.x
    );

    bullets.push(
        new Bullet(
            player.x + Math.cos(angle) * 20,
            player.y + Math.sin(angle) * 20,
            angle
        )
    );

    shootCooldown = 8;
}

/* =========================
   INIMIGOS
========================= */

function spawnEnemy() {

    let type = "normal";

    const chance = Math.random();

    if (level >= 3 && chance < .18) {
        type = "fast";
    }

    if (level >= 5 && chance < .12) {
        type = "tank";
    }

    enemies.push(new Enemy(type));
}

/* =========================
   BOSS
========================= */

function spawnBoss() {

    bossWarning.classList.remove("show");

    void bossWarning.offsetWidth;

    bossWarning.classList.add("show");

    setTimeout(() => {

        const boss = new Enemy("tank");

        boss.radius = 55;
        boss.health = 20 + level * 3;
        boss.speed = .45;
        boss.points = 500;
        boss.color = "#ff006e";

        boss.x = W / 2;
        boss.y = -100;

        enemies.push(boss);

    }, 1200);
}

/* =========================
   COLISÃO
========================= */

function collision(a, b) {

    return Math.hypot(
        a.x - b.x,
        a.y - b.y
    ) < a.radius + b.radius;
}

/* =========================
   UPDATE
========================= */

function update() {

    if (!playing) return;

    player.update();

    if (shootCooldown > 0) {
        shootCooldown--;
    }

    spawnTimer--;

    if (spawnTimer <= 0) {

        spawnEnemy();

        spawnTimer = Math.max(
            18,
            65 - level * 4
        );
    }

    enemies.forEach(e => e.update());
    bullets.forEach(b => b.update());
    particles.forEach(p => p.update());
    coins.forEach(c => c.update());
    powerUps.forEach(p => p.update());

    /* TIROS */

    for (let i = enemies.length - 1; i >= 0; i--) {

        const enemy = enemies[i];

        for (let j = bullets.length - 1; j >= 0; j--) {

            const bullet = bullets[j];

            if (collision(enemy, bullet)) {

                enemy.health--;

                bullets.splice(j, 1);

                createExplosion(
                    bullet.x,
                    bullet.y,
                    "#ffe600",
                    3
                );

                if (enemy.health <= 0) {

                    score += enemy.points;
                    kills++;

                    createExplosion(
                        enemy.x,
                        enemy.y,
                        enemy.color,
                        enemy.radius > 40 ? 40 : 15
                    );

                    if (Math.random() < .3) {
                        coins.push(
                            new Coin(enemy.x, enemy.y)
                        );
                    }

                    if (Math.random() < .08) {
                        powerUps.push(
                            new PowerUp(enemy.x, enemy.y)
                        );
                    }

                    enemies.splice(i, 1);

                    if (kills % 15 === 0) {
                        level++;

                        if (level % 5 === 0) {
                            spawnBoss();
                        }
                    }
                }

                break;
            }
        }
    }

    bullets = bullets.filter(
        b =>
            b.x > -50 &&
            b.x < W + 50 &&
            b.y > -50 &&
            b.y < H + 50
    );

    enemies = enemies.filter(
        e => e.x > -5000
    );

    particles = particles.filter(
        p => p.life > 0
    );

    coins = coins.filter(
        c => c.life > 0
    );

    powerUps = powerUps.filter(
        p => p.life > 0
    );

    /* POWER */

    power += .025;

    if (power >= 100) {
        power = 0;

        health = Math.min(
            100,
            health + 10
        );
    }

    updateHUD();

    if (health <= 0) {
        endGame();
    }
}

/* =========================
   HUD
========================= */

function updateHUD() {

    healthText.textContent =
        Math.max(0, Math.floor(health));

    scoreText.textContent = score;
    levelText.textContent = level;

    bestText.textContent =
        Math.max(best, score);

    powerFill.style.width =
        power + "%";
}

/* =========================
   FUNDO
========================= */

function drawBackground() {

    ctx.fillStyle = "#03030b";

    ctx.fillRect(
        0,
        0,
        W,
        H
    );

    /* grade */

    ctx.strokeStyle = "#0b1640";
    ctx.lineWidth = 1;

    const grid = 55;

    for (
        let x = 0;
        x < W;
        x += grid
    ) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }

    for (
        let y = 0;
        y < H;
        y += grid
    ) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
    }

    /* brilho central */

    const gradient = ctx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.max(W, H) * .7
    );

    gradient.addColorStop(
        0,
        "rgba(0,100,255,.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );
}

/* =========================
   DRAW
========================= */

function draw() {

    drawBackground();

    coins.forEach(c => c.draw());
    powerUps.forEach(p => p.draw());

    particles.forEach(p => p.draw());

    bullets.forEach(b => b.draw());
    enemies.forEach(e => e.draw());

    if (player) {
        player.draw();
    }
}

/* =========================
   LOOP
========================= */

function loop() {

    update();
    draw();

    requestAnimationFrame(loop);
}

/* =========================
   INICIAR
========================= */

function startGame() {

    menu.style.display = "none";
    game.style.display = "block";
    gameOver.style.display = "none";

    score = 0;
    level = 1;
    health = 100;
    kills = 0;
    power = 0;

    enemies = [];
    bullets = [];
    particles = [];
    coins = [];
    powerUps = [];

    spawnTimer = 20;
    shootCooldown = 0;

    player = new Player();

    playing = true;

    updateHUD();
}

/* =========================
   GAME OVER
========================= */

function endGame() {

    playing = false;

    if (score > best) {

        best = score;

        localStorage.setItem(
            "neonBest",
            best
        );
    }

    finalScore.textContent = score;
    finalLevel.textContent = level;

    bestText.textContent = best;
    bestMenu.textContent = best;

    gameOver.style.display = "flex";
}

/* =========================
   BOTÕES
========================= */

document
    .getElementById("playBtn")
    .addEventListener("click", startGame);

document
    .getElementById("restartBtn")
    .addEventListener("click", startGame);

document
    .getElementById("menuBtn")
    .addEventListener("click", () => {

        playing = false;

        gameOver.style.display = "none";
        game.style.display = "none";
        menu.style.display = "flex";

        bestMenu.textContent = best;
    });

/* =========================
   COMEÇA O LOOP
========================= */

loop();
