

function getHumanChoice() {
    let choice = prompt("Choisissez pierre, papier ou ciseau :");
    while (choice !== "pierre" && choice !== "papier" && choice !== "ciseau") {
        choice = prompt("Choix invalide. Choisissez pierre, papier ou ciseau :");
    }
    return choice;
}

const humanChoice = getHumanChoice();
console.log(humanChoice);

