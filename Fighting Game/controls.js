const keys = {
    a: { pressed: false },
    d: { pressed: false },
    w: { pressed: false },
    c: { pressed: false },
    ArrowLeft: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: {pressed: false},
    s: { pressed: false },
    1: { pressed: false },
};

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            keys.d.pressed = true;
            player1.lastKey = "d";
            if (!player1.isDead) player1.direction = 1;
            break;
        case "a":
            keys.a.pressed = true;
            player1.lastKey = "a";
            if (!player1.isDead) player1.direction = -1;
            break;
        case "w":
            if (
                player1.velocity.y === 0 &&
                player1.position.y + player1.height === canvas.height - 19
            ) {
                player1.velocity.y = -15;
            }
            break;
        case "s":
            if (player1.velocity.y === 0) {
                keys.s.pressed = true;
                player1.velocity.y = 0;
                player1.velocity.x = 0;
                player1.canAttack = false;
                player1.isBlocking = true;
                player1.lastKey = "s";
            }
            break;
        case " ":
            if (!player1.isDead) player1.attack();
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
            if (!player2.isDead) player2.direction = 1;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            player2.lastKey = "ArrowLeft";
            if (!player2.isDead) player2.direction = -1;
            break;
        case "ArrowUp":
            if (
                player2.velocity.y === 0 &&
                player2.position.y + player2.height === canvas.height - 19
            ) {
                player2.velocity.y = -15;
            }
            break;
        case "ArrowDown":
            if (player2.velocity.y === 0) {
                keys.ArrowDown.pressed = true;
                player2.velocity.y = 0;
                player2.velocity.x = 0;
                player2.canAttack = false;
                player2.isBlocking = true;
                player2.lastKey = "ArrowDown";
            }
            break;
        case "0":
            if (!player2.isDead) {
                player2.attack();
                player2.lastKey = "0";
            }
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
        case "s":
            keys.s.pressed = false;
            player1.canAttack = true;
            player1.isBlocking = false;
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
        case "ArrowDown":
            keys.ArrowDown.pressed = false;
            player2.canAttack = true;
            player2.isBlocking = false;
            break;  
    }
});
