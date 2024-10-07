class Players extends Sprite {
    constructor({
        position,
        velocity,
        direction = 1,
        imageSrc,
        scale,
        framesH,
        framesW,
        framesHold,
        framesCurrentW,
        framesCurrentH,
        framesElapsed,
        offset = { x: 0, y: 0 },
        sprites,
    }) {
        super({
            imageSrc,
            scale,
            framesH,
            framesW,
            framesHold,
            framesCurrentW,
            framesCurrentH,
            framesElapsed,
            position,
            offset,
        });
        this.isBlocking = false;
        this.canAttack = true;
        this.attackCooldown = 500;
        this.isDead = false;
        this.direction = direction;
        this.velocity = velocity;
        this.height = 150;
        this.width = 100;
        this.lastKey;
        this.succesfulAttackCount = 0;
        this.attackCount = 0;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 45,
            height: 50,
        };
        this.isAttacking;
        this.checkHeavyAttack = false;
        this.health = 100;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    draw() {
        ctx.save();
        if (this.direction === -1) {
            ctx.scale(-1, 1);
            ctx.drawImage(
                this.image,
                this.framesCurrentW * (this.image.width / this.framesW),
                this.framesCurrentH * (this.image.height / this.framesH),
                this.image.width / this.framesW,
                this.image.height / this.framesH,
                -this.position.x -
                    (this.image.width / this.framesW) * this.scale +
                    this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesW) * this.scale,
                (this.image.height / this.framesH) * this.scale
            );
        } else {
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

        ctx.restore();
    }

    update() {
        this.draw();
        if (!this.isDead) {
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
            if (this.direction === 1) {
                this.attackBox.position.x = this.position.x + this.width;
            } else {
                this.attackBox.position.x =
                    this.position.x - this.attackBox.width;
            }
            this.attackBox.position.y = this.position.y;
            this.position.y += this.velocity.y;
            this.position.x += this.velocity.x;
            if (
                this.position.x + this.width >= canvas.width ||
                this.position.x <= 0
            ) {
                this.velocity.x = 0;
            }
            if (
                this.position.y + this.height + this.velocity.y >=
                    canvas.height - 25 ||
                this.position.y + this.height + this.velocity.y <= 0
            ) {
                this.velocity.y = 0;
                this.position.y = 545
                
            } else this.velocity.y += gravity;
        }
    }

    attack() {
        if (!this.canAttack) return;
        this.isAttacking = true;
        this.canAttack = false;
        this.attackCount++;
        if (this.attackCount % 3 === 1) {
            this.switchSprite("attack1");
            attackSound1.Audio.play();
        } else if (this.attackCount % 3 === 2) {
            this.switchSprite("attack2");
            attackSound2.Audio.play();
        } else {
            this.switchSprite("attack3");
            attackSound3.Audio.play();
        }
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);

        setTimeout(() => {
            this.canAttack = true;
        }, this.attackCooldown);
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrentW === this.sprites.death.framesW - 1) {
                this.isDead = true;
            }
            return;
        }
        if (
            (this.image === this.sprites.attack1.image &&
                this.framesCurrentW < this.sprites.attack1.framesW - 1) ||
            (this.image === this.sprites.attack2.image &&
                this.framesCurrentW < this.sprites.attack2.framesW - 1) ||
            (this.image === this.sprites.attack3.image &&
                this.framesCurrentW < this.sprites.attack3.framesW - 1) ||
            (this.image === this.sprites.heavyAttack.image &&
                this.framesCurrentW < this.sprites.heavyAttack.framesW - 1) ||
            (this.image === this.sprites.hurt.image &&
                this.framesCurrentW < this.sprites.hurt.framesW - 1) ||
            (this.image === this.sprites.blockImpact.image &&
                this.framesCurrentW < this.sprites.blockImpact.framesW - 1)
        ) {
            return;
        }

        switch (sprite) {
            case "idle":
                if (this.image !== this.sprites.idle.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.idle.image;
                    this.framesW = this.sprites.idle.framesW;
                    this.framesHold = this.sprites.idle.framesHold;
                }
                break;
            case "run":
                if (this.image !== this.sprites.run.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.run.image;
                    this.framesW = this.sprites.run.framesW;
                    this.framesHold = this.sprites.run.framesHold;
                }
                break;
            case "jumpUp":
                if (this.image !== this.sprites.jumpUp.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.jumpUp.image;
                    this.framesW = this.sprites.jumpUp.framesW;
                    this.framesHold = this.sprites.jumpUp.framesHold;
                }
                break;
            case "jumpDown":
                if (this.image !== this.sprites.jumpDown.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.jumpDown.image;
                    this.framesW = this.sprites.jumpDown.framesW;
                    this.framesHold = this.sprites.jumpDown.framesHold;
                }
                break;
            case "attack1":
                if (this.image !== this.sprites.attack1.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.attack1.image;
                    this.framesW = this.sprites.attack1.framesW;
                    this.framesHold = this.sprites.attack1.framesHold;
                }
                break;
            case "attack2":
                if (this.image !== this.sprites.attack2.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.attack2.image;
                    this.framesW = this.sprites.attack2.framesW;
                    this.framesHold = this.sprites.attack2.framesHold;
                }
                break;
            case "attack3":
                if (this.image !== this.sprites.attack3.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.attack3.image;
                    this.framesW = this.sprites.attack3.framesW;
                    this.framesHold = this.sprites.attack3.framesHold;
                }
                break;
            case "death":
                if (this.image !== this.sprites.death.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.death.image;
                    this.framesW = this.sprites.death.framesW;
                    this.framesHold = this.sprites.death.framesHold;
                }
                break;
            case "heavyAttack":
                if (this.image !== this.sprites.heavyAttack.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.heavyAttack.image;
                    this.framesW = this.sprites.heavyAttack.framesW;
                    this.framesHold = this.sprites.heavyAttack.framesHold;
                }
                break;
            case "hurt":
                if (this.image !== this.sprites.hurt.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.hurt.image;
                    this.framesW = this.sprites.hurt.framesW;
                    this.framesHold = this.sprites.hurt.framesHold;
                }
                break;
            case "block":
                if (this.image !== this.sprites.block.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.block.image;
                    this.framesW = this.sprites.block.framesW;
                    this.framesHold = this.sprites.block.framesHold;
                }
                break;
            case "blockImpact":
                if (this.image !== this.sprites.blockImpact.image) {
                    this.framesCurrentW = 0;
                    this.image = this.sprites.blockImpact.image;
                    this.framesW = this.sprites.blockImpact.framesW;
                    this.framesHold = this.sprites.blockImpact.framesHold;
                }
                break;
        }
    }
}

