var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var User = require("../../models/")["User"];

passport.serializeUser(function(user, done) {
  // console.log('serializeUser', user);
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  // console.log('deserializeUser');
  User.findById(user.id).then(function(user) {
    done(null, user);
  });
});
// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "314073474351-7i2clkojeq49c8ce4bcakhho4e92smr4.apps.googleusercontent.com",
    clientSecret: "IEChHXIBLXl2CN9CAUCuO3a-",
    callbackURL: "http://localhost:8080/auth/google/callback/",
    passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log("outsideProcess");
  		/*process.nextTick(function() {
  			console.log("insideProcess");
  			return done(null, profile);
  		});*/
  }
));