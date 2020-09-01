const express = require('express'),
    app = express(),
    passport = require('passport'),
    flash = require('express-flash'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    PORT =  process.env.PORT || 8008,
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    postsRoutes = require('./routes/index'),
    usersRouts = require('./routes/users')
let path = require('path')

// npm start app.js

require("dotenv").config({path: ".env"})


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
.then(()=> console.log("MongoDB connected"))
.catch((err) => console.log(err))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(flash());
app.use(session({
    secret: "Thisissecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
}));
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated(); //navbar if(login)
    res.locals.user = req.user;
    next()
})



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* ______________________________________________________GET home page. */
app.get('/', (req, res) => {
    res.render('index', { title: 'IceCream Blog' });
});


app.use('/', postsRoutes)
app.use('/users', usersRouts)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404)
    res.render('error')
    // next(createError(404))
})

const host = process.env.HOST || '0.0.0.0';

app.listen(PORT, host, () => console.log(`server is running on PORT ${PORT}`))

module.exports = app;