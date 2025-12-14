const mongoose = require('mongoose');
require('../models/animal'); // Register Animal schema

const Animal = mongoose.model('animals');

// -----------------------------
//   GET All Animals
// -----------------------------
const animalList = async (req, res) => {
  try {
    const animals = await Animal.find({});
    if (!animals || animals.length === 0) {
      return res.status(404).json({ message: 'No animals found' });
    }
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// -----------------------------
//   GET Single Animal by ID
// -----------------------------
const animalFindById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.animalId);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// -----------------------------
//   POST Create New Animal
// -----------------------------
const animalCreate = async (req, res) => {
  try {
    const animal = await Animal.create({
      name: req.body.name,
      species: req.body.species,
      gender: req.body.gender,
      age: req.body.age,
      weight: req.body.weight,
      trainingStatus: req.body.trainingStatus,
      reserved: req.body.reserved,
      inServiceCountry: req.body.inServiceCountry,
      image: req.body.image
    });
    res.status(201).json(animal);
  } catch (err) {
    res.status(400).json({ message: 'Error creating animal', error: err });
  }
};

// -----------------------------
//   PUT Update Animal
// -----------------------------
const animalUpdate = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.animalId,
      {
        name: req.body.name,
        species: req.body.species,
        gender: req.body.gender,
        age: req.body.age,
        weight: req.body.weight,
        trainingStatus: req.body.trainingStatus,
        reserved: req.body.reserved,
        inServiceCountry: req.body.inServiceCountry,
        image: req.body.image
      },
      { new: true }
    );
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ message: 'Error updating animal', error: err });
  }
};

const animalDelete = async (req, res) => {
  try {
    const { animalId } = req.params;


    if (!mongoose.Types.ObjectId.isValid(animalId)) {
      return res.status(400).json({ message: 'Invalid animal ID' });
    }

    const animal = await Animal.findByIdAndDelete(animalId);

    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }

    res.status(200).json({
      message: 'Animal deleted successfully',
      id: animalId
    });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Server error deleting animal' });
  }
};
module.exports = {
  animalList,
  animalFindById,
  animalCreate,
  animalUpdate,
  animalDelete
};