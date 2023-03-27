class Player {
    constructor(name, image, x = 0, y = 400) {
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

    setKeysForMovement(keyUp = 'w', keyDown = 's', keyLeft = 'a', keyRight = 'd') {
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

        window.addEventListener('keyup', () => {
            player.velocityX = 0;
            player.velocityY = 0;
        });
    }
}