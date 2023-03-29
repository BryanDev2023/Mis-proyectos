class Player {
    constructor(name, image, x = 0, y = 150) {
        this.name = name;

        this.x = x;
        this.y = y;
        this.w = 80;
        this.h = 80;

        this.velocityX = 0;
        this.velocityY = 0;

        this.characterImage = new Image();
        this.characterImage.src = image;
    }

    drawSprite() {
        lienzo.drawImage(this.characterImage, this.x, this.y, this.w, this.h);
    }

    moverDerecha() {
        player.velocityX = 8;
    }
    
    moverIzquierda() {
        player.velocityX = -8;
    }
    
    moverArriba() {
        player.velocityY = -8;
    }
    
    moverAbajo() {
        player.velocityY = 8;
    }

    detenerMovimiento() {
        player.velocityX = 0;
        player.velocityY = 0;
    }

    setKeysForMovement(keyUp = 'ArrowUp', keyDown = 'ArrowDown', keyLeft = 'ArrowLeft', keyRight = 'ArrowRight') {
        window.addEventListener('keydown', (ev) => {
            switch (ev.key) {
                case keyUp:
                    this.moverArriba();
                    break;
                case keyDown:
                    this.moverAbajo();
                    break
                case keyLeft:
                    this.moverIzquierda();
                    break
                case keyRight:
                    this.moverDerecha();
                    break
                default:
                    break;
            }
        });

        window.addEventListener('keyup', this.detenerMovimiento);
    }

    setEventButtonsForMovement(leftButton, rightButton, downButton, upButton) {
        leftButton.addEventListener('mousedown', this.moverIzquierda);
        rightButton.addEventListener('mousedown', this.moverDerecha);
        downButton.addEventListener('mousedown', this.moverAbajo);
        upButton.addEventListener('mousedown', this.moverArriba);

        leftButton.addEventListener('mouseup', this.detenerMovimiento);
        rightButton.addEventListener('mouseup', this.detenerMovimiento);
        downButton.addEventListener('mouseup', this.detenerMovimiento);
        upButton.addEventListener('mouseup', this.detenerMovimiento);
    }
}
