/**
 * Created by niels on 12/1/14.
 *
 * Module for handling authentication and authorization
 */

var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt");
var restify = require("restify");
var auth = require("authorized");

var SALT_WORK_FACTOR = 10;  // Intensity of password hashing (a factor of 10 should be fairly difficult to decrypt)

// Roles (All users have 1 (and only 1) role)
var getRoleFunc = function(role) { return function (req, done) { return done(null, req.user && req.user.role == role) } };
auth.role("raw", getRoleFunc("raw"));
auth.role("gastro", getRoleFunc("gastro"));
auth.role("comp", getRoleFunc("comp"));
auth.role("both", getRoleFunc("both"));
auth.role("admin", getRoleFunc("admin"));

// Actions (Platform requests may trigger one of these actions)
auth.action("add recipe", ["gastro", "both", "admin"]);
auth.action("edit recipe", ["gastro", "both", "admin"]);
auth.action("add ingredient", ["comp", "both", "admin"]);
auth.action("edit ingredient", ["comp", "both", "admin"]);
auth.action("view profile", ["raw", "gastro", "comp", "both", "admin"]); // In the case of gastronomist "profile = Gastronomist + User" and for company "profile = Company + User". For others just User
auth.action("edit profile", ["raw", "gastro", "comp", "both", "admin"]);
auth.action("query profiles", ["admin"]);


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
        done(null, user.username);

    });
    passport.deserializeUser(function(username, done) {
        models.User.findOne({ username: username }, function(err, user) {
           if(err) {
               return done(err);
           } else {
                done(null, user);
           }
        });
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
    server.use(passport.session());

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

    // Tiny endpoint for verifying whether we are logged in // TODO: Remove when authorization has been implemented across application
    server.get('/testlogin',
        auth.can("view profile"),
        function (req, res, next) {
            res.send("Yay, you're logged in already!");
            next();
        }
    );
};