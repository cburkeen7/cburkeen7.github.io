const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: String,
  salt: String
});

// Set password (hash + salt)
UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

// Validate password
UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

//Generate JWT
UserSchema.methods.generateJWT = function() {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET || 'secretkey', 
    { expiresIn: '1h' }
  );
};

module.exports = mongoose.model('User', UserSchema);