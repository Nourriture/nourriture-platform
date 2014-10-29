/**
 * Created by Jeremy Barthelemy on 24/10/14.
 * Module for all ingredient/product specific API calls.
 */

var restify = require('restify');
var saveModule = require('save')('ingredient');
var companies = require('save')('company');

module.exports = function (server, models) {

    server.post('/ingredient/', function (req, res, next) {
        console.log('Create ingredient requested');

        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Ingredient name attribute missing'));
        }

        saveModule.create({name: req.params.name}, function (error, ingredient) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send(201, ingredient);
            next();
        })
    });

    server.put('/ingredient/:id', function (req, res, next) {
        console.log('Update ingredient requested');

        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Company name attribute missing'))
        }

        saveModule.update({_id: req.params.id, name: req.params.name}, function (error, user) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })
    });

    server.del('/ingredient/:id', function (req, res, next) {
        console.log('Delete company requested');

        saveModule.delete(req.params.id, function (error, ingredient) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })
    });

    server.get('/ingredient', function (req, res, next) {
        console.log('Select all ingredients requested');

        saveModule.find({}, function (error, ingredients) {
            res.send(ingredients);
            next();
        })
    });

    server.get('/ingredient/:id', function(req, res, next) {
        console.log('Select ingredient id requested');

        saveModule.findOne({_id: req.params.id}, function (error, ingredient) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            if (ingredient) {
                res.send(ingredient);
                next();
            }
            else {
                res.send(404);
                next();
            }
        })
    });

    server.get('/ingredient/:name', function (req, res, next) {
        console.log('Select ingredient name requested');

        saveModule.findOne({_name: req.params.name}, function (error, ingredient) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            if (ingredient) {
                res.send(ingredient)
                next();
            }
            else {
                res.send(404);
                next();
            }
        })
    });

    server.get('/ingredient/:companyId', function (req, res, next) {
        console.log('Select all ingredients company requested');

        company.findOne({_id: req.params.id}, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            if (company) {
                saveModule.find({}, function (error, ingredients) {
                    res.send(ingredients);
                    next;
                })
            }
            else {
                res.send(404);
                next();
            }
        })
    });
}