const express = require('express');
const router = express.Router();
const { getAnimals, addAnimal } = require('../controllers/animalController');

router.get('/', getAnimals);  // reads all animals and displays them 
router.post('/', addAnimal);  // adds a new animal to the array
router.put('/:id', async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(animal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update animal' });
  }
});
module.exports = router;