const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication');
//const jwt = require('jsonwebtoken');

// Load controller functions
const {
  animalList,
  animalFindById,
  animalCreate,
  animalUpdate,
  animalDelete
} = require('../controllers/animalController');

// ---------------------
// JWT Middleware
// ---------------------


function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.auth = decoded;
    next();
  });
}

// ---------------------
// AUTH ROUTES (PUBLIC)
// ---------------------
router.post('/register', authController.register);
router.post('/login', authController.login);

// ---------------------
// ANIMAL ROUTES
// ---------------------

// Public read routes
router.get('/', animalList);
router.get('/:animalId', animalFindById);

// Protected write routes
router.post('/', animalCreate);
router.put('/:animalId', animalUpdate);
router.delete('/:animalId', animalDelete);

module.exports = router;