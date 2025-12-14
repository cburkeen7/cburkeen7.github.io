const mongoose = require('./db');  // your db connection
const Animal = require('./animal');
const fs = require('fs');
const path = require('path');

// Correct path to the JSON file
const animalsData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'animals.json'), 'utf8'));

const seedDB = async () => {
    try {
        for (const animal of animalsData) {
            // Check if this animal already exists
            const exists = await Animal.findOne({ name: animal.name, species: animal.species });
            if (!exists) {
                await Animal.create(animal);
                console.log(`Added: ${animal.name}`);
            } else {
                console.log(`Skipped (already exists): ${animal.name}`);
            }
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

seedDB();