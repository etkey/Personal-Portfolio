const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

let isPlaying = false;
let isMuted = true;

const muteImage = new Image();
const unmuteImage = new Image();
muteImage.src = "./assets/icons/music-off.png";
unmuteImage.src = "./assets/icons/music-on.png";

const button = {
    x: 950,  
    y: 100,  
    width: muteImage.width * 0.08,
    height: muteImage.height *0.08,
};

function drawMuteButton() {
    if (isMuted) {
        ctx.drawImage(muteImage, button.x, button.y, button.width, button.height);
    } else {
        ctx.drawImage(unmuteImage, button.x, button.y, button.width, button.height);
    }
}

function isInsideButton(x, y) {
    return x >= button.x && x <= button.x + button.width &&
           y >= button.y && y <= button.y + button.height;
}

function toggleMute() {
    if (!isPlaying) {
        backgroundMusic.Audio.play().then(() => {
            isPlaying = true;
            isMuted = false;
        }).catch(error => {
            console.error("Error playing audio:", error);
        });
    } else {
        isMuted = !isMuted;
        backgroundMusic.Audio.muted = isMuted;
    }
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= button.x && x <= button.x + button.width &&
        y >= button.y && y <= button.y + button.height) {
        toggleMute();
    }
});