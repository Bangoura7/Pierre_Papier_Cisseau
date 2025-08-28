let humanScore = 0;
let computerScore = 0;

// Fonction utilitaire pour mettre la première lettre en majuscule
function capitalizeFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getComputerChoice() {
    const choices = ["pierre", "papier", "ciseau"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    // randomIndex sera 0, 1, ou 2
    // choices[0] = "pierre"
    // choices[1] = "papier" 
    // choices[2] = "ciseau"
    return choices[randomIndex];
}

function getHumanChoice() {
    let choice = prompt("Choisissez pierre, papier ou ciseau :");
    
    while ((choice = choice.toLowerCase()) !== "pierre" && 
           choice !== "papier" && 
           choice !== "ciseau") {
        choice = prompt("Choix invalide. Choisissez pierre, papier ou ciseau :");
    }
    
    return choice;
}

function playRound(humanChoice, computerChoice) {
    
    console.log(`Vous : ${capitalizeFirst(humanChoice)} vs Ordinateur : ${capitalizeFirst(computerChoice)}`);
    
    // Cas d'égalité 
    if (humanChoice === computerChoice) {
        console.log(`Égalité ! Vous avez tous les deux choisi ${humanChoice}.`);
        return "tie";
    }

    // Cas où l'humain gagne
    if ((humanChoice === "pierre" && computerChoice === "ciseau") ||
        (humanChoice === "papier" && computerChoice === "pierre") ||
        (humanChoice === "ciseau" && computerChoice === "papier")) {
        
        console.log(`Vous gagnez ! ${capitalizeFirst(humanChoice)} bat ${computerChoice}.`);
        return "human";
    }

    // Cas où l'ordinateur gagne
    else {
        console.log(`Vous perdez ! ${capitalizeFirst(computerChoice)} bat ${humanChoice}.`);
        return "computer";
    }
}

// Jouer une manche
const humanChoice = getHumanChoice();
const computerChoice = getComputerChoice();
console.log(`Choix de l'ordinateur : ${computerChoice}`);

const result = playRound(humanChoice, computerChoice);
console.log(`Résultat : ${result}`);