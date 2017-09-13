var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Sequelize = require("sequelize"); 
var User = require("../models/")["User"];


module.exports = function(app){

    // cookieParser/expressSession middleware needed to feed passport correctly
    var sequelizeSession = new Sequelize(
        "spirit_animals_db",
        "root",
        "Password123", {
            "dialect": "mysql"
        })
    app.use(cookieParser());
    app.use(expressSession({ secret: process.env.SESSION_SECRET || 'secret',
        store: new SequelizeStore({
            db: sequelizeSession
        }),
        resave: false,
        saveUninitialized: false
    }));

    // passport middleware needs to be placed after all parsing to work correctly
    app.use(passport.initialize());
    app.use(passport.session());

   // passport.use(User.createStrategy());
    passport.use(new LocalStrategy(
      function(username, password, done) {
        console.log("turtle");
        console.log("local" + username, password);
       /* User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });*/
       }
    ));

    app.post("/login",
        passport.authenticate("local", { 
            successRedirect: "/animalHome",
            failureRedirect: "/"
        }));

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());


};