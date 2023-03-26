class Pokemon {
        constructor(nombre, foto, vidas, fotoMapa, x = 10, y = 10) {
                this.nombre = nombre;
                this.foto = foto;
                this.vidas = vidas;
                this.ataques = [];

                this.x = x;
                this.y = y;
                this.ancho = 80;
                this.alto = 80;

                this.mapaFoto = new Image();
                this.mapaFoto.src = fotoMapa;

                this.velocityX = 0;
                this.velocityY = 0;
        }

        drawSprite() {
                lienzo.drawImage(
                        this.mapaFoto,
                        this.x,
                        this.y,
                        this.ancho,
                        this.alto
                    );
        }
}
