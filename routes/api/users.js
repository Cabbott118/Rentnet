const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// Item Model
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register New User
// @access Public
router.post('/', (req, res) => {
    // Destructure what is sent back and pull out 
    //       v      v        v 
    const { first_name, last_name, email, password } = req.body;
    // Simple Validation
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ msg: 'Please complete all fields' })
    }

    // Check for existing user
    // Use Mongoose findOne Method and pass in email and check against existing
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400)
                .json({ msg: `Account already exists for ${email}` });
        
            const newUser = new User({
                first_name,
                last_name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    // Hash password
                    newUser.password = hash;
                    // After hash is complete, save newUser object
                    newUser.save()
                        .then(user => {
                            // Pass in token and assign it to user id
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
        });
});

module.exports = router;