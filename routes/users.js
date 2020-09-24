const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    bcrypt = require('bcrypt'),
    checkAuth = require('../middlewares/checkAuthentication'),
    checkNotAuth = require('../middlewares/checkNotAuth'),
    passport = require('passport')
require('../passport-config')(passport);


/* GET users listing. */
/* /users */

router.get('', async (req, res) => {
    const users = await User.find().sort({
        createAt: 'desc'
    })
    res.render('users', { title: 'IceCream Blog', users: users });
});


//Delete
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/users')
})

//=======register page
router.get('/signup', checkNotAuth, (req, res) => {
    res.render('auth/signup', { title: 'IceCream Blog' });
});


router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            console.log(user)
            user.save()
                .then(result => {
                    // res.status(201).json({
                    //     message: 'User created',
                    //     result: result
                    // })
                    req.flash('success_msg', "You are registered and can log in")
                    res.redirect('/users/login')
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        message: "Invalid credentials or user already exist"
                    })
                })
        })
});


//=======login page
router.get('/login', checkNotAuth, (req, res) => {
    res.render('auth/login', { title: 'IceCream Blog' });
});

router.post('/login', checkNotAuth, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})


router.get('/logout', (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out")
    res.redirect('/users/login');
});




module.exports = router;
