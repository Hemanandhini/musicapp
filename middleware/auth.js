const passport = require("passport"); 
const User = require("../models/User")

// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

var passportJWT = require("passport-jwt");
var config = require("../config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;


var params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  };
  
// passport.use(User.createStrategy()); 

// passport.use(new LocalStrategy(User.authenticate())); 



    var strategy = new Strategy(params, function(payload, done) {
      User.findById(payload.id, function(err, user) {
        if (err) {
          return done(new Error("UserNotFound"), null);
        } else if (payload.expire <= Date.now()) {
          return done(new Error("TokenExpired"), null);
        } else{
          return done(null, user);
        }
      });
    });
  
    passport.use(strategy);
  
    // return { initialize: function() { return passport.initialize() }};
// passport.use(new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username });
//       if (!user) return done(null, false, { message: 'Incorrect username.' });
  
//       const isValidPassword = await bcrypt.compare(password, user.password);
//       if (!isValidPassword) return done(null, false, { message: 'Incorrect password.' });
  
//       return done(null, user);
//     } catch (error) {
//       return done(error);
//     }
//   }));
  

// Serializing and deserializing 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

module.exports = passport;