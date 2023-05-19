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

/* obtener lista de markdown disponibles */
app.get('/api/files', (req, res) => {
    fs.readdir('files', (err, files) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json({ files });
        }
      });
});

/* obtener contenido de markdown específico */
app.get('/api/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join('files', filename);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ content: data });
      }
    });
});

/*  crear nuevo markdown  */
app.post('/api/files', (req, res) => {
    const filename = req.body.filename;
    const content = req.body.content;
    const filePath = path.join('files', filename);
  
    fs.writeFile(filePath, content, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'File created successfully' });
      }
    });
});

// app.listen
app.listen(port, () => {
    console.log(`Server corriendo en el port ${port}`);
});

