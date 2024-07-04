// Definição do jogo do dinossauro
const canvas = document.getElementById('dinosaurCanvas');
const ctx = canvas.getContext('2d');

// Variáveis do jogo
let dinoX = 50;
let dinoY = 150;
let dinoDY = 0;
let gravity = 0.6;
let jumping = false;
let gameover = false;
let score = 0;
let timer = 0;
let obstacleSpeed = -2;
let obstacleInterval = 120; // Intervalo inicial entre obstáculos (em frames)
let obstacleTimer = 0;

// Arrays para os obstáculos
let obstacles = [];

// Personagem humano
const human = {
    x: canvas.width - 100,
    y: 135,
    width: 30,
    height: 50,
    dx: obstacleSpeed
};

// Botão de reinício
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', restartGame);

function jump() {
    if (!jumping) {
        dinoDY = -10;
        jumping = true;
    }
}

function drawDinosaur() {
    if (gameover) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Alterar o background do canvas após 10 pontos
    if (score > 10) {
        ctx.fillStyle = '#000'; // Background preto
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff'; // Texto em branco
    } else {
        ctx.fillStyle = '#fff'; // Background branco padrão
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000'; // Texto em preto
    }

    // Desenhar dinossauro
    ctx.fillStyle = '#333';
    ctx.fillRect(dinoX, dinoY, 30, 30);


    // Gerar novos obstáculos
    obstacleTimer++;
    if (obstacleTimer >= obstacleInterval) {
        obstacles.push({
            x: canvas.width,
            y: 160,
            width: 15, // Modifique o tamanho do obstáculo aqui (ex: 15)
            height: 15, // Modifique o tamanho do obstáculo aqui (ex: 15)
            dx: obstacleSpeed
        });
        obstacleTimer = 0;

        // Aumentar a velocidade dos obstáculos após 30 segundos (1800 frames)
        if (timer >= 1800) {
            obstacleInterval = 80; // Intervalo reduzido para aumentar a velocidade
        }
    }

    // Desenhar e atualizar posição dos obstáculos
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle, index) => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x += obstacle.dx;

        // Verificar colisão com dinossauro
        if (isCollision(dinoX, dinoY, 30, 30, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
            // Aumentar desaceleração ao colidir
            dinoDY = 15;
            gameOver();
        }

        // Remover obstáculos que saíram da tela
        if (obstacle.x + obstacle.width < 0) {
            obstacles.splice(index, 1);
            score++;
            updateScore();
        }
    });

    // Atualizar posição do dinossauro
    dinoY += dinoDY;
    dinoDY += gravity;

    // Limitar dinossauro ao solo
    if (dinoY > 150) {
        dinoY = 150;
        dinoDY = 0;
        jumping = false;
    }

    // Atualizar posição do personagem humano
    human.x += human.dx;

    // Atualizar timer
    timer++;
    updateTimer();

    requestAnimationFrame(drawDinosaur);
}

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 < x2 + w2 &&
        x1 + w1 > x2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2) {
        // Aumentar desaceleração ao colidir
        dinoDY = 15;
        return true;
    }
    return false;
}

function gameOver() {
    gameover = true;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    restartBtn.style.display = 'block';

    // Evento para reiniciar ao pressionar espaço
    document.addEventListener('keydown', spaceRestart);
}

function spaceRestart(event) {
    if (event.code === 'Space') {
        restartGame();
        document.removeEventListener('keydown', spaceRestart);
    }
}

function restartGame() {
    gameover = false;
    score = 0;
    timer = 0;
    obstacleInterval = 120; // Resetar intervalo inicial de obstáculos
    obstacleTimer = 0;
    obstacles = [];
    dinoX = 50;
    dinoY = 150;
    dinoDY = 0;
    human.x = canvas.width - 100;
    restartBtn.style.display = 'none';
    drawDinosaur();
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function updateTimer() {
    document.getElementById('timer').textContent = Math.floor(timer / 60); // Exibir tempo em segundos
}

document.addEventListener('keydown', function(event) {
    if (!gameover && event.code === 'Space') {
        jump();
    }
});

// Iniciar o jogo
drawDinosaur();
