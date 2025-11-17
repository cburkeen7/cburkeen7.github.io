
// this is the animal class used to create temporary data for dogs and monkeys 
class Animal {
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