const frontPage =document.getElementById("front-page");
const gamePage=document.getElementById("game-page");
const startButton =document.getElementById("start-btn");
const gameOverPage = document.getElementById("last-page");
let score = 0;

startButton.addEventListener("click", startGame)


const snake =[
    {x:5, y:5},
    {x:4, y:5},
    {x:3, y:5}
]

const gameBoard =document.getElementById("game-board");
const rows = 20;
const columns =20;

for (let row=0; row<rows; row++){
    for(let column =0; column<columns; column++){
        const cell =document.createElement("div");
        gameBoard.appendChild(cell);
    }
}


const cells = gameBoard.children;


function drawSnake(){
snake.forEach(part => {
    //use part.x and part.y
const cell_index = part.y * columns + part.x;
cells[cell_index].classList.add("snake")
});
}

function clearSnake(){
    for (const element of cells) {
        element.classList.remove("snake");
    }
}

const food= {
    x:10,
    y:8
};

food.x=Math.floor(Math.random() * columns)
food.y=Math.floor(Math.random() * rows)

const foodIndex = food.y *columns + food.x
// const startButton =document.getElementById("start-btn")



function gameOver(){
    clearInterval(gameLoop);

    gameOverPage.style.display ="block";
}

function startGame(){
    frontPage.style.display= "none";
    gamePage.style.display = "block";

    gameLoop = setInterval(()=>{
        clearSnake();
        moveSnake();

        if (checkWallCollision()){
            gameOver();
            return;
        }

        if(checkSelfCollision()){
            gameOver();
            return;
        }
        if(checkFoodCollision()){
            console.log("food eaten")
            clearFood();
            growSnake();
            score++;
            scoreDisplay.textContent ="Score :" +score;
            placeFood();
        }
        drawSnake();
        drawFood();
    },200)
}


function moveSnake() {
    for(let i=snake.length - 1; i>0; i--){
        snake[i].x =snake[i-1].x;
        snake[i].y =snake[i-1].y;
    }
    if(direction === "right"){
        snake[0].x++;
    }
    if(direction === "left"){
        snake[0].x--;
    }
    if(direction === "up"){
        snake[0].y--;
    }
    if(direction === "down"){
        snake[0].y++;
    }
}




let direction ="right";
document.addEventListener("keydown",changeDirection)

function changeDirection(event){
    if(event.key==="ArrowUp"){
        direction ="up";
    }
     if(event.key==="ArrowDown"){
        direction ="down";
    }
     if(event.key==="ArrowLeft"){
        direction ="left";
    }
     if(event.key==="ArrowRight"){
        direction ="right";
    }
    
}
function checkWallCollision(){
    const head = snake[0];
    if(
        head.x<0||
        head.x>=columns||
        head.y>= rows
    ){
        return true;
    }
    return false;
}


let gameLoop;

function checkFoodCollision(){
    const head = snake[0];

    if (head.x=== food.x && head.y === food.y){
        return true;
    }
    return false;
}


function growSnake(){
    const tail = snake[snake.length - 1];
    snake.push({
        x: tail.x,
        y: tail.y
    })
}

function placeFood(){
    food.x = Math.floor(Math.random()*columns);
    food.y=Math.floor(Math.random()*rows)
}

function drawFood(){
    const foodIndex = food.y * columns + food.x;
    cells[foodIndex].classList.add("food");
}

function clearFood(){
    const foodIndex =food.y *columns + food.x;
    cells[foodIndex].classList.remove("food");
}

const scoreDisplay =document.getElementById("score");


function checkSelfCollision(){
    const head = snake[0];

    for (let i=1; i<snake.length; i++){
        if(head.x === snake[i].x && head.y){
            return true;
        }
    }
    return false;
}