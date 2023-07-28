const canvas = document.querySelector("canvas");
// contexto de renderização 2d
const ctx = canvas.getContext("2d");

//audio do jogo
const audio = new Audio("../audio/audio.mp3");

// tamanho da cobrinha
const size = 30;

// criando a cobrinha
const snake = [
    {x: 0, y: 0}
];

// direção da cobrinha
let direction;

//looping
let loopId;


// função que gera uma localização (número) aleatória para a fruta
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
}

// gerar uma cor aleatoria para a fruta
const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);

    return `rgb(${red}, ${green}, ${blue})`;
}

// criação da fruta
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

// função responsável por desenhar a fruta na tela
const drawFood = () => {
    const {x, y, color} = food;

    ctx.shadowColor = color;
    ctx.shadowBlur = 6;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
}

// função responsável por desenhar a cobrinha na tela
const drawSnake = () => {
    ctx.fillStyle = "#ddd";
    snake.forEach((position, index) => {
        //cabeça da cobrinha
        if(index == snake.length -1) {
            ctx.fillStyle = "white";
        }
    ctx.fillRect(position.x, position.y, size, size);

    });
}


// função responsável por mover a cobrinha
const moveSnake = () => {
    //verifica se tem direção (!não)
    if(!direction) return;

    const head = snake[snake.length - 1];

   // verifica se a direção e igual a direita
    if(direction == "right") {
        snake.push({x: head.x + size, y: head.y});
    }
    // verifica se a direção e igual a esquerda
    if(direction == "left") {
        snake.push({x: head.x - size, y: head.y});
    }
    // verifica se a direção e igual a baixo
    if(direction == "down") {
        snake.push({x: head.x, y: head.y + size});
    }
    // verifica se a direção e igual a cima
    if(direction == "up") {
        snake.push({x: head.x, y: head.y - size});
    }
    
    snake.shift();
}


// função que desenha o grid (grade interna da cobrinha)
const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";


    for(let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, 600);    
        ctx.stroke();
        
        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(600, i);    
        ctx.stroke();
    }

}


// função que verifica se a cobrinha comeu a fruta 
const checkEat = () => {
    const head = snake[snake.length - 1];

    if(head.x == food.x && head.y == food.y) {
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        while(snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.color = randomColor();
    } 

    

    
}


// função que verifica as colisões da cobrinha
const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    // colisão com a borda da tela
    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    // colisão com a cobrinha
    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    });

    if(wallCollision || selfCollision) {
        gameOver();  
    }        
}


// função game over
const gameOver = () => {
    direction = undefined;
}


// ======= função principal loop =======
const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop();
    }, 300);
}

gameLoop();


// captura as teclas do teclado, quando pressionada
document.addEventListener("keydown", ({ key }) => {
    // verifica se a tecla pressionada é igual a direita
    if(key == "ArrowRight" && direction != "left") {
        direction = "right";
    }
    // verifica se a tecla pressionada é igual a esquerda
    if(key == "ArrowLeft" && direction != "right") {
        direction = "left";
    }
    // verifica se a tecla pressionada é igual a cima
    if(key == "ArrowUp" && direction != "down") {
        direction = "up";
    }
    // verifica se a tecla pressionada é igual a baixo
    if(key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
});


























