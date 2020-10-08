const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

app.use(require('./controllers/peliculas'))

mongoose.connect(
    'mongodb+srv://metcamp:metcamp@cluster0.nmubz.mongodb.net/metcamp',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log('Conección a la Base de datos ONLINE establecida');
      }
    }
  );

app.listen(3000, () => {
    console.log('Server running in port 3000');
});