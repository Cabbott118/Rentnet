const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

var bodyParser = require('body-parser');

// Trailer Model
const Trailer = require('../../models/Trailer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// @route  GET api/items
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
  // Get items and sort
  Trailer.find()
    .sort({ trailer_type: 1 })
    .then((items) => res.json(items));
});

// @route  GET api/items
// @desc   Get Filtered Items
// @access Public
router.get('/:trailer_city', (req, res) => {
  // Get items and sort
  Trailer.find(req.params)
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  GET api/items
// @desc   Get Filtered Items
// @access Public
router.get('/match/:_id', (req, res) => {
  // Get items and sort
  Trailer.find(req.params)
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route  POST api/items
// @desc   Create An Item
// @access Private
router.post('/', auth, (req, res) => {
  const newTrailer = new Trailer({
    brand: req.body.brand,
    trailer_type: req.body.trailer_type,
    deck_dimensions: req.body.deck_dimensions,
    weight: req.body.weight,
    price: req.body.price,
    owner_id: req.body.owner_id,
    trailer_address: req.body.trailer_address,
    trailer_city: req.body.trailer_city,
    trailer_zip: req.body.trailer_zip,
    trailer_state: req.body.trailer_state,
    currently_available: req.body.currently_available,
    date: req.body.date,
  });
  newTrailer.save().then((item) => res.json(item));
});

// @route  PUT api/items
// @desc   Edit An Item
// @access Private
router.put('/:_id', auth, (req, res) => {
  //this returns a promise
  Trailer.findByIdAndUpdate(
    req.params._id,
    req.body,
    { new: false, useFindAndModify: false },
    () => {}
  )
    .then((updatedItem) => {
      res.json(updatedItem); //we capture this via our promise-handler on the action
    })
    .catch((error) => {
      return res.status(400).json({ couldnotupdate: 'could not update item' });
    });
});

// @route  DELETE api/items
// @desc   Delete An Item
// @access Private
router.delete('/:id', auth, (req, res) => {
  // Find item to delete by ID
  Trailer.findById(req.params.id)
    // Remove Item from DB
    .then((item) =>
      item
        .remove()
        // Send Success message if success || Not Found if failed
        .then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
