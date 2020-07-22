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
  user_address: {
    type: String,
    required: false,
  },
  user_city: {
    type: String,
    required: false,
  },
  user_zip: {
    type: String,
    required: false,
  },
  user_state: {
    type: String,
    required: false,
  },
  user_phone: {
    type: String,
    required: false,
  },
  user_bank_name: {
    type: String,
    required: false,
  },
  user_account_number: {
    type: String,
    required: false,
  },
  user_routing_number: {
    type: String,
    required: false,
  },
  user_agreed: {
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
