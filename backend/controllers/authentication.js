const User = require('../models/user');
const passport = require('passport');
require('../config/passport'); // if you’re using passport for login

// REGISTER
const register = async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'No data provided' });

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: `Email ${email} is already registered` });
    }

    // Create user
    const user = new User({ name, email });
    user.setPassword(password);
    const savedUser = await user.save();

    const token = savedUser.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error registering user:', err);
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    if (!user.validatePassword(password))
      return res.status(401).json({ message: 'Invalid email or password' });

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = { register, login };