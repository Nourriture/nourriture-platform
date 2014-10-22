/**
 * Created by remoteusrr on 22/10/14.
 * The main server based on restify
 */

var restify             = require('restify');
var companyModule       = require('./modules/company_module');
var gastronomistModule  = require('./modules/gastronomist_module');
var productModule       = require('./modules/product_module');
var recipeModule        = require('./modules/recipe_module');

var server = restify.createServer({ name: 'Nourriture server', version: '0.0.1' });

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.listen(8080, function () {
    console.log('- - - %s listening at %s - - -', server.name, server.url)
});

server.post('/company/',    companyModule.createCompany);
server.get('/company/:id', companyModule.readCompany);
server.put('/company/:id', companyModule.updateCompany);
server.del('/company/:id', companyModule.deleteCompany);