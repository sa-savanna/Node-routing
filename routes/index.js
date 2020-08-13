const express = require('express'),
    router = express.Router(),
    Ice = require('../models/posts'),
    User = require('../models/user'),
    passport = require('passport'),
    checkAuth = require('../middlewares/checkAuthentication'),
    checkNotAuth = require('../middlewares/checkNotAuth')
require('../passport-config')



router.get('/login', checkNotAuth, (req, res) => {
    res.render('auth/login', { title: 'IceCream Blog' });
});

router.get('/logout', checkAuth, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/profile/:id', checkAuth, (req, res) => {
    res.render('profile');
})

router.get('/dashboard/:id', checkAuth, (req, res) => {
    res.render('posts/dashboard');
})

router.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))



router.get('/signup', checkNotAuth, (req, res) => {
    res.render('auth/signup', { title: 'IceCream Blog' });
});



router.get('/secret', function (req, res) {
    User.find({}, (err, list) => {
        if (err) {
            console.log(err);
        } else {
            res.render('secret', { users: list })
        }
    })
});


// get data from DB called Icecream> ices
router.get('/blog', (req, res) => {
    Ice.find({}, (err, list) => {
        if (err) {
            console.log(err);
        } else {
            res.render('blog', { ices: list, title: 'IceCream Blog' })
        }
    })
});


router.post('/blog/new', async (req, res) => {
    console.log(req.body)
    try {
        const ice = new Ice(req.body)
        await ice.save()
        res.redirect('/blog')
    } catch (error) {
        res.status(500).send(error);
    }

})


router.get('/blog/new', (req, res) => {
    res.render('add', { title: 'IceCream Blog' })
});



router.get('/blog/:id', async (req, res) => {
    const ice = await Ice.findById(req.params.id)
    if (ice == null) redirect('/blog')
    res.render('show', { ice: ice, title: 'IceCream Blog' })

});

router.get('/blog/:id/edit', (req, res) => {
    Ice.findById(req.params.id, (err, foundIcecream) => {
        if (err) {
            res.redirect('/blog')
        } else {
            res.render('edit', { ices: foundIcecream, title: 'IceCream Blog' })
        }
    })
});

//Update

router.put('/blog/:id', async (req, res) => {
    try {
        let ice = new Ice.findById(req.params.id).exec();
        // console.log(req.body)
        ice.update(req.params.id, req.body);
        await ice.save();
        res.redirect('/blog')
    }
    catch (error) {
        res.status(500).send(error);
    }
})


//Delete
router.delete('/blog/:id', async (req, res) => {
    await Ice.findByIdAndDelete(req.params.id)
    res.redirect('/blog')
})





module.exports = router;
