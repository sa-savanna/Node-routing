const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);