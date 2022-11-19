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

    return {dices: dices, endAttempt: (evenNumbers === 0 || nb === 0)};
}

function freezeDice(dice) {
    return {diceID: dice.id, freeze: ((parseInt(dice.value) % 2 === 0) && dice.class === "dice")}
}

function finishAttempt(queryObj) {
    nbAttempts = parseInt(queryObj.attemptNb);
    frozenDices = queryObj.values.split(',');
    score = 0;
    for(let i = 0; i < frozenDices.length; i++) {
        value = frozenDices[i];
        score += parseInt(value);
    }
    isLastAttempt = (nbAttempts === 3);
    return {
        attemptNb: isLastAttempt ? 1 : nbAttempts + 1,
        score: score,
        theEnd: isLastAttempt
    };
}

module.exports = {
    roll: play,
    freeze: freezeDice,
    finish: finishAttempt,
}
