const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let peliculasSchema = new Schema({
  Titulo: String,
  Genero: String,
  Descripcion: String,
  Calificacion: String,
  imdbID: String,
});

module.exports = mongoose.model('Pelicula', peliculasSchema);