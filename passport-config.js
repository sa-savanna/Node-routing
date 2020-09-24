const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user')

/*
1- passport  // npm install passport
2- import user model mongoose schema
3- npm install passport-local
4- npm install express-session
5- npm install flash-session
*/

module.exports = function(passport) {
    passport.use(
      new LocalStrategy({ usernameField: 'name' }, (name, password, done) => {
        // Match user
        User.findOne({
          name: name
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'That name is not registered' });
          }
  
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );
  
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  };