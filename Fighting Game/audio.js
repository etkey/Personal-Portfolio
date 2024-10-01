class soundEffects {
    constructor({ source, speed, volume, loop = false }) {
        this.Audio = new Audio(source);
        this.Audio.playbackRate = speed;
        this.Audio.volume = volume;
        this.Audio.loop = loop;
        this.loopInterval = null;
    }

    playFrom(time) {
        this.Audio.currentTime = time;
        this.Audio.play();
    }

    stopFrom(time) {
        if (this.Audio.currentTime === time) {
            this.Audio.pause();
            this.Audio.currentTime = 0;
        }
    }
    loopFromTo(from, to) {
        this.Audioudio.currentTime = from;
        this.Audio.play();

        if (this.loopInterval) clearInterval(this.loopInterval);

        this.loopInterval = setInterval(() => {
            if (this.Audio.currentTime >= to) {
                this.Audio.currentTime = from;
            }
        }, 100);
    }

    stopLoop() {
        if (this.loopInterval) clearInterval(this.loopInterval);
        this.stop();
    }
}

let impactRan = 1;

function impact() {
    if ((player1.attackCount + player2.attackCount) % 3 === 1) {
        impactSound1.Audio.play();
    } else if ((player1.attackCount + player2.attackCount) % 3 === 2) {
        impactSound2.Audio.play();
    } else {
        impactSound3.Audio.play();
    }
}

function shieldImpact() {
    if (player2.attackCount % 3 === 1) {
        shieldBlock1.Audio.play();
    } else if (player2.attackCount % 3 === 2) {
        shieldBlock2.Audio.play();
    } else {
        shieldBlock3.Audio.play();
    }
}

function swordImpact() {
    if (player1.attackCount % 3 === 1) {
        swordBlock1.Audio.play();
    } else if (player1.attackCount % 3 === 2) {
        swordBlock2.Audio.play();
    } else {
        swordBlock3.Audio.play();
    }
}

const backgroundMusic = new soundEffects({
    source: "./assets/audio/battlefield.wav",
    speed: 1,
    volume: 0.7,
    loop: true,
});

const chainRun1 = new soundEffects({
    source: "./assets/audio/Stone Chain Run 1.ogg",
    speed: 2,
    volume: 0.5,
});

const run1 = new soundEffects({
    source: "./assets/audio/Stone Run 1.ogg",
    speed: 2,
    volume: 0.5,
});

const jump = new soundEffects({
    source: "./assets/audio/Stone Jump.ogg",
    speed: 2,
    volume: 0.5,
});

const land = new soundEffects({
    source: "./assets/audio/Stone Land.ogg",
    speed: 2,
    volume: 0.4,
});

const chainJump = new soundEffects({
    source: "./assets/audio/Stone Chain Jump.ogg",
    speed: 2,
    volume: 0.5,
});

const chainLand = new soundEffects({
    source: "./assets/audio/Stone Chain Land.ogg",
    speed: 2,
    volume: 0.4,
});

const attackSound1 = new soundEffects({
    source: "./assets/audio/Sword Attack 1.ogg",
    speed: 1,
    volume: 1,
});

const attackSound2 = new soundEffects({
    source: "./assets/audio/Sword Attack 2.ogg",
    speed: 1,
    volume: 1,
});

const attackSound3 = new soundEffects({
    source: "./assets/audio/Sword Attack 3.ogg",
    speed: 1,
    volume: 1,
});

const heavyAttackSound = new soundEffects({
    source: "./assets/audio/heavy-attack.wav",
    speed: 1,
    volume: 1,
});

const impactSound1 = new soundEffects({
    source: "./assets/audio/Sword Impact Hit 1.ogg",
    speed: 1,
    volume: 1,
});

const impactSound2 = new soundEffects({
    source: "./assets/audio/Sword Impact Hit 2.ogg",
    speed: 1,
    volume: 1,
});

const impactSound3 = new soundEffects({
    source: "./assets/audio/Sword Impact Hit 3.ogg",
    speed: 1,
    volume: 1,
});

const bloodSpill = new soundEffects({
    source: "./assets/audio/blood-spill-.mp3",
    speed: 1,
    volume: 0.9,
});

const strangledThroat = new soundEffects({
    source: "./assets/audio/throat-strangled.wav",
    speed: 1,
    volume: 1,
});

const shieldBlock1 = new soundEffects({
    source: "./assets/audio/Shield Block 1.wav",
    speed: 1.1,
    volume: 0.8,
});

const shieldBlock2 = new soundEffects({
    source: "./assets/audio/Shield Block 2.wav",
    speed: 1.1,
    volume: 0.8,
});

const shieldBlock3 = new soundEffects({
    source: "./assets/audio/Shield Block 3.wav",
    speed: 1.1,
    volume: 0.8,
});

const swordBlock1 = new soundEffects({
    source: "./assets/audio/swordBlock1.wav",
    speed: 1,
    volume: 0.8,
});

const swordBlock2 = new soundEffects({
    source: "./assets/audio/swordBlock2.wav",
    speed: 1,
    volume: 0.8,
});

const swordBlock3 = new soundEffects({
    source: "./assets/audio/swordBlock3.wav",
    speed: 1,
    volume: 0.8,
});
