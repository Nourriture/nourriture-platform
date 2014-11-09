/**
 * Created by Pavel Prochazka on 22/10/14.
 * The main server based on restify
 */

var restify             = require('restify');
var mongoose            = require("mongoose");
var models              = require("./models/data_model")(mongoose);
var nconf               = require("nconf");

// Load configuration
require("./modules/config_module")(nconf);

// Initialize server
var server = restify.createServer({ name: nconf.get("name"), version: nconf.get("version") });
server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Server startup function, should be run when all routes have been registered and we are ready to listen
var startServer = function() {
    var db = mongoose.connection;

    // On failure to connect, abort server startup and show error
    db.on('error', function(err) {
        console.error("connection error:" + err);
        console.log("Unable to connect to database. Shutting down.");
    });

    // On successful connection, finalize server startup
    db.once('open', function() {
        console.log("Connected to database successfully!");

        server.listen(nconf.get("port"), function () {
            console.log('- - - %s listening at %s - - -', server.name, server.url);
            require('./utilities/document')(server.router.mounts, 'restify');
        });
    });

    mongoose.connect(nconf.get("connection-string"));
};

//Register routes (require modules) -> by invoking their only ONE exported function (constructor) -> register request handlers into "handlers/endpoints table"

//COMPANY related API calls
var companyModule = require('./modules/company_module')(server, models);

//RECIPE related API calls
var recipeModule = require('./modules/recipe_module')(server, models);

//INGREDIENT related API calls
var ingredientModule    = require('./modules/ingredient_module')(server, models);

//GASTRONOMIST related API calls
var gastronomistModule  = require('./modules/gastronomist_module')(server, models);

// Connect to DB and start listening
startServer();
