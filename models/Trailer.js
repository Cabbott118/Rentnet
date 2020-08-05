const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TrailerSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  trailer_type: {
    type: String,
    required: true,
  },
  deck_dimensions: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  owner_id: {
    type: String,
    required: true,
  },
  trailer_address: {
    type: String,
    required: true,
  },
  trailer_city: {
    type: String,
    required: true,
  },
  trailer_zip: {
    type: String,
    required: true,
  },
  trailer_state: {
    type: String,
    required: true,
  },
  currently_available: {
    type: Boolean,
    default: true,
    required: true,
  },
  currently_rented_by: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Trailer = mongoose.model('trailer', TrailerSchema);
