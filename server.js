const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const MarkdownIt = require('markdown-it');
const app = express();
const md = new MarkdownIt();


app.use(express.static('pub')); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));


const privFolderPath = path.join(__dirname, 'priv'); 


app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000");
});


// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});


// Ruta para obtener el listado de archivos en la carpeta 'priv'
app.get('/priv', (req, res) => {
    fs.readdir(privFolderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            res.json({ success: true, files: files });
        }
    });
});


// Ruta para obtener el contenido de un archivo Markdown específico
app.get('/priv/:filename', (req, res) => {
    let filename = req.params.filename;
    let filePath = path.join(privFolderPath, filename + '.md');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            let htmlText = md.render(data); // Renderizar el contenido Markdown a HTML
            res.json({ success: true, htmlText: htmlText });
        }
    });
});


// Ruta para guardar un archivo Markdown
app.post('/', (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let content = req.body.content;


    let filePath = path.join(privFolderPath, title + '.md');
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.json({ success: false });
        } else {
            let htmlText = md.render(content); // Renderizar el contenido Markdown a HTML
            res.json({ success: true, htmlText: htmlText });
        }
    });
});