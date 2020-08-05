const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

var bodyParser = require('body-parser');

// Trailer Model
const Trailer = require('../../models/Trailer');
const Image = require('../../models/Image');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// @route  GET api/trailers
// @desc   Get All Items
// @access Public
router.get('/', (req, res) => {
  // Get trailers and sort
  Trailer.find()
    .sort({ trailer_type: 1 })
    .then((trailers) => res.json(trailers));
});

// @route  GET api/trailers
// @desc   Get Filtered Items
// @access Public
router.get('/:trailer_city', (req, res) => {
  // Get trailers and sort
  Trailer.find(req.params)
    .sort({ date: -1 })
    .then((trailers) => res.json(trailers));
});

// @route  GET api/trailers
// @desc   Get Filtered Items
// @access Public
router.get('/match/:_id', (req, res) => {
  // Get trailers and sort
  Trailer.find(req.params)
    .sort({ date: -1 })
    .then((trailers) => res.json(trailers));
});

// @route  POST api/trailers
// @desc   Create An Item
// @access Private
router.post('/', auth, (req, res) => {
  let imageName = req.body.image_original;
  Image.find({ originalname: imageName }).then((image) => {
    const newTrailer = new Trailer({
      img_path: image[0].path,
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
    newTrailer.save().then((trailer) => res.json(trailer));
  });
});

// @route  PUT api/trailers
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
    .then((updatedTrailer) => {
      res.json(updatedTrailer); //we capture this via our promise-handler on the action
    })
    .catch((error) => {
      return res.status(400).json({ couldnotupdate: 'could not update item' });
    });
});

// @route  DELETE api/trailers
// @desc   Delete An Item
// @access Private
router.delete('/:id', auth, (req, res) => {
  // Find trailers to delete by ID
  Trailer.findById(req.params.id)
    // Remove Item from DB
    .then((trailer) =>
      trailer
        .remove()
        // Send Success message if success || Not Found if failed
        .then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
