// Variables globales
let humanScore = 0;
let computerScore = 0;
let gameOver = false;

// Sélection des éléments DOM
const rockButton = document.querySelector('#rock');
const paperButton = document.querySelector('#paper');
const scissorsButton = document.querySelector('#scissors');
const resultsDiv = document.querySelector('#results');
const scoreDiv = document.querySelector('#score');

// Constantes
const WINNING_SCORE = 5;
const CHOICES = ["pierre", "papier", "ciseau"];

// Map pour déterminer le gagnant
const winConditions = {
    pierre: "ciseau",
    papier: "pierre",
    ciseau: "papier"
};

// === FONCTIONS UTILITAIRES ===

function capitalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function createMessage(text, color = null, isBold = false) {
    const element = document.createElement('p');
    element.textContent = text;
    if (color) element.style.color = color;
    if (isBold) element.style.fontWeight = 'bold';
    return element;
}

function displayMessage(message, color = null, isBold = false) {
    const element = createMessage(message, color, isBold);
    resultsDiv.appendChild(element);
}

// === FONCTIONS DE JEU ===

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[randomIndex];
}

function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie";
    }
    return winConditions[humanChoice] === computerChoice ? "human" : "computer";
}

function displayRoundResult(humanChoice, computerChoice, winner) {
    displayMessage(`Vous : ${capitalizeFirst(humanChoice)} vs Ordinateur : ${capitalizeFirst(computerChoice)}`);
    
    if (winner === "tie") {
        displayMessage(`Égalité ! Vous avez tous les deux choisi ${humanChoice}.`);
    } else if (winner === "human") {
        displayMessage(`Vous gagnez ! ${capitalizeFirst(humanChoice)} bat ${computerChoice}.`, 'green');
    } else {
        displayMessage(`Vous perdez ! ${capitalizeFirst(computerChoice)} bat ${humanChoice}.`, 'red');
    }
}

function updateScore() {
    scoreDiv.textContent = `Score - Vous: ${humanScore} | Ordinateur: ${computerScore}`;
}

function displayGameWinner() {
    const separator = document.createElement('hr');
    resultsDiv.appendChild(separator);
    
    if (humanScore === WINNING_SCORE) {
        const winnerText = document.createElement('h2');
        winnerText.textContent = '🎉 Félicitations ! Vous avez gagné le jeu ! 🎉';
        winnerText.style.color = 'green';
        resultsDiv.appendChild(winnerText);
    } else {
        const winnerText = document.createElement('h2');
        winnerText.textContent = '😢 Dommage ! L\'ordinateur a gagné le jeu ! 😢';
        winnerText.style.color = 'red';
        resultsDiv.appendChild(winnerText);
    }
}

function checkWinner() {
    if (humanScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        gameOver = true;
        disableButtons();
        displayGameWinner();
    }
}

function disableButtons() {
    [rockButton, paperButton, scissorsButton].forEach(button => {
        button.disabled = true;
    });
}

function playRound(humanChoice) {
    if (gameOver) return;
    
    const computerChoice = getComputerChoice();
    const winner = determineWinner(humanChoice, computerChoice);
    
    displayRoundResult(humanChoice, computerChoice, winner);
    
    if (winner === 'human') {
        humanScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    
    updateScore();
    checkWinner();
}

// === INITIALISATION ===

function initGame() {
    rockButton.addEventListener('click', () => playRound('pierre'));
    paperButton.addEventListener('click', () => playRound('papier'));
    scissorsButton.addEventListener('click', () => playRound('ciseau'));
}

// Démarrer le jeu
initGame();