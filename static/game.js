document.querySelector("#rollButton").addEventListener("click", () => {
    dices = document.getElementsByClassName('dice');
    fetch("/roll/" + dices.length).then((response) => response.json()).then((data) => {
        for(var i = 0; i < dices.length; i++) {
            dices[i].textContent = data.values[i];
        }
        document.querySelector("#rollButton").disabled = data.disableBtn;
    })
    event.preventDefault();
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
    event.preventDefault();
}