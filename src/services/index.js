const express = require('express');
const bodyParser = require('body-parser');
const engines = require('consolidate');

const app = express();

app.engine('ejs', engines.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.send("Works!");
});

app.listen(3000, () => {
    console.log('Server is running');
});