/**
 * Created by Pavel Prochazka on 22/10/14.
 * The main server based on restify
 */

var restify             = require('restify');
var companyModule       = require('./modules/company_module');
var gastronomistModule  = require('./modules/gastronomist_module');
var ingredientModule    = require('./modules/ingredient_module');
var recipeModule        = require('./modules/recipe_module');

var server = restify.createServer({ name: 'Nourriture server', version: '0.0.1' });

var port = 8080;
if (process.argv[2]) {
    var port = parseInt(process.argv[2]);
}

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.listen(port, function () {
    console.log('- - - %s listening at %s - - -', server.name, server.url);
    require('./utilities/document')(server.router.mounts, 'restify');
});

//COMPANY related API calls
server.post('/company/',   companyModule.createCompany);
server.get('/company',     companyModule.readAllCompanies);
server.get('/company/:id', companyModule.readCompany);
server.put('/company/:id', companyModule.updateCompany);
server.del('/company/:id', companyModule.deleteCompany);

//RECIPE related API calls
server.post('/recipe/',   recipeModule.insertRecipe);
server.get('/recipe',     recipeModule.selectAllRecipes);
server.get('/recipe/:id', recipeModule.selectRecipeById);
server.put('/recipe/:name', recipeModule.selectRecipeByName);
server.del('/recipe/:id', recipeModule.deleteRecipe);
server.put('/recipe/:id', recipeModule.updateRecipe);

//INGREDIENT related API calls

server.post('/ingredient/',   			ingredientModule.createIngredient);
server.put('/ingredient/:id', 			ingredientModule.updateIngredient);
server.del('/ingredient/:id', 			ingredientModule.deleteIngredient);
server.get('/ingredient',     			ingredientModule.selectAllIngredients);
server.get('/ingredient/:id', 			ingredientModule.selectIngredientById);
server.get('/ingredient/:name', 		ingredientModule.selectIngredientByName);
server.get('/ingredient/:companyId',   	ingredientModule.selectAllIngredientsOfCompany);

// GASTRONOMIST related API calls

server.post('/gastronomist/', gastronomistModule.createGastronomist);
server.get('/gastronomist', gastronomistModule.readAllGastronomist);
server.get('/gastronomist/:id', gastronomistModule.readGastronomist);
server.put('/gastronomist/:id', gastronomistModule.updateGastronomist);
server.del('/gastronomist/:id', gastronomistModule.deleteGastronomist);
