const express = require('express');
const router = express.Router();
const fs = require('fs');

const bodyParser = require('body-parser');
const { json } = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Multer Middleware
const upload = require('../../middleware/upload');

// Image Model
const Image = require('../../models/Image');

// @route  POST api/images
// @desc   Create An Image
// @access Public (Hidden)
router.post('/', upload, (req, res) => {
  // TODO: Get trailer_id from req.body
  const newImage = new Image({
    fieldname: req.file.fieldname,
    originalname: req.file.originalname,
    encoding: req.file.encoding,
    mimetype: req.file.mimetype,
    destination: req.file.destination,
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
  });
  newImage.save().then((image) => res.json(image));
});

// @route  GET api/images
// @desc   Find one image
// @access Public (Hidden)
router.get('/:id', (req, res) => {
  console.log(req.params);
  Image.findById(req.params.id)
    .then((item) => {
      res.json(item);
      const filepath = item.path;
      console.log(filepath);
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route  DELETE api/images
// @desc   Delete An Image
// @access Public (Hidden)
router.delete('/:id', (req, res) => {
  // Find item to delete by ID
  Image.findById(req.params.id)
    // Remove Item from DB
    .then((image) =>
      image
        .remove()
        // Send Success message if success || Not Found if failed
        .then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
