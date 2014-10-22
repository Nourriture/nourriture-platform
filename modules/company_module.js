/**
 * Created by Pavel Prochazka on 22/10/14.
 * Module for all company specific API calls.
 */

function createCompanyProfile(req, res, next){
    console.log('Create company requested');
}

function readCompanyProfile(req, res, next){
    console.log('Read company requested');
}

function updateCompanyProfile(req, res, next){
    console.log('Update company requested');
}

function deleteCompanyProfile(req, res, next){
    console.log('Delete company requested');
}

//MODULE - functions that I want to expose as a module
exports.createCompany   = createCompanyProfile;
exports.readCompany     = readCompanyProfile;
exports.updateCompany   = updateCompanyProfile;
exports.deleteCompany   = deleteCompanyProfile;