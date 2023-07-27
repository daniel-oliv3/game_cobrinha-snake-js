const canvas = document.querySelector("canvas");
// contexto de renderização 2d
const ctx = canvas.getContext("2d");


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
    // ctx.strokeStyle = "#191919";
    ctx.strokeStyle = "#666";

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


// função principal loop
const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, 600, 600);
    drawGrid();
    moveSnake();
    drawSnake();

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


























