function unfreezeDices() {
    for(var i = 1; i < 6; i++) {
        dice = document.getElementById('dice' + i);
        dice.className = "dice col-3";
        dice.textContent = "";
        dice.style.backgroundImage = "";
    }
}

function freezeDice(id) {
    fetch("/freeze?id=" + id.id + "&class=" + id.className +"&value=" + id.textContent)
        .then((response) => response.json())
        .then((data) => {
            if(data.freeze == true) {
                dice = document.querySelector('#' + data.diceID);
                dice.className = "frozen-dice col-3";
                setNewImage(dice, dice.textContent);
                document.querySelector("#rollButton").disabled = false;
            }
        });
}

function endAttempt(score, isTheEnd) {
    if(isTheEnd) {
        document.querySelector("#finalScore").textContent = score;
        document.querySelector('#endModalTrigger').click();
    } else {
        document.querySelector("#attemptScore").textContent = score;
        document.querySelector('#attemptModalTrigger').click();
    }

    unfreezeDices();
    document.querySelector("#rollButton").disabled = false;
}

function setNewImage(element, value) {
    basePath = (element.className === "dice col-3") ? "Dice/diceGreen" : "Dice/diceMagenta";
    imagePath = basePath + value + ".png";
    element.style.display = "block;";
    element.style.backgroundImage = "url('" + imagePath + "')";
}

document.querySelector("#rollButton").addEventListener("click", () => {
    dices = document.getElementsByClassName('dice');
    fetch("/roll/" + dices.length).then((response) => response.json()).then((data) => {
        for(var i = 0; i < dices.length; i++) {
            dices[i].textContent = data.values[i];
            setNewImage(dices[i], data.values[i]);
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
    fetch("/finish?attemptNb=" + attemptNb.textContent + "&values=" + values)
        .then((response) => response.json())
        .then((data) => {
            attemptNb.textContent = data.attemptNb;
            document.querySelector("#scoreNb").textContent = data.theEnd ? 0 : Math.max(score, data.score);

            endAttempt(data.score == null ? score : Math.max(score, data.score), data.theEnd);
    });
})

document.querySelector("#replay").addEventListener("click", () => {
    document.querySelector("#closeEndModal").click();
    document.querySelector("#rollButton").click();
})