const path = require('path')

const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const discus = require('./back/discus');

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

app.get('/roll/:unfrozen', (req, res) => {
    var unfrozenDices = parseInt(req.params.unfrozen);
    var dices = discus.roll(unfrozenDices);
    res.json({
        values: dices.dices,
        endAttempt: dices.endAttempt,
        disableBtn: dices.dices != [],
    });
})

app.get('/freeze', (req, res) => {
    var id = req.query.id;
    var mClass = req.query.class;
    var value = req.query.value;
    var respObject = discus.freeze({id: id, value: value, class: mClass});
    res.json(respObject);
})

app.get('/finish', (req, res) => {
    var respObj = discus.finish({attemptNb: req.query.attemptNb, values: req.query.values});
    res.json(respObj);
})

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("");

})

app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);