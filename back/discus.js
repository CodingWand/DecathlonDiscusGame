function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function play() {
    var dices = document.getElementsByClassName("dice");
    for(let i = 0; i < dices.length; i++) {
        dice = dices[i];
        var value = rollDice();
        dice.textContent = value;
    }
}

