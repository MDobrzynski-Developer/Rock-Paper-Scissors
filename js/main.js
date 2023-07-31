
// Rock, Paper, Scissors - Game by Marcin Dobrzyński
const rockMoveButton = document.querySelector('.js-rock-move-button');
const paperMoveButton = document.querySelector('.js-paper-move-button');
const scissorsMoveButton = document.querySelector('.js-scissors-move-button');

const gameResult = document.querySelector('.js-game-result');
const gameMovesEmoji = document.querySelector('.js-game-moves-emoji');
const gameMovesText = document.querySelector('.js-game-moves-text');

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateGameScore();

rockMoveButton.addEventListener('click', () => {
    playGame('Rock');
});

paperMoveButton.addEventListener('click', () => {
    playGame('Paper');
});

scissorsMoveButton.addEventListener('click', () => {
    playGame('Scissors');
});

const resetScoreButton = document.querySelector('.js-reset-score-button');

resetScoreButton.addEventListener('click', () => {
    resetScore();
});

const automatedGamingButton = document.querySelector('.js-automated-gaming-button');
let isAutomatedGaming = false;
let intervalId;

function automatedGaming(intervalTime) {
    if(!isAutomatedGaming) {
        intervalId = setInterval(() => {
            const playerMove = getRandomComputerMove();
            playGame(playerMove);
        }, intervalTime);
        isAutomatedGaming = true;
        automatedGamingButton.textContent = 'Wyłącz pomoc AI';
    } else {
        clearInterval(intervalId);
        isAutomatedGaming = false;
        automatedGamingButton.textContent = 'Włącz pomoc AI';
    }
}

automatedGamingButton.addEventListener('click', () => {
    automatedGaming(1000);
});

function playGame(playerMove) {
    const computerMove = getRandomComputerMove();
    let result = '';

    if(playerMove === 'Rock') {
        if(computerMove === 'Rock') {
            result = 'Remis!';
        } else if(computerMove === 'Paper') {
            result = 'Przegrałeś/aś!';
        } else if(computerMove === 'Scissors') {
            result = 'Wygrałeś/aś!';
        }
    } else if(playerMove === 'Paper') {
        if(computerMove === 'Rock') {
            result = 'Wygrałeś/aś!';
        } else if(computerMove === 'Paper') {
            result = 'Remis!';
        } else if(computerMove === 'Scissors') {
            result = 'Przegrałeś/aś!';
        }
    } else if(playerMove === 'Scissors') {
        if(computerMove === 'Rock') {
            result = 'Przegrałeś/aś!';
        } else if(computerMove === 'Paper') {
            result = 'Wygrałeś/aś!';
        } else if(computerMove === 'Scissors') {
            result = 'Remis!';
        }
    }

    if(result === 'Wygrałeś/aś!') {
        score.wins += 1;
    } else if(result === 'Przegrałeś/aś!') {
        score.losses += 1;
    } else if(result === 'Remis!') {
        score.ties += 1;
    }

    gameResult.textContent = result;
    gameMovesEmoji.innerHTML = `Ty <img src="../images/${playerMove.toLowerCase()}-emoji.png" alt="${playerMove}"> <img src="../images/${computerMove.toLowerCase()}-emoji.png" alt="${computerMove}"> Komputer`;
    gameMovesText.innerHTML = `You: <b>${playerMove}</b>, Computer: <b>${computerMove}</b>.`;

    localStorage.setItem('score', JSON.stringify(score));

    updateGameScore();

    console.log(computerMove);
    console.log(playerMove);
    console.log(result);
    console.log(score);
}

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'k' || event.key === 'K') {
        playGame('Rock');
    } else if(event.key === 'p' || event.key === 'P') {
        playGame('Paper');
    } else if(event.key === 'n' || event.key === 'N') {
        playGame('Scissors');
    } 
});

function updateGameScore() {
    const winsScore = document.querySelector('.js-wins-score');
    const lossesScore = document.querySelector('.js-losses-score');
    const tiesScore = document.querySelector('.js-ties-score');

    winsScore.textContent = score.wins;
    lossesScore.textContent = score.losses;
    tiesScore.textContent = score.ties;
}

function resetScore() {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };

    alert('Wynik został zresetowany. Powodzenia w dalszej rozgrywce!');

    localStorage.removeItem('score');

    gameResult.textContent = '';
    gameMovesEmoji.innerHTML = '';
    gameMovesText.innerHTML = '';

    updateGameScore();
}

function getRandomComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if(randomNumber >= 1 / 3 && randomNumber < 2 / 3) { 
        computerMove = 'Paper';
    } else if(randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}
