let canvas = document.querySelector("#zone");
let ctx = canvas.getContext("2d");
//Vitesse toutes les 160 millisecondes-
let game = setInterval(draw, 160);
let snake = [];
//Création du score
let score = 0;
let d;

// Créer l'unité
const box = 32;

//Load images
 const ground = new Image();
 ground.src = "img/ground.png";

 const foodImg = new Image();
 foodImg.src = "img/food.png";

 //Création du serpent
 snake[0] = {
     x : 9 * box,
     y : 10 * box
 }

 //Création de la pomme
 let apple = {
     x : Math.floor(Math.random()*17+1) * box,
     y : Math.floor(Math.random()*15+3) * box
}

//Controle du serpent
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.key;
    if (key == "ArrowLeft" && d != "RIGHT") {
        d = "LEFT";
    }else if(key == "ArrowUp" && d != "DOWN") {
        d = "UP";
    }else if(key == "ArrowRight" && d != "LEFT") {
        d = "RIGHT";
    }else if(key == "ArrowDown" && d != "UP") {
        d = "DOWN";
    }
}

//Gérer les collisions
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

//Création du serpent sur la toile
function draw() {
    ctx.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, apple.x, apple.y);


    //Ancienne position de la tête
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Quelle direction
    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

    //Le serpent mange la pomme
    if(snakeX == apple.x && snakeY == apple.y) {
        score++;
        apple = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box    
        }
        //Ne supprime pas la queue
    } else {
        //Supprimer la queue
        snake.pop();
    }

    //Laisse seulement le message et le score afficher
    function clearScreen() {
        setTimeout(() => {
            ctx.fillStyle = "#5A39ED";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //Score
            ctx.fillStyle = "#88F0EF";
            ctx.font = "45px monospace";
            ctx.fillText(score, 9*box, 6*box);
            //Message
            ctx.fillStyle = "#88F0EF";
            ctx.font = "30px monospace";
            ctx.fillText(gameOver="Game over ☹", 7*box, 8*box);
            ctx.fillText(gameOver="Pour rejouez, Appuyez sur F5", 2.5*box, 10*box);
        }, 250);
      }

      //Ajouter une tête
      let newHead = {
          x : snakeX,
          y : snakeY
      }

    //Game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)) {
            clearInterval(game);    
            clearScreen();
        }
  
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px monospace";
    ctx.fillText(score, 2*box, 1.6*box);
}
