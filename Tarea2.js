const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

let noticias = [];

app.get('/noticias', (req, res) => {
  res.json(noticias);
});

app.post('/noticias', (req, res) => {
  const {titulo, descripcion} = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({message: 'Falta información para crear la noticia.'});
  }

  const noticia = {
    id: noticias.length + 1,
    titulo,
    descripcion
  };

  noticias.push(noticia);

  res.status(201).json(noticia);
});

app.put('/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const {titulo, descripcion} = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({message: 'Falta información para actualizar la noticia.'});
  }

  const noticia = noticias.find(noticia => noticia.id === id);

  if (!noticia) {
    return res.status(404).json({message: 'La noticia no existe.'});
  }

  noticia.titulo = titulo;
  noticia.descripcion = descripcion;

  res.json(noticia);
});

app.delete('/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = noticias.findIndex(noticia => noticia.id === id);

  if (index === -1) {
    return res.status(404).json({message: 'La noticia no existe.'});
  }

  noticias.splice(index, 1);

  res.status(204).send();
});

app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000.');
});
