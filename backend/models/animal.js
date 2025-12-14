
// this is the animal class used to create temporary data for dogs and monkeys 
/*class Animal {
  constructor(id, name, species, gender, age, weight, trainingStatus, reserved, inServiceCountry) {
    this.id = id;
    this.name = name;
    this.species = species;
    this.gender = gender;
    this.age = age;
    this.weight = weight;
    this.trainingStatus = trainingStatus;
    this.reserved = reserved;
    this.inServiceCountry = inServiceCountry;
  }
}
module.exports = Animal;
*/

const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  
    name: { type: String, required: true, index: true },
    species: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: String, required: true },
    trainingStatus: { type: String, required: true },
    reserved: { type: Boolean, required: true },
    inServiceCountry: { type: String, required: true },
    image: { type: String, required: true }
});

const Animal = mongoose.model('animals', animalSchema);

module.exports = Animal;