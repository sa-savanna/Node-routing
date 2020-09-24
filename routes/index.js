const express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    checkAuth = require('../middlewares/checkAuthentication'),
    checkNotAuth = require('../middlewares/checkNotAuth')


router.get('/', checkNotAuth, (req, res) => {
    res.render('index', { title: 'IceCream Blog' });
});


router.get('/dashboard/:id', checkAuth, async (req, res) => {
    await User.find(req.params.id)
    res.render('posts/dashboard', { title: 'IceCream Blog' });
})




module.exports = router;
