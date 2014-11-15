/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all company specific API calls.
 */

var restify = require('restify');
var saveModule = require('save')('company');    //TODO: module to stub fake companies, should be deleted once DB in place

module.exports = function (server, models) {

    server.post('/company/', function(req, res, next) {
        console.log('Create company requested');

        var newCompany = new models.Company(req.body);

        newCompany.save(function (err) {
            if(!err) {
                res.send(req.body);
                next();
            } else {
                if(err.name == "ValidationError") {
                    next(new restify.InvalidContentError(err.toString()));
                } else {
                    console.error("Failed to insert company into database:", err);
                    next(new restify.InternalError("Failed to insert company due to an unexpected internal error"));
                }
            }
        });

        /*
        Using SAVE module
        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Company name attribute missing'));
        }
        else if (req.params.address === undefined) {
            return next(new restify.InvalidArgumentError('Company address attribute missing'));
        }

        saveModule.create({name: req.params.name, address: req.params.address}, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send(201, company) //the '201 Created' HTTP response code + created company
            next();
        })*/
    });

    server.get('/company/:id', function (req, res, next) {
        console.log('Read company requested');

        saveModule.findOne({_id: req.params.id}, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }

            if (company) {
                res.send(company)
                next();
            } else {    //'Save' may provide an error, or undefined for the user variable if they don't exist
                res.send(404)
                next();
            }
        })
    });

    server.get('/company', function (req, res, next) {
        console.log('Read all companies requested');

        saveModule.find({}, function (error, companies) {
            res.send(companies);
            next();
        })
    });

    server.put('/company/:id', function (req, res, next) {
        console.log('Update company requested');

        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Company name attribute missing'))
        }
        else if (req.params.address === undefined) {
            return next(new restify.InvalidArgumentError('Company address attribute missing'));
        }

        saveModule.update({
            _id: req.params.id,
            name: req.params.name,
            address: req.params.address
        }, function (error, user) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })
    });   //TODO: why does not work to test with WebStorm REST plugin???

    server.del('/company/:id', function (req, res, next) {
        console.log('Delete company requested');

        saveModule.delete(req.params.id, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })
    });
};