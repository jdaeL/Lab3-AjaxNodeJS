// modulos
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// specs - confi
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));


// rutas
app.get('/api/files', (req, res) => {

});

app.get('/api/files/:filename', (req, res) => {

});

app.post('/api/files', (req, res) => {

});

// app.listen
app.listen(port, () => {
    console.log(`Server corriendo en el port ${port}`);
});

