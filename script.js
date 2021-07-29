let cavas = document.getElementById('snake');
let context = cavas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
   x: 8 * box,
   y: 8 * box
}
let direction = "right";

function criarBG(){
   context.fillStyle = "lightgreen";
   context.fillRect(0, 0, 16 * box, 16 * box)
}

//criar cobrinha é um Array de coordenadas
function criarCorbinha(){
   for(let i=0; i < snake.length ; i++){
      context.fillStyle ="green";
      context.fillRect(snake[i].x, snake[i].y, box, box)
   }
}
//criar evento 
document.addEventListener('keydown', update);
function update (event) {
   if(event.keyCode == 37 && direction != 'right') direction = 'left'; //direita direita
   if(event.keyCode == 38 && direction != 'down') direction = 'up'; //direçao abaixo
   if(event.keyCode == 39 && direction != 'left') direction = 'right'; //direção esquerda
   if(event.keyCode == 40 && direction != 'up') direction = 'down'; //direção para cima
}

let food = { // array da comida criada aleatoriamente
   x: Math.floor(Math.random() * 15 + 1) * box,
   y: Math.floor(Math.random() * 15 + 1) * box
}; 

//criando a comida da cobrinha
function drawFood(){
   context.fillStyle ="red";
   context.fillRect(food.x, food.y, box, box)
}

function iniciarJogo(){
   //facendo voltar a cobrinha do outro lado
   if(snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
   if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
   if(snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
   if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

   //finalizando jogo
   for (i=1; i<snake.length; i++ ){
      if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
         clearInterval(jogo);
         alert('Game Over :( ')
      }
   }

   criarBG();
   criarCorbinha();
   drawFood();
   //ponto de partida setando

   let snakeX =  snake[0].x;
   let snakeY = snake[0].y;

   //criando coordenadas
   if(direction == "right") snakeX +=box;
   if(direction == "left") snakeX -=box;
   if(direction == "up") snakeY -=box;
   if(direction == "down") snakeY +=box;

   //aumentando a cobrinha
   if(snakeX != food.x || snakeY != food.y){
      //retira o ultimo elemento do array
      snake.pop();
   }else{
      //cria acomidinha aleatoriamente 
      food.x = Math.floor(Math.random() * 15 + 1) * box;
      food.y = Math.floor(Math.random() * 15 + 1) * box;
   }  

   //cabeça nova da cobrinha
   let newHead = {
      x: snakeX,
      y:snakeY
   }

   snake.unshift(newHead);
}

//passa a funçao iniciarJogo , para inicializar a cada 100 milisegundos
let jogo = setInterval(iniciarJogo, 100);
