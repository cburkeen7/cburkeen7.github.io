const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animals');

const app = express();
app.use(cors());
app.use(express.json());

// Base route
app.use('/api/animals', animalRoutes);

const PORT = 3000;  // this is the port where the server will listen 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));