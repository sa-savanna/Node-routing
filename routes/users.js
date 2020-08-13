var express = require('express');
var router = express.Router();
const passport = require('passport')
require('../passport-config')
const User = require('../models/user'),
    bcrypt = require('bcrypt')


/* GET users listing. */
/* /users */

router.get('', async (req, res) => {
    const users = await User.find().sort({
        createAt: 'desc'
    })
    res.render('auth/users', { title: 'IceCream Blog', users: users });
});

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result => {
                    // res.status(201).json({
                    //     message: 'User created',
                    //     result: result
                    // })
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Invalid credentials or user already exist"
                    })
                })
        })
});
module.exports = router;
