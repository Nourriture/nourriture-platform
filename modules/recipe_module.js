/**
 * Created by Vincent Gonod on 24/10/14.
 * Module for all recipes specific API calls.
 */

var restify = require('restify');
var saveModule = require('save')('recipe');   

function insertRecipe(req, res, next){
    console.log('Insert Recipe requested');

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Recipe name attribute missing'));
    }
    else if(req.params.components === undefined){
        return next(new restify.InvalidArgumentError('Recipe components attribute missing')); //"Components" it's a list of components for the recipe
    }

    saveModule.create({ name: req.params.name , components: req.params.components}, function (error, recipe) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send(201, recipe) //the '201 Created' HTTP response code + created recipe
        next();
    })
}

function selectRecipeById(req, res, next){
    console.log('Select recipe by id requested');

    saveModule.findOne({ _id: req.params.id }, function (error, recipe) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }

        if (recipe) {
            res.send(recipe)
            next();
        } else {    
            res.send(404)
            next();
        }
    })
}

function selectRecipeByName(req, res, next){
    console.log('Select recipe by name requested');

    saveModule.findOne({ _name: req.params.name }, function (error, recipe) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }

        if (recipe) {
            res.send(recipe)
            next();
        } else {    
            res.send(404)
            next();
        }
    })
}

function selectAllRecipes(req, res, next){
    console.log('Select all recipes requested');

    saveModule.find({}, function (error, recipe) {
        res.send(companies);
        next();
    })
}

function updateRecipe(req, res, next){
    console.log('Update recipe requested');

    if (req.params.name === undefined) {
        return next(new restify.InvalidArgumentError('Recipe name attribute missing'))
    }
    else if(req.params.components === undefined){
        return next(new restify.InvalidArgumentError('Recipe components attribute missing'));
    }

    saveModule.update({ _id: req.params.id, name: req.params.name , address: req.params.components}, function (error, user) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send();
        next();
    })
}   //TODO: why does not work to test with WebStorm REST plugin???

function deleteRecipe(req, res, next){
    console.log('Delete company requested');

    saveModule.delete(req.params.id, function (error, company) {
        if (error){
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
        }
        res.send();
        next();
    })
}

exports.insertRecipe   = insertRecipe;
exports.selectRecipeById = selectRecipeById;
exports.selectRecipeByName = selectRecipeByName;
exports.selectAllRecipes   = selectAllRecipes;
exports.updateRecipe   = updateRecipe;
exports.deleteRecipe   = deleteRecipe;