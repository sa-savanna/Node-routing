const LocalStrategy = require('passport-local').Strategy; // import passport-local module
const bcrypt = require('bcrypt')
const User = require('./models/user') // import mongoose user schema
const passport = require('passport'); // import passport module
/*
1- passport  // npm install passport
2- import user model mongoose schema
3- npm install passport-local
4- npm install express-session
5- npm install flash-session
*/

passport.use(new LocalStrategy({ usernameField: "name", passwordField: 'password' },
    function (name, password, done) {

        User.findOne({ name: name }, async function (err, user) {

            if (err)  return done(err); 
            if (!user) {
                return done(null, false, { message: 'No user with that name' })
            }
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect' })
            }
        })
    }
));

//Save the user.id to the session
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

module.exports = passport