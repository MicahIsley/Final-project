var passport = require('passport');
var passportLocal = require('passport-local');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var Sequelize = require("sequelize"); 
var users = require("../models/")["User"];


module.exports = function(app){

// cookieParser/expressSession middleware needed to feed passport correctly
app.use(cookieParser());
app.use(expressSession({ secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

// passport middleware needs to be placed after all parsing to work correctly
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done){
    // teach passport how to authenticate users
    // add code to check username and password with DB here
    users.findAll({
        where: {
            username: username,
            password: password
        }
    }).then(function(result){
        if (username === result[0].username && password === result[0].password) {
            done(null, {
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                name: result[0].first_name+' '+result[0].last_name,
                image: result[0].image,
                photo: result[0].image,
                access: result[0].access_level
            });
            employeeID = result[0].id;
        } else{
            done(null, false, { message: 'Invalid Login.' });
        }
    }).catch(function (err) {
        done(null, false);
    });
}));

// teach passport how to serialize and deserialize users
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    users.findAll({
        where: {id: id}
    }).then(function(result){
        done(null, {
            id: result[0].id,
            name: result[0].first_name+' '+result[0].last_name,
            photo: result[0].image,
            access: result[0].access_level
        });
    })
});

};