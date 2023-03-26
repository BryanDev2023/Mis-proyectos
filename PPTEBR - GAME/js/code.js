// Ataques
let attackPlayer;
let attackEnemy;

// Contadores de ganadas y perdidas
let wins = 0;
let loses = 0;

// Vidas de ambos
let healthPlayer = 3;
let healthEnemy = 3;

// Menus - Contenedores
const starter = document.getElementById('starter');
const combat = document.getElementById('combat');
const reset = document.getElementById('reset');

// Botones
const playButton = document.getElementById('play-button');
const resetButton = document.getElementById('reset-button');
const randomAttackButton = document.getElementById('random-attack-button');
const curerLivesButton = document.getElementById('curer-lives-button');

// Ganadas, perdisdas, vidas de ambos - Spans
const spanHealthPlayer = document.getElementById('span-vidas-jugador');
const spanHealthEnemy = document.getElementById('span-vidas-enemigo');
const spanWinsFinal = document.getElementById('result-final-wins');
const spanLosesFinal = document.getElementById('result-final-loses');
const spanWins = document.getElementById('wins');
const spanLoses = document.getElementById('loses');

// Resultados - Parrafos
const resultPlayer = document.getElementById('result-player');
const resultEnemy = document.getElementById('result-enemy');
const resultCombat = document.getElementById('result-combat');
const resultFinal = document.getElementById('result-final');

// Tablas con textos
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

const textResultTied = [
    'Empataron! :O',
    'Que salvada, empataron los dos! XD',
    'Empate epico! >:D'
];

const randomAttack = [
    'Piedra',
    'Papel',
    'Tijera'
];

// Función para empezar juego - Botón iniciar juego
function playEvent() {
    spanHealthPlayer.innerHTML = healthPlayer;
    spanHealthEnemy.innerHTML = healthEnemy;

    randomAttackButton.disabled = false;
    curerLivesButton.disabled = false;

    starter.style.display = 'none';
    combat.style.display = 'flex';
}

// Resetear juego - Botón reiniciar
function resetEvent(){
    location.reload();
}

// Escoger ataque aleatorio - Botón ataque aleatorio
function choseRandomEvent() {
    let posibilidadDeCurarse = random(healthPlayer, healthEnemy); // Posibilad de curarse

    attackPlayer = randomAttack[random(0, randomAttack.length - 1)].toString(); // Elegir ataque de la tabla "randomAttack"
    attackEnemyEvent();
    resultPlayer.innerHTML = attackPlayer;

    // Momento en la que se pueda curarse
    if (healthPlayer < 2 &&  posibilidadDeCurarse == 1) {
        curerLivesButton.style.display = 'flex';
    }
}

// Función para curarse - Botón curar vidas jugador
function curerEvent() {
    healthPlayer += random(1, healthEnemy);
    spanHealthPlayer.innerHTML = healthPlayer;
    curerLivesButton.style.display = 'none';
}

// Fución para escoger un ataque aleatorio enemigo - Ataque enemigo aleatorio
function attackEnemyEvent(){
    attackEnemy = randomAttack[random(0, randomAttack.length - 1)].toString(); // Elegir ataque de la tabla "randomAttack"
    resultEnemy.innerHTML = attackEnemy;
    combatEvent();
}

// Función de combate
function combatEvent() {
    if (attackPlayer == attackEnemy) { // Empate
        resultCombat.innerHTML = 'Empataste! :O';
    } else if ( // Victoria
        attackPlayer == 'Piedra' && attackEnemy == 'Tijera' ||
        attackPlayer == 'Papel' && attackEnemy == 'Piedra' ||
        attackPlayer == 'Tijera' && attackEnemy == 'Papel'
    ) {
        resultCombat.innerHTML = 'Ganaste! :D';
        healthEnemy --;
        wins ++;
    } else { // Perdida
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

// Función checar vidas
function checkLives() {
    if (healthPlayer > 0 && healthEnemy == 0){ // Ganador
        resultFinal.innerHTML = textResultWinner[random(0, textResultWinner.length - 1)].toString();
    } else if (healthPlayer == 0 && healthEnemy > 0) { // Perdedor
        resultFinal.innerHTML = textResultLoser[random(0, textResultLoser.length - 1)].toString();
    } else if (healthPlayer == 0 && healthEnemy == 0) { // Empatado
        resultFinal.innerHTML = textResultTied[random(0, textResultTied.length - 1)].toString();
    }

    if (isGameFinished(healthPlayer, healthEnemy)) { // Si el juego finalizo
        randomAttackButton.disabled = true;
        resetButton.disabled = false;

        spanWinsFinal.innerHTML = win;
        spanLosesFinal.innerHTML = loses;

        combat.style.display = 'none';
        reset.style.display = 'flex';
    }
}

// Función que devuelve un número entero aleatorio
function random(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1) + min);
}

// Función que verifica si se termino la partida
function isGameFinished(healthA, healthB) {
    return (
        healthA > 0 && healthB == 0 ||
        healthA == 0 && healthB > 0 ||
        healthA == 0 && healthB == 0 ||
        healthA < 1 || healthB < 1 ||
        healthA == 0 || healthB == 0
    );
}

// Cuando carge completo la pagina
window.addEventListener('load', () => {
    playButton.addEventListener('click', playEvent);
    resetButton.addEventListener('click', resetEvent);
    randomAttackButton.addEventListener('click', choseRandomEvent);
    curerLivesButton.addEventListener('click', curerEvent);

    resetButton.disabled = true;
    randomAttackButton.disabled = true;
    curerLivesButton.disabled = true;

    spanWins.innerHTML = wins;
    spanLoses.innerHTML = loses;

    combat.style.display = 'none';
    reset.style.display = 'none';
    curerLivesButton.style.display = 'none';
});
