const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.use(express.json()); 

// Middleware
// S'applique à toutes les routes
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;