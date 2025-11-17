const Animal = require('../models/animal');

// Temporary in-memory data
let animals = [
  new Animal(1, 'Rex', 'Dog', 'Male', 4, '25kg', 'Intake', false, 'USA'),
  new Animal(2, 'Luna', 'Monkey', 'Female', 6, '10kg', 'In Service', true, 'Canada')
];

// GET all animals
const getAnimals = (req, res) => res.json(animals);

// POST add new animal
// this function adds a new animal to the array of animals. 
const addAnimal = (req, res) => {
  const newAnimal = new Animal(
    animals.length + 1,
    req.body.name,
    req.body.species,
    req.body.gender,
    req.body.age,
    req.body.weight,
    req.body.trainingStatus,
    req.body.reserved,
    req.body.inServiceCountry
  );
  animals.push(newAnimal);  // add the new animal to the array
  res.status(201).json(newAnimal); 
};

module.exports = { getAnimals, addAnimal };