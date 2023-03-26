const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador');
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo');

const contenedorTarjetas = document.getElementById("contenedor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

const sectionVerMapa = document.getElementById('ver-mapa');
const mapa = document.getElementById('mapa');

let pokemones = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let optionsPokemons;

let inputVaporeon;
let inputBulbasaur;
let inputScoorbunny;

let ataquePokemonJugador;
let ataquePokemonEnemigo;

let botonFuego;
let botonAgua;
let botonTierra;

let mascotaJugador;
let ataquesPokemones;
let mascotaSeleccionada;

let botones = [];

let indexAtaqueJugador;
let indexAtaqueEnemigo;

let victoriasJugador = 0;
let victoriasEnemigo = 0;

let vidasJugador = 3;
let vidasEnemigo = 3;

let lienzo = mapa.getContext('2d');
let backgroundImage;
let iv;

let scoorbunny = new Pokemon('Scoorbunny', './Assets/Scorbunny.png', 5, './Assets/Scoorbunny.png');
let vaporeon = new Pokemon('Vaporeon', './Assets/Vaporeon.png', 5, './Assets/Vaporeon.png');
let bulbasaur = new Pokemon('Bulbasaur', './Assets/Bulbasaur.png', 5, './Assets/Bulbasaur.png');

let scoorbunnyEnemigo = new Pokemon('Scoorbunny', './Assets/Scorbunny.png', 5, './Assets/Scoorbunny.png', aleatorio(mapa.width, mapa.height), aleatorio(mapa.width, mapa.height));
let vaporeonEnemigo = new Pokemon('Vaporeon', './Assets/Vaporeon.png', 5, './Assets/Vaporeon.png', aleatorio(mapa.width, mapa.height), aleatorio(mapa.width, mapa.height));
let bulbasaurEnemigo = new Pokemon('Bulbasaur', './Assets/Bulbasaur.png', 5, './Assets/Bulbasaur.png', aleatorio(mapa.width, mapa.height), aleatorio(mapa.width, mapa.height));

scoorbunny.ataques.push(
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥" , id: "boton-fuego" },
    { nombre: "🔥" , id: "boton-fuego" },
    { nombre: "💧" , id: "boton-agua" },
    { nombre: "🌱" , id: "boton-tierra" },
);

vaporeon.ataques.push(
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧" , id: "boton-agua" },
    { nombre: "💧" , id: "boton-agua" },
    { nombre: "🔥" , id: "boton-fuego" },
    { nombre: "🌱" , id: "boton-tierra" },
);

bulbasaur.ataques.push(
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱" , id: "boton-tierra" },
    { nombre: "🌱" , id: "boton-tierra" },
    { nombre: "💧" , id: "boton-agua" },
    { nombre: "🔥" , id: "boton-fuego" },
);

pokemones.push(vaporeon, bulbasaur, scoorbunny);

const textosVictorias = [
    'Oh vaya, ganaste la partida! 🏆😉',
    'Tremenda victoria bro! 😎',
    'Buena partida, sigue así! 😀'
];

const textosPerdidas = [
    'Perdiste, pero no te preocupes, se que o haras bien para la proxima! 😁',
    'Uff, por poco ganas! 😥'
];

const textosEmpates = [
    'Tremendo empate! 😯',
    'Empate!? Esto no se quedara así! 😧',
    'Un empate! 😨'
];

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    sectionVerMapa.style.display = 'none';

    pokemones.forEach((pokemon) => {
        optionsPokemons = `
        <input type="radio" name="mascota" id="${pokemon.nombre}" />
        <label class="tarjeta-de-mokepon" for="${pokemon.nombre}">
            <p>${pokemon.nombre}</p>
            <img src="${pokemon.foto}" alt="${pokemon.nombre}">
        </label>
        `;

        contenedorTarjetas.innerHTML += optionsPokemons;

        inputVaporeon = document.getElementById("Vaporeon");
        inputBulbasaur = document.getElementById("Bulbasaur");
        inputScoorbunny = document.getElementById("Scoorbunny");
    });

    backgroundImage = new Image();
    backgroundImage.src = './assets/mokemap.png';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    //sectionSeleccionarAtaque.style.display = 'flex';
    sectionVerMapa.style.display = 'flex';

    if (inputVaporeon.checked) {
        spanMascotaJugador.innerHTML = inputVaporeon.id;
        mascotaJugador = inputVaporeon.id;
    } else if (inputBulbasaur.checked) {
        spanMascotaJugador.innerHTML = inputBulbasaur.id;
        mascotaJugador = inputBulbasaur.id;
    } else if (inputScoorbunny.checked) {
        spanMascotaJugador.innerHTML = inputScoorbunny.id;
        mascotaJugador = inputScoorbunny.id;
    } else {
        alert('Selecciona una mascota');
    }

    extraerAtaquesDelPokemon(mascotaJugador);
    seleccionarMascotaEnemigo();
    verMapaCompleto();
}

