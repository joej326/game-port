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
let powerUpIntervalStart = 4000;

function startPowerUpInterval(go) {
    const powerUpInterval = setInterval(() => {
        if (powerUpIntervalStart > 2000 && powerUpIntervalStart <= 4000) {
            powerUpIntervalStart -= 100;
        } else if (powerUpIntervalStart <= 2000) {
            powerUpIntervalStart = powerUpIntervalStart;
        }
        if (go) {
            generatePowerUp();
            startPowerUpInterval(true);
            clearInterval(powerUpInterval);

        } else {
            startPowerUpInterval(false);
            clearInterval(powerUpInterval);
        }
    
    }, powerUpIntervalStart);
}

//////////////////////////


generatePowerUp();
startPowerUpInterval(true);
movePlayer();


let playerTop = 0;
let playerLeft = 0;

function movePlayer() {
    document.querySelector('.mobile-controller').addEventListener('click', (e) => {
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

        setInterval(() => {
            detectEntityCollision();
        }, 200);
        scoreKeeperElem.innerHTML = 'Score: ' + score;
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
    
        setInterval(() => {
            detectEntityCollision();
        }, 200);
        scoreKeeperElem.innerHTML = 'Score: ' + score;
    
    });
}



function generatePowerUp() {
    let powerUpId = 1;
    const leftPos = (Math.floor(Math.random() * Math.floor(90)).toString() + 'vw');
    const topPos = (Math.floor(Math.random() * Math.floor(90)).toString() + 'vh');
    


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
    let leftStart;
    if (direction === 'leftToRight') {
        leftStart = '-15vw';
        topStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vh');
    } else if (direction === 'rightToLeft') {
        leftStart = '105vw';
        topStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vh');
    } else if (direction === 'topToBottom') {
        leftStart = (Math.floor(Math.random() * Math.floor(99)).toString() + 'vw');
        topStart = '-15vh';
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
        movingPos = -15;
    } else {
        movingPos = 115;
    }
    const moveHazardInterval = setInterval(() => {
        if (direction === 'leftToRight') {
            if (movingPos < 115) {
                hazard.style.left = `${movingPos += 0.5}vw`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'rightToLeft') {
            if (movingPos > -25) {
                hazard.style.left = `${movingPos -= 0.5}vw`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'topToBottom') {
            if (movingPos < 115) {
                hazard.style.top = `${movingPos += 0.5}vh`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } else if (direction === 'bottomToTop') {
            if (movingPos > -25) {
                hazard.style.top = `${movingPos -= 0.5}vh`;
            } else {
                clearInterval(moveHazardInterval);
            }
        } 
    }, 50);
}

let hazardIntervalStart = 2500;

function startHazardInterval(go) {
    const hazardInterval = setInterval(() => {
        if (hazardIntervalStart > 1000 && hazardIntervalStart <= 2500) {
            hazardIntervalStart -= 100;
        } else {
            hazardIntervalStart = hazardIntervalStart
        }
        const hazardDirectionArray = ['leftToRight', 'rightToLeft', 'topToBottom', 'bottomToTop'];
        const randomDirection = hazardDirectionArray[(Math.floor(Math.random() * Math.floor(4)))];
        console.log('before');
        // generateHazard(randomDirection);
        if (go) {
            generateHazard(randomDirection);
            startHazardInterval(true);
            clearInterval(hazardInterval);

        } else {
            startHazardInterval(false);
            clearInterval(hazardInterval);
        }
    
    }, hazardIntervalStart);
}

startHazardInterval(true);
// generateHazard('leftToRight');
// generateHazard('rightToLeft');
// generateHazard('topToBottom');
// generateHazard('bottomToTop');



function detectEntityCollision() {

    const playerX = player.getBoundingClientRect().x;
    const playerY = player.getBoundingClientRect().y;

    const powerUpArray = [...document.querySelectorAll('.power-up')];
    const hazardArray = [...document.querySelectorAll('.hazard')];


    // set collision radius for mobile
    if ('ontouchstart' in document.documentElement) {
        for (let i = 0; i < powerUpArray.length; i++) {
            const powerUpX = powerUpArray[i].getBoundingClientRect().x;
            const powerUpY = powerUpArray[i].getBoundingClientRect().y;
    
    
            if ( (Math.abs((playerX - powerUpX) + 10) < 20) && (Math.abs((playerY - powerUpY) + 10) < 20) ) {
                powerUpArray[i].remove();
                score += 100;
            }
        }
    
        for (let i = 0; i < hazardArray.length; i++) {
            const hazardX = hazardArray[i].getBoundingClientRect().x;
            const hazardY = hazardArray[i].getBoundingClientRect().y;
    
            if ( (Math.abs((playerX - hazardX) + 10) < 27) && (Math.abs((playerY - hazardY) + 10) < 27) ) {
                player.remove();
                hazardArray.map((hazard) => hazard.remove());
                powerUpArray.map((power) => power.remove());

                startHazardInterval(false);
                startPowerUpInterval(false);
    
                document.querySelector('.game-over').style.display = 'unset';
                document.querySelector('.play-again').addEventListener('click', () => {
                    window.location.reload(false);
                });
            }
        }
    } else if ( !('ontouchstart' in document.documentElement) ) {
        for (let i = 0; i < powerUpArray.length; i++) {
            const powerUpX = powerUpArray[i].getBoundingClientRect().x;
            const powerUpY = powerUpArray[i].getBoundingClientRect().y;
    
    
            if ( (Math.abs((playerX - powerUpX) + 30) < 50) && (Math.abs((playerY - powerUpY) + 30) < 50) ) {
                powerUpArray[i].remove();
                score += 100;
            }
        }
    
        for (let i = 0; i < hazardArray.length; i++) {
            const hazardX = hazardArray[i].getBoundingClientRect().x;
            const hazardY = hazardArray[i].getBoundingClientRect().y;
    
            if ( (Math.abs((playerX - hazardX) + 30) < 62) && (Math.abs((playerY - hazardY) + 30) < 62) ) {
                player.remove();
                hazardArray.map((hazard) => hazard.remove());
                powerUpArray.map((power) => power.remove());

                startHazardInterval(false);
                startPowerUpInterval(false);
    
                document.querySelector('.game-over').style.display = 'unset';
                document.querySelector('.play-again').addEventListener('click', () => {
                    window.location.reload(false);
                });
            }
        }
    }

    

}




