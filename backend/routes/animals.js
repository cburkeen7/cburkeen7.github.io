const express = require('express');
const router = express.Router();
const { getAnimals, addAnimal } = require('../controllers/animalController');

router.get('/', getAnimals);  // reads all animals and displays them 
router.post('/', addAnimal);  // adds a new animal to the array

module.exports = router;