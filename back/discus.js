function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function play(nb) {
    var dices = [];
    var evenNumbers = 0;
    
    for(let i = 0; i < nb; i++) {
        var value = rollDice();
        var dice = value;
        dices.push(dice);

        if(dice % 2 === 0) {
            evenNumbers += 1;
        }
    }

    return {dices: dices, evenNb: evenNumbers};
}

function freezeDice(dice) {
    return {diceID: dice.id, freeze: ((parseInt(dice.value) % 2 === 0) && dice.class === "dice")}
}

function finishAttempt(queryObj) {
    nbAttempts = queryObj.attemptNb;
    frozenDices = queryObj.values;
    score = 0;
    for(value in frozenDices) {
        score += parseInt(value);
    }
    return {attemptNb: nbAttempts + 1, attemptScore: score, theEnd: nbAttempts > 3};
}

module.exports = {
    roll: play,
    freeze: freezeDice,
    finish: finishAttempt,
}