function extraerAtaquesDelPokemon(pokemonDelJugador) {
    let ataques;

    for (let i = 0; i < pokemones.length; i++) {
        if (pokemonDelJugador === pokemones[i].nombre) {
            ataques = pokemones[i].ataques;
        }
    }

    mostrarAtaquesDelPokemon(ataques);
}

function mostrarAtaquesDelPokemon(ataquesEnElJuego) {
    ataquesEnElJuego.forEach((ataque) => {
        ataquesPokemones = `
        <button id="${ataque.id}" class="boton-de-ataque boton-ataque">${ataque.nombre}</button>
        `;

        contenedorAtaques.innerHTML += ataquesPokemones;
    });

    botonFuego =  document.getElementById('boton-fuego')
    botonAgua =  document.getElementById('boton-agua')
    botonTierra =  document.getElementById('boton-tierra');

    botones = document.querySelectorAll(".boton-ataque");
}

function secuenciasAtaques() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (ev) => {
            if (ev.target.textContent === "🔥") {
                ataqueJugador.push('Fuego');
                boton.style.background = "#1A120B";
            } else if (ev.target.textContent === "💧") {
                ataqueJugador.push('Agua');
                //console.log(ataqueJugador);
                boton.style.background = "#1A120B";
            } else {
                ataqueJugador.push('Tierra');
                //console.log(ataqueJugador);
                boton.style.background = "#1A120B";
            }

            boton.disabled = true;

            ataqueAleatorioEnemigo();
        });
    });
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(0, pokemones.length - 1);

    spanMascotaEnemigo.innerHTML = pokemones[mascotaAleatoria].nombre;
    ataquePokemonEnemigo = pokemones[mascotaAleatoria].ataques;
    secuenciasAtaques();
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquePokemonEnemigo.length - 1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('Fuego');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('Agua');
    } else {
        ataqueEnemigo.push('Tierra');
    }

    iniciarCombate();
}

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        combate();
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador];
    indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]) {
            indexAmbosOponentes(index, index);
            crearMensaje('Empate!');
        } else if (
            ataqueJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra' ||
            ataqueJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego' ||
            ataqueJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua'
        ) {
            indexAmbosOponentes(index, index);
            crearMensaje('Ganaste!');
            victoriasJugador ++;
        } else {
            indexAmbosOponentes(index, index);
            crearMensaje('Perdiste!');
            victoriasEnemigo ++;
        }
    }

    spanVidasJugador.innerHTML = victoriasJugador;
    spanVidasEnemigo.innerHTML = victoriasEnemigo;

    revisarVictoriasDeAmbos();
}

function revisarVictoriasDeAmbos() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal(textosEmpates[aleatorio(0, textosEmpates.length - 1)].toString());
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal(textosVictorias[aleatorio(0, textosVictorias.length - 1)].toString());
    } else {
        crearMensajeFinal(textosPerdidas[aleatorio(0, textosPerdidas.length - 1)].toString());
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = `${indexAtaqueJugador}!`;
    nuevoAtaqueDelEnemigo.innerHTML = `${indexAtaqueEnemigo}!`;

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciar.style.display = 'block';
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarMapa() {
    mascotaSeleccionada.x += mascotaSeleccionada.velocityX;
    mascotaSeleccionada.y += mascotaSeleccionada.velocityY;

    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        backgroundImage,
        0,
        0,
        mapa.width,
        mapa.height
    );

    mascotaSeleccionada.drawSprite();
    vaporeonEnemigo.drawSprite();
    bulbasaurEnemigo.drawSprite();
    scoorbunnyEnemigo.drawSprite();
}

function moverDerecha() {
    mascotaSeleccionada.velocityX = 5;
}

function moverIzquierda() {
    mascotaSeleccionada.velocityX = -5;
}

function moverArriba() {
    mascotaSeleccionada.velocityY = -5;
}

function moverAbajo() {
    mascotaSeleccionada.velocityY = 5;
}

function detenerMovimiento() {
    mascotaSeleccionada.velocityX = 0;
    mascotaSeleccionada.velocityY = 0;
}

function handleKeydown(ev) {
    switch (ev.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moverArriba();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moverAbajo();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moverIzquierda();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moverDerecha();
            break
        default:
            break;
    }
}

function verMapaCompleto() {
    mapa.width = 800;
    mapa.height = 600;

    mascotaSeleccionada = obtenerMascotaSeleccionada(mascotaJugador);
    iv = setInterval(pintarMapa, 50);

    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerMascotaSeleccionada() {
    for (let i = 0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre) {
            return pokemones[i];
        }
    }
}

window.addEventListener('load', iniciarJuego);
