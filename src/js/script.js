const canvas = document.querySelector("canvas");
// contexto de renderização 2d
const ctx = canvas.getContext("2d");


//tamanho da cobrinha
const size = 30;

//criando a cobrinha
const snake = [
    {x: 200, y: 200},
    {x: 230, y: 200}
];

//direção da cobrinha
let direction = "right";


//função responsável por desenhar a cobrinha na tela
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


//função responsável por mover a cobrinha
const moveSnake = () => {
    const head = snake[snake.length - 1];

    snake.shift();

    if(direction == "right") {
        snake.push({x: head.x + size, y: head.y});
    }
    
}



setInterval(() => {
    ctx.clearRect(0, 0, 600, 600);

    moveSnake();
    drawSnake();
},300);





























