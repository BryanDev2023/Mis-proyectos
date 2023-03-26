const starter = document.getElementById('starter');
const combat = document.getElementById('combat');
const reset = document.getElementById('reset');

const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const choseButton = document.getElementById('chose-button');
const leaveButton = document.getElementById('leave-button');

const spanHealthPlayer = document.getElementById('span-vidas-jugador');
const spanHealthEnemy = document.getElementById('span-vidas-enemigo');
const spanWins = document.getElementById('wins');
const spanLoses = document.getElementById('loses');

const inputsDiv = document.getElementById('buttons-combat');

const resultPlayer = document.getElementById('result-player');
const resultEnemy = document.getElementById('result-enemy');
const resultCombat = document.getElementById('result-combat');
const resultFinal = document.getElementById('result-final');

const attacksOfEnemy = [
    'PIEDRA',
    'PAPEL',
    'TIJERA'
];

const textResultWinner = [
    'Ganaste la partida campeón! :D',
    'Uff, esa partida fue intensa, verdad?. Al final ganaste! >:D',
    'No crei que ganarias, felicidades! :)'
];

const textResultLoser = [
    'Perdiste la partida! D:',
    'Que pena, suerte para la proxima! :D',
    'Nada mal pero perdiste :['
];

let healthPlayer = 3;
let healthEnemy = 3;

let wins = 0;
let loses = 0;

let attackPlayer;
let attackEnemy;

let settingsGame;

let inputStone;
let inputPaper;
let inputScissor;

let stone = new Input('PIEDRA', './Imgs/rock.png', 'stone-radio');
let paper = new Input('PAPEL', './Imgs/paper.png', 'paper-radio');
let scissor = new Input('TIJERA', './Imgs/scissor.png', 'scissor-radio');

function playEvent() {
    spanHealthPlayer.innerHTML = healthPlayer;
    spanHealthEnemy.innerHTML = healthEnemy;

    choseButton.disabled = false;

    starter.style.display = 'none';

    showInputs([stone, paper, scissor]);

    combat.style.display = 'flex';
}

function resetEvent() {
    location.reload();
}

function choseEvent() {
    if (inputStone.checked) {
        attackPlayer = 'PIEDRA';
    } else if (inputPaper.checked) {
        attackPlayer = 'PAPEL';
    } else if (inputScissor.checked) {
        attackPlayer = 'TIJERA';
    } else {
        alert('Elige un ataque!');
        resetEvent();
    }

    attackEnemyEvent();
    resultPlayer.innerHTML = attackPlayer;
}

function leaveGame() {
    combat.style.display = 'none';
    starter.style.display = 'flex';
    inputsDiv.innerHTML = '';
}

function attackEnemyEvent() {
    attackEnemy = attacksOfEnemy[random(0, attacksOfEnemy.length - 1)].toString();
    resultEnemy.innerHTML = attackEnemy;
    combatEvent();
}

function combatEvent() {
    if (attackPlayer == attackEnemy) {
        resultCombat.innerHTML = 'Empataste! :O';
    } else if (
        attackPlayer == 'Piedra' && attackEnemy == 'Tijera' ||
        attackPlayer == 'Papel' && attackEnemy == 'Piedra' ||
        attackPlayer == 'Tijera' && attackEnemy == 'Papel'
    ) {
        resultCombat.innerHTML = 'Ganaste! :D';
        healthEnemy --;
        wins ++;
    } else {
        resultCombat.innerHTML = 'Perdiste! D:';
        healthPlayer --;
        loses ++;
    }

    checkLives();
    spanHealthPlayer.innerHTML = healthPlayer;
    spanHealthEnemy.innerHTML = healthEnemy;
    spanWins.innerHTML = wins;
    spanLoses.innerHTML = loses;
}

function checkLives() {
     if (healthPlayer > 0 && healthEnemy == 0){
          resultFinal.innerHTML = textResultWinner[random(0, textResultWinner.length - 1)].toString();
     } else if (healthPlayer == 0 && healthEnemy > 0) {
          resultFinal.innerHTML = textResultLoser[random(0, textResultLoser.length - 1)].toString();
     }

    if (isGameOver(healthPlayer, healthEnemy)) {
        choseButton.disabled = true;
        resetButton.disabled = false;

        combat.style.display = "none";
        reset.style.display = "flex";
    }
}

window.addEventListener("load", () => {
    playButton.addEventListener('click', playEvent);
    resetButton.addEventListener('click', resetEvent);
    choseButton.addEventListener('click', choseEvent);
    leaveButton.addEventListener('click', leaveGame);

    resetButton.disabled = true;
    choseButton.disabled = true;

    spanWins.innerHTML = wins;
    spanLoses.innerHTML = loses;

    combat.style.display = 'none';
    reset.style.display =  'none';
});
