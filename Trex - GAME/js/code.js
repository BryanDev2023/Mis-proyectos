let time = new Date();
let deltaTime = 0;

function loadWeb(){
     if(document.readyState === "complete" || document.readyState === "interactive"){
          setTimeout(initGame, 1);
     } else {
          document.addEventListener("DOMContentLoaded", initGame); 
     }
}

function initGame() {
    time = new Date();

    startGame();
    loopGame();
}

function loopGame() {
    deltaTime = (new Date() - time) / 1000;
    time = new Date();

    updateGame();
    requestAnimationFrame(loopGame);
}

let sueloY = 22;
let velY = 0;
let impulso = 900;
let gravedad = 2500;

let dinoPosX = 45;
let dinoPosY = sueloY; 

let sueloX = 0;
let velEscenario = 1280/3;
let gameVel = 1;
let score = 0;

let idle = false;
let jumping = false;

let tiempoHastaObstaculo = 2;
let tiempoObstaculoMin = 0.7;
let tiempoObstaculoMax = 1.8;
let obstaculoPosY = 16;
let obstaculos = [];

let tiempoHastaNube = 0.5;
let tiempoNubeMin = 0.7;
let tiempoNubeMax = 2.7;
let maxNubeY = 270;
let minNubeY = 100;
let nubes = [];
let velNube = 0.5;

let contenedor;
let dino;
let textoScore;
let suelo;
let gameOver;

function startGame() {
    gameOver = document.querySelector(".game-over");
    suelo = document.querySelector(".suelo");
    contenedor = document.querySelector(".contenedor");
    textoScore = document.querySelector(".score");
    dino = document.querySelector(".dino");
    document.addEventListener("keydown", handleKeyDown);
}

function updateGame() {
     if (idle) return;

     moveDino();
     moveGround();
     decidedToCreateObstacles();
     decidedToCreateClouds();
     moveObstacles();
     moveClouds();
     detectedCollision();

     velY -= gravedad * deltaTime;
}

function handleKeyDown(input){
     if (input.keyCode == 32 || input.keyCode == 38 && !idle) {
          jumpDino();
     } else if (input.keyCode == 82 && idle) {
          location.reload();
     }
}

function jumpDino(){
     if (dinoPosY === sueloY){
          jumping = true;
          velY = impulso;
          dino.classList.remove("dino-corriendo");
     }
}

function moveDino() {
     dinoPosY += velY * deltaTime;

     if (dinoPosY < sueloY){
          touchingGround();
     }
     dino.style.bottom = dinoPosY+"px";
}

function touchingGround() {
     dinoPosY = sueloY;
     velY = 0;

     if (jumping){
          dino.classList.add("dino-corriendo");
     }

     jumping = false;
}

function moveGround() {
     sueloX += CalculateDesp();
     suelo.style.left = -(sueloX % contenedor.clientWidth) + "px";
}

function CalculateDesp() {
     return velEscenario * deltaTime * gameVel;
}

function crash() {
    dino.classList.remove("dino-corriendo");
    dino.classList.add("dino-estrellado");
    idle = true;
}

function decidedToCreateObstacles() {
     tiempoHastaObstaculo -= deltaTime;
     if (tiempoHastaObstaculo <= 0) {
          createObstacle();
     }
}

function decidedToCreateClouds() {
     tiempoHastaNube -= deltaTime;
     if (tiempoHastaNube <= 0) {
          createCloud();
     }
}

function createObstacle() {
     let obstaculo = document.createElement("div");
     contenedor.appendChild(obstaculo);
     obstaculo.classList.add("cactus");

     if (Math.random() > 0.5) obstaculo.classList.add("cactus2");

     obstaculo.posX = contenedor.clientWidth;
     obstaculo.style.left = contenedor.clientWidth+"px";

     obstaculos.push(obstaculo);
     tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax-tiempoObstaculoMin) / gameVel;
}

function createCloud() {
     let nube = document.createElement("div");
     contenedor.appendChild(nube);
     nube.classList.add("nube");
     nube.posX = contenedor.clientWidth;
     nube.style.left = contenedor.clientWidth+"px";
     nube.style.bottom = minNubeY + Math.random() * (maxNubeY-minNubeY)+"px";

     nubes.push(nube);
     tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax-tiempoNubeMin) / gameVel;
}

function moveObstacles() {
     for (let i = obstaculos.length - 1; i >= 0; i--) {
          if (obstaculos[i].posX < -obstaculos[i].clientWidth) {
              obstaculos[i].parentNode.removeChild(obstaculos[i]);
              obstaculos.splice(i, 1);
              winsScore();
          } else {
              obstaculos[i].posX -= CalculateDesp();
              obstaculos[i].style.left = obstaculos[i].posX+"px";
          }
     }
}

function moveClouds() {
     for (let i = nubes.length - 1; i >= 0; i--){
          if (nubes[i].posX < -nubes[i].clientWidth) {
               nubes[i].parentNode.removeChild(nubes[i]);
               nubes.splice(i, 1);
          } else {
               nubes[i].posX -= CalculateDesp() * velNube;
               nubes[i].style.left = nubes[i].posX+"px";
          }
     }
}

function winsScore() {
     score++;
     textoScore.innerText = score;

     if (score == 5){
          gameVel = 1.5;
          contenedor.classList.add("mediodia");
     } else if (score == 10) {
          gameVel = 1.7;
          contenedor.classList.add("tarde");
     } else if (score == 20) {
          gameVel = 1.85;
          contenedor.classList.add("noche");
     }

     suelo.style.animationDuration = (3/gameVel)+"s";
}

function GameOver() {
     crash();
     gameOver.style.display = "block";
}

function detectedCollision() {
     for (let i = 0; i < obstaculos.length; i++) {
          if (obstaculos[i].posX > dinoPosX + dino.clientWidth) {
               break; 
          } else {
               if (isCollision(dino, obstaculos[i], 10, 30, 15, 20)) {
                    GameOver();
               }
          }
     }
}

function isCollision(player, object, paddingTop, paddingRight, paddingBottom, paddingLeft) {
    let playerRect = player.getBoundingClientRect();
    let objectRect = object.getBoundingClientRect();

    return !(
        ((playerRect.top + playerRect.height - paddingBottom) < (objectRect.top)) ||
        (playerRect.top + paddingTop > (objectRect.top + objectRect.height)) ||
        ((playerRect.left + playerRect.width - paddingRight) < objectRect.left) ||
        (playerRect.left + paddingLeft > (objectRect.left + objectRect.width))
    );
}

window.addEventListener("load", loadWeb);
