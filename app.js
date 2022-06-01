const express = require('express');
const mongoose = require('mongoose');

// Ajout du model
const Thing = require('./models/Thing');

// Accès au path du serveur pour envoyer l'image au bon endroit
const path = require('path');


const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation des routers
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Test connection mongoDB
mongoose.connect('mongodb+srv://audrey-diez:HVj6eq52GLnpdu.@p6-cours.sbyno.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e,'Connexion à MongoDB échouée !')); 



/* app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
}); */


module.exports = app;