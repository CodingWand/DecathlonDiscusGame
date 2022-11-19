fs = require('fs')

eval(fs.readFileSync("back/discus.js", {encoding:'utf8'}))

for(let i = 0; i < 10; i++) {
    console.log(rollDice())
}