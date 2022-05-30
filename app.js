const express = require('express');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
// Ajout du model
const Thing = require('./models/Thing');

const app = express();
app.use('/api/stuff', stuffRoutes);

// Test connection mongoDB
mongoose.connect('mongodb+srv://audrey-diez:HVj6eq52GLnpdu.@p6-cours.sbyno.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((e) => console.log(e,'Connexion à MongoDB échouée !'));


// Middleware d'extraction du corps json pour POST
// Express prend toutes les requêtes qui ont comme Content-Type  application/json  et met à disposition leur  body  directement sur l'objet req
app.use(express.json());

// Middleware
// S'applique à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Req POST TEST
/* app.post('/api/stuff', (req, res, next) => {
    // Récupu le body json
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
    });
}); */

// Req POST MONGODB
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });


  //req GET
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });

  app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

  // UPDATE PUT
  app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  // DELETE
  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

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