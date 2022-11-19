function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function play(nb) {
    var dices = [];
    
    for(let i = 0; i < nb; i++) {
        var value = rollDice();
        var dice = value;
        dices.push(dice);
    }

    return dices;
}

function freezeDice(dice) {
    return {diceID: dice.id, freeze: ((parseInt(dice.value) % 2 === 0) && dice.class === "dice")}
}

module.exports = {
    roll: rollDice,
    play: play,
    freeze: freezeDice,
}