const player1 = new Players({
    position: {
        x: 0,
        y: 545,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    imageSrc: "./assets/Player1/player1_idle.png",
    framesW: 7,
    scale: 2.1,
    offset: {
        x: 17,
        y: -44,
    },
    sprites: {
        idle: {
            imageSrc: "./assets/Player1/player1_idle.png",
            framesW: 7,
            framesHold: 5,
        },
        run: {
            imageSrc: "./assets/Player1/player1_run.png",
            framesW: 10,
            framesHold: 4,
        },
        jumpUp: {
            imageSrc: "./assets/Player1/player1_jumpUp.png",
            framesW: 3,
            framesHold: 12,
        },
        jumpDown: {
            imageSrc: "./assets/Player1/player1_jumpDown.png",
            framesW: 4,
            framesHold: 9,
        },
        attack1: {
            imageSrc: "./assets/Player1/player1_attack1.png",
            framesW: 6,
            framesHold: 5,
        },
        attack2: {
            imageSrc: "./assets/Player1/player1_attack2.png",
            framesW: 6,
            framesHold: 5,
        },
        attack3: {
            imageSrc: "./assets/Player1/player1_attack3.png",
            framesW: 8,
            framesHold: 3,
        },
        death: {
            imageSrc: "./assets/Player1/player1_death.png",
            framesW: 10,
            framesHold: 11,
        },
        heavyAttack: {
            imageSrc: "./assets/Player1/player1_heavyAttack.png",
            framesW: 6,
            framesHold: 6,
        },
        hurt: {
            imageSrc: "./assets/Player1/player1_hurt.png",
            framesW: 3,
            framesHold: 4,
        },
        block: {
            imageSrc: "./assets/Player1/player1_block_idle.png",
            framesW: 8,
            framesHold: 5,
        },
        blockImpact: {
            imageSrc: "./assets/Player1/player1_block_impact.png",
            framesW: 5,
            framesHold: 7,
        },
    },

    framesHold: 8,
});

const player2 = new Players({
    position: {
        x: 1100,
        y: 545,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    direction: -1,
    imageSrc: "./assets/Player2/Idle.png",
    framesW: 10,
    scale: 2,
    offset: {
        x: 46,
        y: 8,
    },
    sprites: {
        idle: {
            imageSrc: "./assets/Player2/Idle.png",
            framesW: 10,
            framesHold: 4,
        },
        run: {
            imageSrc: "./assets/Player2/Run.png",
            framesW: 8,
            framesHold: 5,
        },
        jumpUp: {
            imageSrc: "./assets/Player2/Going_Up.png",
            framesW: 3,
            framesHold: 12,
        },
        jumpDown: {
            imageSrc: "./assets/Player2/Going_Down.png",
            framesW: 3,
            framesHold: 12,
        },
        attack1: {
            imageSrc: "./assets/Player2/Attack1.png",
            framesW: 7,
            framesHold: 4,
        },
        attack2: {
            imageSrc: "./assets/Player2/Attack2.png",
            framesW: 6,
            framesHold: 5,
        },
        attack3: {
            imageSrc: "./assets/Player2/Attack3.png",
            framesW: 9,
            framesHold: 3,
        },
        death: {
            imageSrc: "./assets/Player2/Death1.png",
            framesW: 11,
            framesHold: 11,
        },
        heavyAttack: {
            imageSrc: "./assets/Player2/Heavy_Attack.png",
            framesW: 7,
            framesHold: 5,
        },
        hurt: {
            imageSrc: "./assets/Player2/Hurt.png",
            framesW: 3,
            framesHold: 6,
        },
        block: {
            imageSrc: "./assets/Player2/BlockIdle.png",
            framesW: 4,
            framesHold: 15,
        },
        blockImpact: {
            imageSrc: "./assets/Player2/BlockImpact.png",
            framesW: 4,
            framesHold: 7,
        },
    },
    framesHold: 8,
});
