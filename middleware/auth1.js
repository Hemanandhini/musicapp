var User = require("../models/User.js");
var passport = require("passport");
var passportJWT = require("passport-jwt");
var config = require("../config/config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;

var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function() {
  var strategy = new Strategy(params, async function(payload, done) {
    try{
      const user = await User.findById( payload.id);


      if (payload.expire <= Date.now()) {
       
        return done(new Error('TokenExpired'), null);
   

      } else{
        return done(null, user);

       
      }
    }catch(err){
   
      return done(new Error("UserNotFound"), null);
    }
    // User.findById(payload.id, function(err, user) {
    //   if (err) {
    //     return done(new Error("UserNotFound"), null);
    //   } else if (payload.expire <= Date.now()) {
    //     return done(new Error("TokenExpired"), null);
    //   } else{
    //     return done(null, user);
    //   }
    // });
  });

  passport.use(strategy);

  return { initialize: function() { return passport.initialize() }};
};