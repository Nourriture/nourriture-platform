/**
 * Created by Vincent Gonod on 24/10/14.
 * Module for all recipes specific API calls.
 */

var restify = require('restify');
var async = require('async');

module.exports = function (server, models) {

    server.post('/recipe', function (req, res, next)
    {
        console.log('Insert Recipe requested');

        var newRecipe = new models.Recipe(req.body);

        // If ingredients provided
        if(req.body.ingredients.length != 0){

            // Count all the nutrition values of provides ingredient
            var totalFats = 0, totalCarbs = 0, totalProteins = 0, totalCalories = 0;
            var resultArray = new Array();

            // Lookup each ingredient from recipe in parallel
            async.each(req.body.ingredients, function (ingredient, callback){
                models.Ingredient.findOne({ _id:ingredient.original }, function(err, matchingIngredient){
                    if(!err) {
                        resultArray.push(matchingIngredient);
                        callback();     // If no error has occurred, the callback should be run without arguments or with an explicit null argument.
                    }
                    else{
                        callback(err);  // The main callback (for the each function) is immediately called with the error
                    }
                });
            }, function (err){
                if(!err){
                    console.log('All ingredients have been looked up successfully');

                    for (i = 0; i < resultArray.length; i++) {  // Loop through the looked up ingredients
                        var ingredientLookup = resultArray[i];

                        for (a = 0; a < req.body.ingredients.length; a++) { // Loop through the request body ingredients
                            var ingredientRequest = req.body.ingredients[a];

                            if(ingredientLookup._id == ingredientRequest.original){  // If they match
                                totalFats += ingredientLookup.fat * ingredientRequest.quantity;  // Multiply the nutrition value by quantity
                                totalCarbs += ingredientLookup.carbs * ingredientRequest.quantity;
                                totalProteins += ingredientLookup.proteins * ingredientRequest.quantity;
                                totalCalories += ingredientLookup.calories * ingredientRequest.quantity;
                            }
                        }
                    }

                    //Add the total amount of nutrition values to new recipe
                    newRecipe.fat = totalFats;
                    newRecipe.carbs = totalCarbs;
                    newRecipe.proteins = totalProteins;
                    newRecipe.calories = totalCalories;

                    newRecipe.save(function (err) {
                        if(!err) {
                            res.send(newRecipe);
                            next();
                        }
                        else {
                            if(err.name == "ValidationError") {
                                next(new restify.InvalidContentError(err.toString()));  //Restify takes care of HTTP error handling
                            } else {
                                console.error("Failed to insert recipe into database:", err);
                                next(new restify.InternalError("Failed to insert recipe due to an unexpected internal error"));    //Restify takes care of HTTP error handling
                            }
                        }
                    });
                }
                else
                    console.error("Failed to lookup ingredients from database:", err);
            });
        }
        else{
            newRecipe.save(function (err) {
                if(!err) {
                    res.send(newRecipe);
                    next();
                }
                else {
                    if(err.name == "ValidationError") {
                        next(new restify.InvalidContentError(err.toString()));  //Restify takes care of HTTP error handling
                    } else {
                        console.error("Failed to insert recipe into database:", err);
                        next(new restify.InternalError("Failed to insert recipe due to an unexpected internal error"));    //Restify takes care of HTTP error handling
                    }
                }
            });
        }
    }); //WORKS!

    server.get('/recipe/:id', function (req, res, next) 
    {
        console.log('Select recipe by id requested');

        models.Recipe.find({ "_id":req.params.id }, function(err, recipe)
        {
            if(!err) 
                {
                    res.send(recipe);
                    next();
                } 
            else 
            {
                console.error("Failed to query database for recipe:", err);
                next(new restify.ResourceNotFoundError("No recipes found with the given id"));
            }
        });
    }); //WORKS!

    server.get('/recipe/:name', function (req, res, next) 
    {
        console.log('Select recipe by name requested');

        models.Recipe.find({ username:req.params.username }, { "_id":0 }, function(err, recipe) 
        {
            if(!err) 
            {
                if(recipe.length != 0) 
                {
                    res.send(recipe);
                    next();
                } 
                else 
                {
                    next(new restify.ResourceNotFoundError("No recipes found with the given name"));
                }
            } 
            else 
            {
                console.error("Failed to query database for recipe:", err);
                next(new restify.InternalError("Failed to get recipe due to an unexpected internal error"));
            }
        });
    }); //FIXME cannot work like this, because it will conflict with the above method

    server.get('/recipe', function (req, res, next) 
    {
        console.log('Select all recipes requested');

        models.Recipe.find(function (error, recipes) {
            if(!error) {
                res.send(recipes);
                next();
            } else {
                console.error("Failed to read recipes from database:", error);
                next(new restify.InternalError("Failed to read recipes due to an unexpected internal error"));
            }
        });
    }); //WORKS!

    server.put('/recipe/:id', function (req, res, next) 
    {
        console.log('Update recipe requested');

        if (!req.body) 
        {
            next(new restify.InvalidContentError("No recipe submitted for update"));
            return;
        }

        // Retrieve existing recipes, overwrite fields, validate and save
        models.Recipe.find({ _id:req.params.id }, function(err, recipes) {
            if (!err) {
                if (recipes.length != 0) {
                    var recipe = recipes[0];    // Get the first founded recipe

                    // Overwrite fields with value from request body
                    for (var key in req.body) {     //req.body has to be POSTed in JSON format!!!
                        recipe[key] = req.body[key];
                    }

                    // Validate and save
                    recipe.save(function (err) {
                        if (!err) {
                            res.send(recipe);
                            next();
                        } else {
                            if (err.name == "ValidationError") {
                                next(new restify.InvalidContentError(err.toString()));
                            } else {
                                console.error("Failed to insert recipe into database:", err);
                                next(new restify.InternalError("Failed to update recipe due to an unexpected internal error"));
                            }
                        }
                    });
                } else {
                    // No recipe found with given ID
                    next(new restify.ResourceNotFoundError("No recipe found with the given ID"));
                }
            } else {
                // Database connection error
                console.error("Failed to query database for recipe: ", err);
                next(new restify.InternalError("Failed to update recipe due to an unexpected internal error"));
            }
        });
    }); //WORKS!

    server.del('/recipe/:id', function (req, res, next) 
    {
        console.log('Delete recipe requested');

        models.Recipe.findOneAndRemove({ "_id":req.params.id}, function(err, deletedRecipe) {
            if(!err) 
            {
                if(deletedRecipe) 
                {
                    res.send(deletedRecipe);
                    next();
                } 
                else 
                {
                    next(new restify.ResourceNotFoundError("No recipe found with the given id"));
                }
            } 
            else 
            {
                console.error("Failed to delete recipe from database:", err);
                next(new restify.InternalError("Failed to recipe due to an unexpected internal error"));
            }
        });
    }); //WORKS
}