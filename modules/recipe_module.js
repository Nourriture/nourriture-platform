/**
 * Created by Vincent Gonod on 24/10/14.
 * Module for all recipes specific API calls.
 */

var restify = require('restify');
var saveModule = require('save')('recipe');

module.exports = function (server, models) {

    server.post('/recipe', function (req, res, next)
    {
        console.log('Insert Recipe requested');

        var newRecipe = new models.Recipe(req.body);

        newRecipe.save(function (err)
        {

            if(!err) 
            {
               res.send(req.body);
               next();
            }
            else
            {
                if(err.name == "ValidationError") {
                    next(new restify.InvalidContentError(err.toString()));  //Restify takes care of HTTP error handling
                } else {
                    console.error("Failed to insert recipe into database:", err);
                    next(new restify.InternalError("Failed to insert recipe due to an unexpected internal error"));    //Restify takes care of HTTP error handling
                }
            }         

        });
        

/*        saveModule.create({name: req.params.name, components: req.params.components}, function (error, recipe) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send(201, recipe) //the '201 Created' HTTP response code + created recipe
            next();
        })*/
    }); //WORKS

    server.get('/recipe/:id', function (req, res, next) 
    {
        console.log('Select recipe by id requested');

        models.Recipe.find({ "_id":req.params.id }, function(err, Recipe) 
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


/*        saveModule.findOne({_id: req.params.id}, function (error, recipe) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }

            if (recipe) {
                res.send(recipe)
                next();
            } else {
                res.send(404)
                next();
            }
        })*/
    });

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

        /*saveModule.findOne({_name: req.params.name}, function (error, recipe) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }

            if (recipe) {
                res.send(recipe)
                next();
            } else {
                res.send(404)
                next();
            }
        })*/
    });

    server.get('/recipe', function (req, res, next) 
    {
        console.log('Select all recipes requested');

        models.Recipe.find({}, function (error, recipe) {
            res.send(companies);
            next();
        });
    });

    server.put('/recipe/:id', function (req, res, next) 
    {
        console.log('Update recipe requested');

        if (!req.body) 
        {
            next(new restify.InvalidContentError("No recipe submitted for update"));
            return;
        }

        models.Recipe.find({ "_id":req.params.id }, function(err, Recipe) 
        {
            if(!err) 
            {
                newRecipe.save(function (err)
                {

                    if(!err) 
                    {
                        res.send(req.body);
                        next();
                    } 
                    else 
                    {
                        if (req.params.name === undefined) 
                        {
                             return next(new restify.InvalidArgumentError('Recipe name attribute missing'));
                        }
                             
                    }
                } );
            }
            else 
            {
                    console.error("Failed to query database for recipe:", err);
                    next(new restify.ResourceNotFoundError("No recipes found with the given id"));
            }
        });

        /*
        saveModule.update({
            _id: req.params.id,
            name: req.params.name,
            address: req.params.components
        }, function (error, user) {
            if (error) {
                return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
            }
            res.send();
            next();
        })*/
    });  //TODO: why does not work to test with WebStorm REST plugin???

    server.del('/recipe/:id', function (req, res, next) 
    {
        console.log('Delete recipe requested');

        models.Consumer.findOneAndRemove({ "_id":req.params.id}, function(err, deletedRecipe) {
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
    });
}