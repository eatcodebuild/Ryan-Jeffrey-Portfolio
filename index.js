const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const port = process.env.PORT || 3000;

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



















app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
