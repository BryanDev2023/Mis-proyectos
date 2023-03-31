const starter = document.getElementById('starter');
const map = document.getElementById('mapa');
const botonesMovimiento = document.getElementById('botones-movimiento');
const howToPlay = document.getElementById('how-to-play');
const tutorial = document.getElementById('tutorial-div');

const inputName = document.getElementById('name-input');

const spanNombreJugador = document.getElementById('nombre-jugador');

const mapa = document.getElementById('open-world');

let lienzo = mapa.getContext('2d');
let backgroundImage;
let iv;

let player;
let playerName;

let left = new Button('⬅️', 'boton-izquierda');
let right = new Button('➡️', 'boton-derecha');
let down = new Button('⬇️', 'boton-abajo');
let up = new Button('⬆️', 'boton-arriba');

let tutorialOfMovement = new Tutorial('¿Cómo moverse?', 'tuto', './Imgs/TutorialCelular.png');

let leftButton, rightButton, downButton, upButton;

function play() {
    if (inputName.value) {
        playerName = inputName.value
        player = new Player(playerName, 'Imgs/Player 2.png');

        spanNombreJugador.innerHTML = playerName;

        starter.style.display = 'none';
        map.style.display = 'flex';

        viewMapCompleted();
    } else {
        Swal.fire({
            title: '¡Ups!',
            text: 'Pon tu nombre, por favor',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#7AA874',
            color: '#F5FFC9',
            background: '#539165',
            icon: 'warning',
            padding: '2%',
        });
    }
}

function showTutorial() {
    starter.style.display = 'none';
    showTutorialMovement([tutorialOfMovement]);
    howToPlay.style.display = 'flex';
}
function reset() {
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
    player.setEventButtonsForMovement(leftButton, rightButton, downButton, upButton);
}

function showButtons(array) {
    let optionsGame;
    array.forEach((child) => {
        optionsGame = `<button class="botones-movimiento-dentro" id="${child.id}">${child.text}</button>`;
        botonesMovimiento.innerHTML += optionsGame;

        leftButton = document.getElementById('boton-izquierda');
        rightButton = document.getElementById('boton-derecha');
        downButton = document.getElementById('boton-abajo');
        upButton = document.getElementById('boton-arriba');
    });
}

function showTutorialMovement(array) {
    let optionsGame;
    array.forEach((child) => {
        optionsGame = `
        <div class="${child.divClass}">
            <h3>${child.tutorialText}</h2>
            <p2>Para computadoras:</p2>
            <ol>
                <li>⬅️ - Moverse a la izquierda</li>
                <li>⬆️ - Moverse hacía arriba</li>
                <li>⬇️ - Moverse hacía abajo</li>
                <li>➡️ - Moverse a la derecha</li>
            </ol>

            <p>Para celulares:</p>
            <ol>
                <li>Si tienes celular puedes usar estos botones pare poder moverte por el mapa</li>
            </ol>
            <img src="${child.image}" alt="tutorial-celular">
        </div>
        `;
        tutorial.innerHTML += optionsGame;
    });
}

function keyboard(ev) {
    if (ev.key == 'Enter' && starter.style.display != 'none') {
        play();
    }

    if (ev.key == 'r' && mapa.style.display != 'none' && starter.style.display == 'none') {
        reset();
    }

    if (ev.key == 'c' && starter.style.display != 'none') {
        showTutorial();
    }
}

// Cuando carge el juego o la pagina
window.addEventListener('load', () => {
    starter.style.display = 'flex';
    map.style.display = 'none';
    howToPlay.style.display = 'none';

    window.addEventListener('keypress', keyboard);

    backgroundImage = new Image();
    backgroundImage.src = 'Imgs/Mapa.jpeg';
});