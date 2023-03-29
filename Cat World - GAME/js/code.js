const starter = document.getElementById('starter');
const map = document.getElementById('mapa');
const playButton = document.getElementById('play-button');
const leaveMapButton = document.getElementById('leave-map');
const inputName = document.getElementById('name-input');
const spanNombreJugador = document.getElementById('nombre-jugador');
const mapa = document.getElementById('open-world');
const botonesMovimiento = document.getElementById('botones-movimiento');

let lienzo = mapa.getContext('2d');
let backgroundImage;
let iv;
let t;

let player;
let playerName;

let left = new Button('Izquierda', 'boton-izquierda');
let right = new Button('Derecha', 'boton-derecha');
let down = new Button('Abajo', 'boton-abajo');
let up = new Button('Arriba', 'boton-arriba');

let leftButton 
let rightButton;
let downButton;
let upButton;

function playEvent() {
    if (inputName.value) {
        playerName = inputName.value
        player = new Player(playerName, 'Imgs/Player 2.png');

        spanNombreJugador.innerHTML = playerName;

        starter.style.display = 'none';
        map.style.display = 'flex';

        viewMapCompleted();
    } else {
        alert('Pon tu nombre por favor!')
    }
}

function leaveMapEvent() {
    location.reload();
}

function drawMap() {
    player.x += player.velocityX;
    player.y += player.velocityY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(backgroundImage, 0, 0, mapa.width, mapa.height);

    player.drawSprite();
}

function viewMapCompleted() {
    iv = setInterval(drawMap, 25);
    player.setKeysForMovement();
    showButtons([left, down, up, right]);
    player.setEventButtonsForMovement();
}

// Cuando carge el juego o la pagina
window.addEventListener('load', () => {
    starter.style.display = 'flex';
    map.style.display = 'none';

    playButton.addEventListener('click', playEvent);
    leaveMapButton.addEventListener('click', leaveMapEvent)

    backgroundImage = new Image();
    backgroundImage.src = 'Imgs/Mapa.jpeg';
});
