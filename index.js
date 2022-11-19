const path = require('path')

const express = require('express')
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

const discus = require('./back/discus');

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})

// app.get('/chaine/:prenom', (req, res) => {
//     console.log(req.params)
//     res.end()
// })

// app.get(encodeURI('/prénom'), (req, res) => {
//     console.log(req.query)
//     prenom = req.query["valeur"]
//     chiffre = numerologie.chiffre(prenom)

//     res.json({
//         prénom: prenom,
//         chiffre: chiffre,
//     })
// })

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);