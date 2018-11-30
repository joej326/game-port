if ('ontouchstart' in document.documentElement) {
    const elem = document.querySelector('.mobile-controller').style.display = 'flex';
    // alert('why is this running?');

}

let score = 0;

const scoreKeeperElem = document.createElement('h1');
scoreKeeperElem.classList = 'score';
scoreKeeperElem.innerHTML = 'Score: ' + 0;
document.body.append(scoreKeeperElem);


const player = document.createElement('div');
player.classList = 'player';
document.body.append(player);

   

// INTERVAL ////////////
let powerUpIntervalStart = 5000;

function startInterval() {
    const powerUpInterval = setInterval(() => {
        if (powerUpIntervalStart > 4000 && powerUpIntervalStart <= 5000) {
            powerUpIntervalStart -= 200;
        } else if (powerUpIntervalStart > 3000 && powerUpIntervalStart <= 4000) {
            powerUpIntervalStart -= 150;
        } else if (powerUpIntervalStart > 500 && powerUpIntervalStart <= 3000) {
            powerUpIntervalStart -= 100;
        } else if (powerUpIntervalStart < 500) {
            powerUpIntervalStart = powerUpIntervalStart;
        }
        generatePowerUp();
        clearInterval(powerUpInterval);
        startInterval();
    
    }, powerUpIntervalStart);
}

//////////////////////////


generatePowerUp();
startInterval();


let playerTop = 0;
let playerLeft = 0;
document.addEventListener('click', (e) => {
    console.log(e);

    if (e.path[0].classList[1] === 'up-arrow') {
        player.style.top = (playerTop -= 5) + 'vw';
    } else if (e.path[0].classList[1] === 'down-arrow') {
        player.style.top = (playerTop += 5) + 'vw';
    } else if (e.path[0].classList[1] === 'left-arrow') {
        player.style.left = (playerLeft -= 5) + 'vw';
        player.style.transform = 'rotateY(0deg)';
    } else if (e.path[0].classList[1] === 'right-arrow') {
        player.style.left = (playerLeft += 5) + 'vw';
        player.style.transform = 'rotateY(180deg)';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowUp') {
        player.style.top = (playerTop -= 5) + 'vw';
    } else if (e.code === 'ArrowDown') {
        player.style.top = (playerTop += 5) + 'vw';
    } else if (e.code === 'ArrowLeft') {
        player.style.left = (playerLeft -= 5) + 'vw';
        player.style.transform = 'rotateY(0deg)';
    } else if (e.code === 'ArrowRight') {
        player.style.left = (playerLeft += 5) + 'vw';
        player.style.transform = 'rotateY(180deg)';
    } else if (e.code === 'ArrowRight' && e.code === 'ArrowUp') {
        player.style.left = (playerLeft += 5) + 'vw';
        player.style.top = (playerTop -= 5) + 'vw';
        player.style.transform = 'rotateY(180deg)';
    } 

    detectPowerUpCollision();
    scoreKeeperElem.innerHTML = 'Score: ' + score;

});


function generatePowerUp() {
    let powerUpId = 1;
    const leftPos = (Math.floor(Math.random() * Math.floor(100)).toString() + 'vw');
    const topPos = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vh');
    


    const powerUp = document.createElement('div');
    powerUp.classList = `power-up power-up${powerUpId}`;
    powerUp.style.left = leftPos;
    powerUp.style.top = topPos;
    powerUp.style.transform = `rotate(${(Math.floor(Math.random() * Math.floor(360)).toString())}deg)`;
    document.body.append(powerUp);

    powerUpId++;

}

function generateHazard(direction) {
    let topStart;
    let topFinish;
    let leftStart;
    let leftFinish;
    if (direction === 'leftToRight') {
        leftStart = '-5vw';
        topStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vh');
    } else if (direction === 'rightToLeft') {
        leftStart = '105vw';
        topStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vh');
    } else if (direction === 'topToBottom') {
        leftStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vw');
        topStart = '-5vh';
    } else if (direction === 'bottomToTop') {
        leftStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vw');
        topStart = '105vh';
    }
    
    let hazardId = 1;

    const hazard = document.createElement('div');
    hazard.classList = `hazard hazard${hazardId}`;
    hazard.style.left = leftStart;
    hazard.style.top = topStart;
    document.body.append(hazard);

    let movingPos;
    if (direction === 'leftToRight' || direction === 'topToBottom') {
        movingPos = 0;
    } else {
        movingPos = 105;
    }
    const moveHazardInterval = setInterval(() => {
        if (direction === 'leftToRight') {
            if (movingPos < 105) {
                hazard.style.left = `${movingPos += 0.5}vw`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'rightToLeft') {
            if (movingPos > -5) {
                hazard.style.left = `${movingPos -= 0.5}vw`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'topToBottom') {
            if (movingPos < 105) {
                hazard.style.top = `${movingPos += 0.5}vh`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'bottomToTop') {
            if (movingPos > -5) {
                hazard.style.top = `${movingPos -= 0.5}vh`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } 
    }, 50);
}



generateHazard('leftToRight');
generateHazard('rightToLeft');
generateHazard('topToBottom');
generateHazard('bottomToTop');



function detectPowerUpCollision() {


    const playerX = player.getBoundingClientRect().x;
    const playerY = player.getBoundingClientRect().y;

    const powerUpArray = [...document.querySelectorAll('.power-up')];

    for (let i = 0; i < powerUpArray.length; i++) {
        const powerUpX = powerUpArray[i].getBoundingClientRect().x;
        const powerUpY = powerUpArray[i].getBoundingClientRect().y;

        if ( (Math.abs((playerX - powerUpX) + 50) < 50) && (Math.abs((playerY - powerUpY) + 50) < 50) ) {
            powerUpArray[i].remove();
            score += 100;
        }
    }

}




