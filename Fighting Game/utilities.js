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