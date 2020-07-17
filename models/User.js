const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: false,
  },
  userCity: {
    type: String,
    required: false,
  },
  userZip: {
    type: String,
    required: false,
  },
  userState: {
    type: String,
    required: false,
  },
  userPhone: {
    type: String,
    required: false,
  },
  userBankName: {
    type: String,
    required: false,
  },
  userAccountNumber: {
    type: String,
    required: false,
  },
  userRoutingNumber: {
    type: String,
    required: false,
  },
  userAgreed: {
    type: Boolean,
    default: false,
    required: false,
  },
  is_host: {
    type: Boolean,
    default: false,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
