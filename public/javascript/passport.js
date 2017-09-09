var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require("../../models/")["User"];

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "314073474351-7i2clkojeq49c8ce4bcakhho4e92smr4.apps.googleusercontent.com",
    clientSecret: "IEChHXIBLXl2CN9CAUCuO3a-",
    callbackURL: "http://localhost:8080/"
  },
  function(accessToken, refreshToken, profile, done) {
  		console.log("profile", profile, accessToken, refreshToken);
	    User.findOrCreate({where: {googleId: profile.id }}).then(function(user){
	    	if (!user) {
	    		User.create({email: profile.emails[0].value, refreshToken: refreshToken, accessToken: accessToken, googleId: profile.id, name: profile.displayName, role: 'base', profilePicUrl: profile.photos[0].value })
		        .then(function(user) {
		          console.log(user);
		          done(null, user);
		        }).catch(function(err) {
		          console.log('err', err);
		          done(err, false);
		        });
	    	} else {
	    		done(null, user);
	    	}
	    });
  	}
));