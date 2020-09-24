const express = require('express'),
    app = express(),
    passport = require('passport'),
    flash = require('express-flash'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    postsRoutes = require('./routes/index'),
    usersRouts = require('./routes/users'),
    blogRoutes = require('./routes/blog')
let path = require('path')
require('./passport-config')(passport);

// npm start app.js

require("dotenv").config({ path: ".env" })


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))


// EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
;
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"))
app.use(express.json())


app.use(passport.initialize());
app.use(flash());
app.use(session({
    secret: "Thisissecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated(); //see navbar if(login)
    res.locals.user = req.user;
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash('error')
    next()
})

app.use('/', postsRoutes)
app.use('/users', usersRouts)
app.use('/blog', blogRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404)
    res.render('error')
    // next(createError(404))
})

const port = process.env.PORT || 8000;


app.listen(port, () => console.log(`server is running on PORT ${port}`))

module.exports = app;