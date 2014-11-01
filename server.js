/**
 * Created by Pavel Prochazka on 22/10/14.
 * The main server based on restify
 */

var restify             = require('restify');
var mongoose            = require("mongoose");
var models              = require("./models/data_model")(mongoose);

var server = restify.createServer({ name: 'Nourriture server', version: '0.0.1' });
var connstr = "mongodb://localhost:27017/nourriture-app";   //TODO: change once up and running
var conn = {};
var mong = {};

var port = 8080;
if (process.argv[2]) {
    var port = parseInt(process.argv[2]);
}

server.use(restify.fullResponse());
server.use(restify.bodyParser());

// Server startup function, should be run when all routes have been registered and we are ready to listen
var startServer = function() {
    var db = mongoose.connection;

    // On failure to connect, abort server startup and show error
    db.on('error', console.error.bind(console, 'connection error:'));

    // On successful connection, finalize server startup
    db.once('open', function() {
        console.log("Connected to database successfully!");
        conn = db;

        server.listen(port, function () {
            console.log('- - - %s listening at %s - - -', server.name, server.url);
            require('./utilities/document')(server.router.mounts, 'restify');
        });
    });

    mongoose.connect(connstr);
    mong = new mongoose.Mongoose();
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
