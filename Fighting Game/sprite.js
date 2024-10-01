class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesW = 1,
        framesH = 1,
        framesHold = 12,
        speed = 0,
        offset = { x: 0, y: 0 },
    }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesW = framesW;
        this.framesH = framesH;
        this.framesCurrentW = 0;
        this.framesCurrentH = 0;
        this.framesElapsed = 0;
        this.framesHold = framesHold;
        this.speed = speed;
        this.offset = offset;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrentW * (this.image.width / this.framesW),
            this.framesCurrentH * (this.image.height / this.framesH),
            this.image.width / this.framesW,
            this.image.height / this.framesH,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesW) * this.scale,
            (this.image.height / this.framesH) * this.scale
        );
    }

    update() {
        this.draw();
        this.position.x += this.speed;
        if (this.position.x > 2800) {
            this.position.x = 0;
        }
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrentW < this.framesW - 1) {
                this.framesCurrentW++;
            } else {
                this.framesCurrentW = 0;
                if (this.framesCurrentH < this.framesH - 1) {
                    this.framesCurrentH++;
                } else {
                    this.framesCurrentH = 0;
                }
            }
        }
    }
}
const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: "./assets/background.png",
});

const crow1 = new Sprite({
    position: { x: 45, y: 120 },
    imageSrc: "./assets/flying.png",
    scale: 0.8,
    framesH: 1,
    framesW: 3,
    framesHold: 13,
    speed: 3,
});

const crow2 = new Sprite({
    position: { x: 0, y: 105 },
    imageSrc: "./assets/flying2.png",
    scale: 0.8,
    framesH: 1,
    framesW: 5,
    framesHold: 10,
    speed: 3,
});

const pigeon = new Sprite({
    position: { x: 500, y: 455 },
    imageSrc: "./assets/pigeon.png",
    scale: 0.5,
    framesH: 1,
    framesW: 4,
    framesHold: 13,
});

const beggar = new Sprite({
    position: { x: 210, y: 483 },
    imageSrc: "assets/beggar.png",
    scale: 2.3,
    framesW: 5,
    framesH: 1,
    framesHold: 15,
});

const elder = new Sprite({
    position: { x: 375, y: 497 },
    imageSrc: "assets/elder.png",
    scale: 1.8,
    framesW: 4,
    framesH: 1,
});

const dog = new Sprite({
    position: { x: 650, y: 490 },
    imageSrc: "assets/dog.png",
    scale: 2,
    framesW: 4,
    framesH: 1,
});

const sweeper = new Sprite({
    position: { x: 867, y: 493 },
    imageSrc: "assets/villager_01.png",
    scale: 1.9,
    framesW: 5,
    framesH: 1,
    framesHold: 13,
});

const girlOnTheBalcony = new Sprite({
    position: { x: 685, y: 397 },
    imageSrc: "assets/girl_on_the_balcony.png",
    scale: 1.8,
    framesW: 4,
    framesH: 1,
    framesHold: 14,
});
