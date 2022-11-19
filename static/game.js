function unfreezeDices() {
    for(var i = 1; i < 6; i++) {
        dice = document.getElementById('dice' + i);
        dice.className = "dice";
    }
}

function endAttempt(score) {
    alert('Vous avez terminé votre essai avec un score de : ' + score);
    unfreezeDices();
    document.querySelector("#rollButton").click();
    document.querySelector("#rollButton").disabled = false;
}

document.querySelector("#rollButton").addEventListener("click", () => {
    dices = document.getElementsByClassName('dice');
    fetch("/roll/" + dices.length).then((response) => response.json()).then((data) => {
        for(var i = 0; i < dices.length; i++) {
            dices[i].textContent = data.values[i];
        }
        document.querySelector("#rollButton").disabled = data.disableBtn;
        if(data.endAttempt) {
            document.querySelector("#finishButton").click();
        }
    })
})

document.querySelector("#finishButton").addEventListener("click", () => {
    attemptNb = document.querySelector('#attemptNb');
    
    values = [];
    dices = document.getElementsByClassName('frozen-dice');
    for(var i = 0; i < dices.length; i++) {
        values.push(dices[i].textContent);
    }

    score = parseInt(document.querySelector("#scoreNb").textContent);
    fetch("/finish?attemptNb=" + attemptNb.textContent + "&values=" + values + "&lastScore=" + score)
        .then((response) => response.json())
        .then((data) => {
            attemptNb.textContent = data.attemptNb;
            document.querySelector("#scoreNb").textContent = data.theEnd ? 0 : data.score;

            endAttempt(data.score);
    });
})

function freezeDice(id) {
    fetch("/freeze?id=" + id.id + "&class=" + id.className +"&value=" + id.textContent)
        .then((response) => response.json())
        .then((data) => {
            if(data.freeze == true) {
                dice = document.querySelector('#' + data.diceID);
                dice.className = "frozen-dice";
                document.querySelector("#rollButton").disabled = false;
            }
        });
}