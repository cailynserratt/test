
// Board Code
let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

// Junimo Code
let junimoWidth = 88;
let junimoHeight = 94;
let junimoX = 50;
let junimoY = boardHeight - junimoHeight;
let junimoImage;

let junimo = {
    x : junimoX,
    y : junimoY,
    width : junimoWidth,
    height : junimoHeight
}

 // Flower Code
 let flowerArray = [];

 let flower1Width = 34;
 let flower2Width = 69;
 let flower3Width = 102;

 let flowerHeight = 70;
 let flowerX = 700;
 let flowerY = boardHeight - flowerHeight;

 let flower1Image;
 let flower2Image;
 let flower3Image;

 // Movement and Game Code
 let velocityX = -8;
 let velocityY = 0;
 let gravity = .4;

 let gameOver = false;
 let score = 0;

 window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    const imagePaths = {
        junimo: "./images/junimo.png",
        flower1: "./images/flower1.png",
        flower2: "./images/flower2.png",
        flower3: "./images/flower3.png"
    };

    preloadImages(imagePaths, (images) => {
        junimoImage = images.junimo;
        flower1Image = images.flower1;
        flower2Image = images.flower2;
        flower3Image = images.flower3;

        // Start the game
        requestAnimationFrame(update);
        setInterval(placeFlower, 1000);
        document.addEventListener("keydown", moveJunimo);
    });
};

    junimoImage = new Image();
    junimoImage.src = "./images/junimo.png";
    junimoImage.onload = function() {
        context.drawImage(junimoImage, junimo.x, junimo.y, junimo.width, junimo.height);
    }


    flower1Image = new Image();
    flower1Image.src = "./images/flower1.png";

    flower2Image = new Image();
    flower2Image.src = "./images/flower2.png";

    flower3Image = new Image();
    flower3Image.src = "./images/flower3.png";

     requestAnimationFrame(update);
     setInterval(placeFlower, 1000);
     document.addEventListener("keydown", moveJunimo);

 function update() {
     requestAnimationFrame(update);
     if (gameOver) {
         return;
     }
     context.clearRect(0, 0, board.width, board.height);

     // Junimo Stuff
     velocityY += gravity;
     junimo.y = Math.min(junimo.y + velocityY, junimoY);
     context.drawImage(junimoImage, junimo.x, junimo.y, junimo.width, junimo.height);

     // Flower Stuff
     for (let i = 0; i < flowerArray.length; i++) {
         let flower = flowerArray[i];
         flower.x += velocityX;
         context.drawImage(flower.image, flower.x, flower.y, flower.width, flower.height);

         if(detectCollision(junimo, flower)) {
             gameOver = true;
             junimoImage.src = "./images/junimodead.png";
             junimoImage.onload = function() {
                 context.drawImage(junimoImage, junimo.x, junimo.y, junimo.width, junimo.height);
             }
         }
     }

     //Score Code
     context.fillstyle="black";
     context.font="20px courier";
     score++;
     context.fillText(score, 5, 20);
 }

 function moveJunimo(e) {
     if(gameOver) {
         return;
     }

     if((e.code == "Space" || e.code == "ArrowUp") && junimo.y == junimoY) {
         velocityY = -10;
     }

     else if (e.code == "ArrowDown" && junimo.y == junimoY) {

     }
 }

 function placeFlower() {
     if (gameOver) {
         return;
     }

     let flower = {
         image : null,
         x : flowerX,
         y : flowerY,
         width : null,
         height: flowerHeight
     }

     let placeFlowerChance = Math.random();

     if (placeFlowerChance > .90) {
        flower.image = flower3Image;
        flower.width = flower3Width;
        flowerArray.push(flower);
     }

     else if (placeFlowerChance > .70) {
        flower.image = flower2Image;
        flower.width = flower2Width;
        flowerArray.push(flower);
     }

     else if (placeFlowerChance > .50) {
        flower.image = flower1Image;
        flower.width = flower1Width;
        flowerArray.push(flower);
     }

     if (flowerArray.length > 5) {
        flowerArray.shift();
     }
 }

 function detectCollision(a, b) {
     return a.x < b.x + b.width &&
             a.x + a.width > b.x &&
             a.y < b.y + b.height &&
             a.y + a.height > b.y;
 }