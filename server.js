const fs = require('fs');
const path = require('path');
const express=require('express');
const bodyParser = require('body-parser');
const MarkdownIt = require('markdown-it');
const app = express();
const md = new Markdownit();

app.use(express.static('pub'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const privFolderPath = path.join(__dirname, 'priv');

app.listen(3000, () => {
  console.log("Escuchando en: http://localhost:3000");
});

// ruta de inicio
app.get('/', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// ruta para file list del directorio priv
app.get('priv', (req,res) => {
  fs.readdir(privFolderPath, (err, files) => {
    if(err) {
      console.error(err);
      res.json({success: false});
    }
    else {
      res.json({success: true});
    }
  })
});

// ruta para obtener contenido de un file markdown especifico
app.get('/priv/:filename', (req,res) => {
  let filename = req.params.filename;
  let filePath = path.json(privFolderPath, filename + '.md');
  fs.readFile(filePath, 'utf8', (err,data) => {
    if (err) {
      console.error(err);
      res.json({success: false});
    }
    else {
      let htmlText = md.render(data);
      res.json({success: true, htmlText: htmlText });

    }
  })



});


// ruta para guardar markdown
app.post('/', (req, res) => {
  console.log(req, body);
  let title = req.body.title;
  let content = req.body.content;

  let filepath = path.json.join(privateFolderPath, title + '.md');
  fs = fs.writeFile(filepath, content, 'utf-8', (err) => {
    if (err) {
      console.error(err);
      res.json({success: false});
    }
    else {
      let htmlText = md.render(content);
      res.json({success: true, htmlText: htmlText });

    }
  })
})