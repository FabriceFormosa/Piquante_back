const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Methods to display directory
console.log("app.js __dirname:    ", __dirname);
console.log("app.js process.cwd() : ", process.cwd());
console.log("app.js ./ : ", path.resolve("./"));
console.log("app.js filename: ", __filename);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://zozo:WA6MBsxMhvrHmeYL@cluster0.afoop.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use('/images', express.static(path.resolve(__dirname, 'images')));

  console.log("path : " + path + "__dirname : " + __dirname);

  const userRoutes = require('./routes/user');
  app.use('/api/auth', userRoutes);

  const sauceRoutes = require('./routes/sauce');
  app.use('/api/sauces', sauceRoutes);

  app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

  module.exports = app;