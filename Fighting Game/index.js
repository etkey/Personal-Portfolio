const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;
class Sprite {
    constructor({ position }) {
        this.position = position;
        this.height = 150;
        this.width = 50;
    }

    draw() {}

    update() {
        this.draw();
    }
}
class Players {
    constructor({ position, velocity, direction = 1 }) {
        this.direction = direction;
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackCount = 0;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 100,
            height: 50,
        };
        this.isAttacking;
        this.checkHeavyAttack = false;
        this.health = 100;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        if (this.isAttacking) {
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            );
        }
    }

    update() {
        this.draw();

        if (this.direction === 1) {
            this.attackBox.position.x = this.position.x + this.width;
        } else {
            this.attackBox.position.x = this.position.x - this.attackBox.width;
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
            this.position.y + this.height + this.velocity.y >= canvas.height ||
            this.position.y + this.height + this.velocity.y <= 0
        ) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

const player1 = new Players({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
});

const player2 = new Players({
    position: {
        x: canvas.width - 50,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    },
    direction: -1,
});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    c: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    1: {
        pressed: false,
    },
};

let lastKey1;
let lastKey2;

function collisionDetection({ box1, box2 }) {
    return (
        box1.attackBox.position.x + box1.attackBox.width >= box2.position.x &&
        box1.attackBox.position.x <= box2.position.x + box2.width &&
        box1.attackBox.position.y + box1.attackBox.height >= box2.position.y &&
        box1.attackBox.position.y <= box2.position.y + box2.height
    );
}

function selectWinner({ player1, player2, timerId }) {
    clearTimeout(timerId);
    let displayResult = document.querySelector("#result");
    displayResult.style.display = "flex";
    if (player1.health === player2.health) {
    } else if (player1.health > player2.health) {
        displayResult.innerHTML = "Player 1 Wins!";
    } else {
        displayResult.innerHTML = "Player 2 Wins!";
    }
}

let timeElement = document.querySelector("#countdown");
let timerId;
function countDown() {
    let time = parseInt(timeElement.innerHTML, 10);
    if (time > 0) {
        timerId = setTimeout(countDown, 1000);
        time--;
        timeElement.innerHTML = time;
    }
    if (time === 0) {
        selectWinner({ player1, player2, timerId });
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    if (keys.a.pressed && player1.lastKey === "a") {
        player1.velocity.x = -5;
    } else if (keys.d.pressed && player1.lastKey === "d") {
        player1.velocity.x = 5;
    }
    if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft") {
        player2.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight") {
        player2.velocity.x = 5;
    }

    if (
        collisionDetection({ box1: player1, box2: player2 }) &&
        player1.isAttacking
    ) {
        player1.attackCount++;
        if (player1.attackCount % 3 === 0) {
            player1.checkHeavyAttack = true;
        }
        player1.isAttacking = false;
        player2.health = player2.health - 7;
        if (player2.health <= 0) player2.health = 0;
        document.querySelector("#player2-health").style.width =
            player2.health + "%";
    }
    if (
        collisionDetection({ box1: player1, box2: player2 }) &&
        player1.lastKey === "c" &&
        player1.checkHeavyAttack
    ) {
        player2.health = player2.health - 14;
        if (player2.health <= 0) player2.health = 0;
        player1.checkHeavyAttack = false;
        document.querySelector("#player2-health").style.width =
            player2.health + "%";
    }

    if (
        collisionDetection({ box1: player2, box2: player1 }) &&
        player2.isAttacking
    ) {
        player2.attackCount++;
        if (player2.attackCount % 3 === 0) {
            player2.checkHeavyAttack = true;
        }
        player2.isAttacking = false;
        player1.health = player1.health - 7;
        if (player1.health <= 0) player1.health = 0;
        document.querySelector("#player1-health").style.width =
            player1.health + "%";
    }
    if (
        collisionDetection({ box1: player2, box2: player1 }) &&
        player2.lastKey === "1" &&
        player2.checkHeavyAttack
    ) {
        player1.health = player1.health - 14;
        if (player1.health <= 0) player1.health = 0;
        player2.checkHeavyAttack = false;
        document.querySelector("#player1-health").style.width =
            player1.health + "%";
    }
    if (player1.health <= 0 || player2.health <= 0) {
        selectWinner({ player1, player2, timerId });
    }
}
countDown();
animate();

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            player1.lastKey = "d";
            player1.direction = 1;
            break;
        case "a":
            keys.a.pressed = true;
            player1.lastKey = "a";
            player1.direction = -1;
            break;
        case "w":
            if (
                player1.velocity.y === 0 &&
                player1.position.y + player1.height === canvas.height
            ) {
                player1.velocity.y = -15;
            }
            break;
        case " ":
            player1.attack();
            player1.lastKey = " ";
            break;
        case "c":
            if (player1.checkHeavyAttack === true) {
                player1.lastKey = "c";
            }
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            player2.lastKey = "ArrowRight";
            player2.direction = 1;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            player2.lastKey = "ArrowLeft";
            player2.direction = -1;
            break;
        case "ArrowUp":
            if (
                player2.velocity.y === 0 &&
                player2.position.y + player2.height === canvas.height
            ) {
                player2.velocity.y = -15;
            }
            break;
        case "0":
            player2.attack();
            player2.lastKey = "0";
            break;
        case "1":
            if (player2.checkHeavyAttack === true) {
                player2.lastKey = "1";
            }
            break;
    }
});

window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "w":
            keys.w.pressed = false;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
    }
});
