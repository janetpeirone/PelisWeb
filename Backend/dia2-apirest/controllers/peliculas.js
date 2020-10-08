/*const express = require('express');
const funciones = require('../funciones/funciones');
const app = express();

// Endpoint para obtener peliculas
app.get('/peliculas', function (req, res) {
    res.send(funciones.obtenerPeliculas());
});

  // Endpoint para obtener informacion de una pelicula en especifico
app.get('/pelicula/:id', function (req, res) {
    res.send("GET de informacion de la pelicula de id: " + req.params.id);
});
  // Endpoint para crear una pelicula
app.post('/pelicula', function (req, res) {
    res.send(req.body);
});
  // Endpoint para modificar informacion de una pelicula
app.put('/pelicula/:id', function (req, res) {
    let respuesta = {
        id: req.params.id,
        body: req.body,
    };
    res.send(respuesta);
});
// Endpoint para borrar una pelicula
app.delete('/pelicula/:id', function (req, res) {
    res.send("DELETE de informacion de la pelicula de id: " + req.params.id);
});

module.exports = app; */

const express = require('express');
const app = express();
const Pelicula = require('../models/peli');

app.get('/peliculas', function (req, res) {
  Pelicula.find((err, data) => {
    if (err) {
      return res.status(400).json({
        status: 'ERROR',
        mensaje: err,
      });
    }
    res.json({
      status: 'OK',
      data: data,
    });
  });
});

app.get('/peliculas/:id', function (req, res) {
  var id = req.params.id;
  Pelicula.findOne({ imdbID: id }, (err, data) => {
    if (err) {
      return res.status(400).json({
        status: 'ERROR',
        mensaje: err,
      });
    }
    res.json({
      status: 'OK',
      data: data,
    });
  });
});

app.post('/peliculas', function (req, res) {
  let body = req.body;
  let pelicula = new Pelicula({
    Titulo: body.Titulo,
    Genero: body.Genero,
    Descripcion: body.Descripcion,
    Calificacion: body.Calificacion,
    imdbID: body.imdbID,
  });

  pelicula.save((err, peliDB) => {
    if (err) {
      return res.status(400).json({
        status: 'ERROR',
        mensaje: err,
      });
    }

    res.json({
      status: 'OK',
      pelicula: peliDB,
    });
  });
});

app.put('/peliculas/:id', function (req, res) {
  var id = req.params.id;
  var toUpdate = req.body;

  Pelicula.findOneAndUpdate(
    { imdbID: id },
    toUpdate,
    { new: true },
    (err, peliDB) => {
      if (err) {
        return res.status(400).json({
          status: 'ERROR',
          mensaje: err,
        });
      }
      res.json({
        status: 'OK',
        pelicula: peliDB,
      });
    }
  );
});

app.delete('/peliculas/:id', function (req, res) {
  var id = req.params.id;
  Pelicula.findOneAndRemove({ imdbID: id }, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'ERROR',
        mensaje: err,
      });
    }
    res.status(204).json({
      status: 'OK',
    });
  });
});

module.exports = app;

