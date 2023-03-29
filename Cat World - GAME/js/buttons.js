class Button {
    constructor(text, id) {
        this.text = text;
        this.id = id;
    }
}

function showButtons(array) {
    array.forEach((child) => {
        optionsGame = `<button id="${child.id}">${child.text}</button>`;
        botonesMovimiento.innerHTML += optionsGame;

        leftButton = document.getElementById('boton-izquierda');
        rightButton = document.getElementById('boton-derecha');
        downButton = document.getElementById('boton-abajo');
        upButton = document.getElementById('boton-arriba');
    });
}
