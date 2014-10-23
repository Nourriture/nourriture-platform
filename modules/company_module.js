/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all company specific API calls.
 */

var restify = require('restify');
var saveModule = require('save')('company');    //TODO: module to stub fake companies, should be deleted once DB in place

function createCompanyProfile(req, res, next){
    console.log('Create company requested');

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Company name attribute missing'));
    }
    else if(req.params.address === undefined){
        return next(new restify.InvalidArgumentError('Company address attribute missing'));
    }

    saveModule.create({ name: req.params.name , address: req.params.address}, function (error, company) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send(201, company) //the '201 Created' HTTP response code + created company
        next();
    })
}

function readCompanyProfile(req, res, next){
    console.log('Read company requested');

    saveModule.findOne({ _id: req.params.id }, function (error, company) {
        if (error){
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
}

function readAllCompanyProfiles(req, res, next){
    console.log('Read all companies requested');

    saveModule.find({}, function (error, companies) {
        res.send(companies);
        next();
    })
}

function updateCompanyProfile(req, res, next){
    console.log('Update company requested');

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Company name attribute missing'))
    }
    else if(req.params.address === undefined){
        return next(new restify.InvalidArgumentError('Company address attribute missing'));
    }

    saveModule.update({ _id: req.params.id, name: req.params.name , address: req.params.address}, function (error, user) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send();
        next();
    })
}   //TODO: why does not work to test with WebStorm REST plugin???

function deleteCompanyProfile(req, res, next){
    console.log('Delete company requested');

    saveModule.delete(req.params.id, function (error, company) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send();
        next();
    })
}

exports.createCompany   = createCompanyProfile;
exports.readCompany     = readCompanyProfile;
exports.readAllCompanies= readAllCompanyProfiles;
exports.updateCompany   = updateCompanyProfile;
exports.deleteCompany   = deleteCompanyProfile;