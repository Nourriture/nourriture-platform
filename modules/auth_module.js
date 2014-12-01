/**
 * Created by niels on 12/1/14.
 *
 * Module for handling authentication and authorization
 */

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt");
var restify = require("restify");

var SALT_WORK_FACTOR = 10;

module.exports = function (server, models) {

    // BCrypt middleware for User model (Ensures password is always hashed before being saved)
    models.User.schema.pre('save', function(next) {
        var user = this;
        // Skip if password not modified
        if(!user.isModified('password')) return next();
        // Hash password using BCrypt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    // Use bcrypt to compare passwords
    var comparePassword = function(user, candidatePassword, callback) {
        bcrypt.compare(candidatePassword, user.password, function(err, isMatch) {
            if(err) return callback(err);
            callback(null, isMatch);
        });
    };

    // Session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        models.User.findById(id, done);
    });

    // Local authentication strategy
    passport.use(new LocalStrategy(function(username, password, done) {
        // TODO: Support e-mail login as well (Simply don't allow @-sign in usernames and choose lookup technique based on its presence)
        models.User.findOne({ username: username }, function(err, user) {
            // (Unexpected) Failed to lookup user
            if (err) { return done(err); }

            // User not found
            if (!user) {
                return done(null, false, { message: 'Unknown user ' + username });
            }

            // Validate password
            comparePassword(user, password, function(err, isMatch) {
                // (Unexpected) Failed to validate password
                if (err) return done(err);
                if(isMatch) {
                    // Success!
                    return done(null, user);
                } else {
                    // Invalid password
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));

    server.use(passport.initialize());

    server.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (err) {
                return next(new restify.InternalError("Failed to login due to an unexpected error"));
            }
            if (!user) {
                return next(new restify.InvalidCredentialsError("Invalid or missing credentials in request"))
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({ message: "Logged in successfully!"})
            });
        })(req, res, next);
    });

    server.get('/logout', function(req, res, next) {
        req.logout();
        res.send({ message: "Logged out successfully" });
        next();
    });

    server.post('/user', function (req, res, next) {
        var user = JSON.parse(req.body);
        user.authMethod = "local";
        user.role = "raw";

        var newUser = new models.User(user);
        newUser.save(function (err, resUser) {
            if(!err) {
                res.send(resUser);
                next();
            } else {
                if(err.name == "ValidationError") {
                    next(new restify.InvalidContentError(err.toString()));
                } else {
                    // TODO: Return more appropriate error when username already exists
                    console.error("Failed to insert user into database:", err);
                    next(new restify.InternalError("Failed to insert user due to an unexpected internal error"));
                }
            }
        });
    });
};