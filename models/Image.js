const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImageSchema = new Schema({
  trailer_id: {
    type: String,
    required: true,
  },
  fieldname: {
    type: String,
    required: true,
  },
  originalname: {
    type: String,
    required: true,
  },
  encoding: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

module.exports = Image = mongoose.model('image', ImageSchema);
