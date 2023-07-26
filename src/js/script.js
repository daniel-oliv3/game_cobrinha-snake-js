const canvas = document.querySelector("canvas");
// contexto de renderização 2d
const ctx = canvas.getContext("2d");


//tamanho do snake
const size = 30;

//criando a cobrinha
const snake = [{x: 200, y: 200}];


//função responsável por desenhar a cobrinha na tela
const drawSnake = () => {
    ctx.fillStyle = "#ddd";
    ctx.fillRect(snake[0].x, snake[0].y, size, size);
}


drawSnake();



























