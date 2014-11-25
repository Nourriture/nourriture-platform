/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all company specific API calls.
 */

var restify = require('restify');
var fs = require('fs');
//var _ = require('lodash'); TODO: what for??

module.exports = function (server, models) { //passing mongoose object to constructor (this anonymous method)

    //Create a company
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

    //Read a company based on ID
    server.get('/company/:username', function (req, res, next) {
        console.log('Read company requested');

        models.Company.find({ username:req.params.username }, function(err, company) {
            if(!err) {
                if(company.length != 0) {
                    res.send(company);
                    next();
                } else {
                    next(new restify.ResourceNotFoundError("No company found with the given company username"));
                }
            } else {
                console.error("Failed to query database for company profile:", err);
                next(new restify.InternalError("Failed to read company due to an unexpected internal error"));
            }
        });

        /*saveModule.findOne({_id: req.params.id}, function (error, company) {
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
        })*/
    });

    //Read all companies //TODO: finish me
    /*server.get('/company', function (req, res, next) {
        console.log('Read all companies requested');

        saveModule.find({}, function (error, companies) {
            res.send(companies);
            next();
        })
    });*/

    //Update a company
    server.put('/company/:username', function (req, res, next) {
        console.log('Update company requested');

        // Retrieve existing company, overwrite fields, validate and save
        models.Company.find({ username:req.params.username }, function(err, result) {
            if(!err) {
                if(result.length != 0) {
                    var company = result[0];

                    // Overwrite fields with value from request body
                    for (var key in req.body) {
                        company[key] = req.body[key];
                    }

                    // Validate and save
                    company.save(function (err) {
                        if(!err) {
                            res.send(company);
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
                } else {
                    // No company found with given username
                    next(new restify.ResourceNotFoundError("No company found with the given username"));
                }
            } else {
                // Database connection error
                console.error("Failed to query database for company profile:", err);
                next(new restify.InternalError("Failed to insert company due to an unexpected internal error"));
            }
        });

        /*if (req.params.name === undefined) {
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
        })*/
    });   //TODO: why does not work to test with WebStorm REST plugin???

    //Delete a company
    server.del('/company/:username', function (req, res, next) {
        console.log('Delete company requested');

        models.Company.findOneAndRemove({ username:req.params.username }, function(err, deletedCompany) {
            if(!err) {
                if(deletedCompany) {
                    res.send(deletedCompany);
                    next();
                } else {
                    next(new restify.ResourceNotFoundError("No company found with the given username"));
                }
            } else {
                console.error("Failed to delete company profile from database:", err);
                next(new restify.InternalError("Failed to delete company due to an unexpected internal error"));
            }
        });

        /*saveModule.delete(req.params.id, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })*/
    });
};