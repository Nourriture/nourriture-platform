/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all gastronomist specific API calls.
 */
var restify = require('restify');
var saveModule = require('save')('gastronomist');

module.exports = function (server, models) {

    server.post('/gastronomist/', function (req, res, next) {
        console.log('Create gastronomist requested');

        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Gastronomist name attribute missing'));
        }
        else if (req.params.address === undefined) {
            return next(new restify.InvalidArgumentError('Gastronomist address attribute missing'));
        }

        saveModule.create({name: req.params.name, address: req.params.address}, function (error, gastronomist) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send(201, gastronomist) //the '201 Created' HTTP response code + created company
            next();
        })
    });

    server.get('/gastronomist/:id', function (req, res, next) {
        console.log('Read gastronomist requested');

        saveModule.findOne({_id: req.params.id}, function (error, gastronomist) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }

            if (gastronomist) {
                res.send(gastronomist)
                next();
            } else {
                res.send(404)
                next();
            }
        })
    });

    server.get('/gastronomist', function (req, res, next) {
        console.log('Read all gastronomist requested');

        saveModule.find({}, function (error, gastronomist) {
            res.send(gastronomist);
            next();
        })
    });

    server.put('/gastronomist/:id', function (req, res, next) {
        console.log('Update gastronomist requested');

        if (req.params.name === undefined) {
            return next(new restify.InvalidArgumentError('Gastronomist name attribute missing'))
        }
        else if (req.params.address === undefined) {
            return next(new restify.InvalidArgumentError('Gastronomist address attribute missing'));
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
    });

    server.del('/gastronomist/:id', function (req, res, next) {
        console.log('Delete gastronomist requested');

        saveModule.delete(req.params.id, function (error, company) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })
    });
}