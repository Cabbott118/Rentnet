const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Authenticate User
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;
    // Simple Validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please complete all fields' })
    }

    // Check for existing user
    // Use Mongoose findOne Method and pass in email and check against existing
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400)
                .json({ msg: `Account does not exist for ${email}` });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Incorrect email or password' });
            
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email
                                }
                            });
                        }
                    );
                });
        });
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

// @route  PUT api/auth/:id
// @desc   Edit A User
// @access Private
router.put("/:_id", auth, (req, res) => {
    //this returns a promise
    User.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: false, useFindAndModify: false },
      () => {}
    )
    .then((updatedUser) => {
       res.json(updatedUser) //we capture this via our promise-handler on the action
    })
    .catch((error) => {
       return res.status(400).json({ couldnotupdate: "could not update item"})
    })
});


module.exports = router;