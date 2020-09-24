const express = require('express');
const router = express.Router();
const Ice = require('../models/posts');
const checkAuth = require('../middlewares/checkAuthentication')
const checkNotAuth = require('../middlewares/checkNotAuth')


//-=========get BLOGS from DB called Icecream > ices

router.get('', (req, res) => {
    Ice.find({}, (err, list) => {
        if (err) {
            console.log(err);
        } else {
            res.render('blogs/blog', { ices: list, title: 'IceCream Blog' })
        }
    })
});


router.get('/new', (req, res) => {
    res.render('blogs/add', { title: 'IceCream Blog' })
});


router.post('/new/', async (req, res) => {
    console.log(req.body)
    try {
        const ice = new Ice(req.body)
        await ice.save()
        res.redirect('/blog')
    } catch (error) {
        res.status(500).send(error);
    }

})


router.get('/:id', async (req, res) => {
    const ice = await Ice.findById(req.params.id)
    if (ice == null) redirect('/blog')
    res.render('blogs/blogId', { ice: ice, title: 'IceCream Blog' })

});

router.get('/:id/edit', (req, res) => {
    Ice.findById(req.params.id, (err, foundIcecream) => {
        if (err) {
            res.redirect('/blog')
        } else {
            res.render('blogs/edit', { ices: foundIcecream, title: 'IceCream Blog' })
        }
    })
});

//Update

router.put('/:id/', async (req, res) => {
    try {
        let ice = new Ice.findById(req.params.id).exec();
        console.log(req.body)
        ice.update(req.params.id, req.body);
        await ice.save();
        res.redirect('/blog')
    }
    catch (error) {
        res.status(500).send(error);
        res.redirect('/blog')
    }
})


//Delete
router.delete('/:id', async (req, res) => {
    await Ice.findByIdAndDelete(req.params.id)
    res.redirect('/blog')
})


module.exports = router;