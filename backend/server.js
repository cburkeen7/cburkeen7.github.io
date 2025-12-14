const express = require('express');
const app = express();
const cors = require('cors');
require('./models/db'); // Database connection
const { register, login } = require('./controllers/authentication');

app.use(cors());
app.use(express.json());

app.post('/rescueAnimal/register', register);
app.post('/rescueAnimal/login', login);

app.use('/rescueAnimal', require('./routes/rescueAnimal'));

app.listen(3000, () => console.log('Server running on port 3000'));