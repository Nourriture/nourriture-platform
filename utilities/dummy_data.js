/**
 * Created by Pavel Prochazka on 13/12/14.
 */

var mongoose = require('mongoose');
var nconf    = require("nconf");
var async    = require("async");

// Load data models
var models = require("../models/data_model")(mongoose); //passing "mongoose" object to data_model's constructor (will use it to define Schemas)

// Load configuration
require("../modules/config_module")(nconf);

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
        console.log("Connected to database " + nconf.get("connection-string") + "  successfully!");

        insertDummyData()
        //removeDummyData()
    });

    mongoose.connect(nconf.get("connection-string"));   // Gets the URL to db from config file
};

var insertDummyData = function(){

    // Users
    var userAdmin           = new models.User({username:'admin', password:'admin', email:'admin@nourriture.com', role:'admin', authMethod:'local'})
    var userGastronomist    = new models.User({username:'gordon', password:'gordon', email:'gordon@ramsay.com', role:'gastro', authMethod:'local'})
    var userCompany         = new models.User({username:'danone', password:'danone', email:'info@danone.com', role:'comp', authMethod:'local'})
    var userCompany2        = new models.User({username:'cola', password:'cola', email:'info@cola.com', role:'comp', authMethod:'local'})
    var userCompany3        = new models.User({username:'barilla', password:'barilla', email:'info@barilla.it', role:'comp', authMethod:'local'})
    var userCompany4        = new models.User({username:'fresho', password:'fresho', email:'info@fresho.com', role:'comp', authMethod:'local'})
    var userCompany5        = new models.User({username:'winnmeat', password:'winnmeat', email:'info@winnmeat.com', role:'comp', authMethod:'local'})

    // Gastronomist with appropriate username
    var gastronomist = new models.Gastronomist({username:'gordon',
        name:'Gordon Ramsay',
        email:'gordon@ramsay.com',
        picture:'http://www.healthrelatedinfos.com/wp-content/uploads/2010/09/Gordon-Ramsay-150x150.jpg',
        bio:'Gordon James Ramsay, Jr. (born 8 November 1966) is a Scottish born British chef and restaurateur. His restaurants have been awarded 15 Michelin stars in total and currently hold 14. His signature restaurant, Restaurant Gordon Ramsay in Chelsea, London, has held 3 Michelin stars since 2001. Ramsay is known for presenting TV programmes about competitive cookery and food, such as the British series Hells Kitchen along with the American versions of Hells Kitchen, Kitchen Nightmares, MasterChef, MasterChef Junior and Hotel Hell.',
        occupation:'Master chef',
        website:'http://www.gordon.uk'})

    var gordonID

    // Companies with appropriate username
    var company = new models.Company({username:'danone',
        name:'Danone Aps',
        logo:'http://ts1.mm.bing.net/th?id=HN.608030549013040173&pid=1.7',
        description:'We sell yoghurts, milks and other yummy products.',
        website:'http://www.danone.com',
        email:'info@danone.com',
        phone:'123456789'})
    var company2 = new models.Company({username:'cola',
        name:'Coca cola',
        logo:'http://ns29803.ovh.net/~planete_industries/upload/entr_logo_1.jpg',
        description:'A global leader in the beverage industry, the Coca-Cola company offers hundreds of brands, including soft drinks, fruit juices, sports drinks and other beverages.',
        website:'http://www.cocacola.com',
        email:'info@cola.com',
        phone:'123456789'})
    var company3 = new models.Company({username:'barilla',
        name:'Barilla Group',
        logo:'http://media3.barillagroup.com/bpp/export/sites/fr.barilla/images/promo/piccolini/logo_promo_piccolini.jpg',
        description:'A global leader in producing traditional italian pasta.',
        website:'http://www.barilla.com',
        email:'info@barilla.it',
        phone:'123456789'})
    var company4 = new models.Company({username:'fresho',
        name:'Fresho Int.',
        logo:'http://www.logodesignnewzealand.co.nz/images-new/fresho-fruit-vegetable-logo.jpg',
        description:'We grow delicious and juicy fruit and vegetable.',
        website:'http://www.fresho.com',
        email:'info@fresho.com',
        phone:'123456789'})
    var company5 = new models.Company({username:'winnmeat',
        name:'Winnmeat Group',
        logo:'http://winnmeat.com/wpsite/wp-content/uploads/2009/10/Premuim-Natural-Logo.jpg',
        description:'Winnmeat Group is bringing top quality producer and supplier of meat to customer.',
        website:'http://www.winnmeat.com',
        email:'info@winnmeat.com',
        phone:'123456789'})

    // Ingredients
    var ingredient = new models.Ingredient({company:'cola',
        type:'liquid',
        name:'Pepsi Cola',
        picture:'http://www.supermelilla.es/tienda/913-248-home/pepsi-cola-2-lt.jpg',
        season:'All year',
        origin:'USA',
        calories:400,
        carbs:100,
        proteins:90,
        fat:500})
    var ingredient2 = new models.Ingredient({company:'danone',
        type:'solid',
        name:'Cheese',
        picture:'http://ec.l.thumbs.canstockphoto.com/canstock3649492.jpg',
        season:'All year',
        origin:'France',
        calories:200,
        carbs:90,
        proteins:20,
        fat:300})
    var ingredient3 = new models.Ingredient({company:'barilla',
        type:'solid',
        name:'Pasta',
        picture:'http://ts2.mm.bing.net/th?id=HN.608042669420318699&pid=1.7',
        season:'All year',
        origin:'Italy',
        calories:20,
        carbs:200,
        proteins:30,
        fat:10})
    var ingredient4 = new models.Ingredient({company:'fresho',
        type:'solid',
        name:'Tomato',
        picture:'http://2.bp.blogspot.com/_gbFONV-ait0/TJs6daQzBWI/AAAAAAAAAIM/US00ABteH38/s320/tomato-Recipes-Mask.jpg',
        season:'Summer',
        origin:'Holand',
        calories:20,
        carbs:50,
        proteins:23,
        fat:3})
    var ingredient5 = new models.Ingredient({company:'winnmeat',
        type:'solid',
        name:'Beef meat',
        picture:'http://www.learnamericanenglishonline.com/images/Vocabulary%20Images/Food%20photos/meat,%20fish,%20poultry/ground%20beef.jpg',
        season:'All year',
        origin:'Germany',
        calories:98,
        carbs:56,
        proteins:43,
        fat:34})
    var ingredient6 = new models.Ingredient({company:'fresho',
        type:'solid',
        name:'Onion',
        picture:'http://www.vegbox-recipes.co.uk/image-files/ingredients/white-onion-197.gif',
        season:'Summer',
        origin:'Poland',
        calories:12,
        carbs:43,
        proteins:14,
        fat:3})
    var ingredient7 = new models.Ingredient({company:'winnmeat',
        type:'solid',
        name:'Salmon meat',
        picture:'http://thumbs.dreamstime.com/t/fillet-salmon-isolated-close-up-39143925.jpg',
        season:'Winter',
        origin:'Japan',
        calories:123,
        carbs:42,
        proteins:445,
        fat:300})
    var ingredient8 = new models.Ingredient({company:'barilla',
        type:'solid',
        name:'Rice',
        picture:'http://pkoverseas.com/images/facts-rice.jpg',
        season:'Spring',
        origin:'Vietnam',
        calories:32,
        carbs:432,
        proteins:25,
        fat:13})
    var ingredient9 = new models.Ingredient({company:'fresho',
        type:'solid',
        name:'Ginger',
        picture:'http://health.learninginfo.org/images/ginger.jpg',
        season:'Summer',
        origin:'China',
        calories:12,
        carbs:43,
        proteins:14,
        fat:3})
    var ingredient10 = new models.Ingredient({company:'fresho',
        type:'solid',
        name:'Sea weed',
        picture:'http://www.eyeserum.com/assets/Seaweed-pic-150x150.jpg',
        season:'Autumn',
        origin:'Japan',
        calories:12,
        carbs:43,
        proteins:14,
        fat:3})

    var salmonID
    var riceID
    var gingerID
    var seaWeedID

    // Recipe ingredients
    var recipeIngredientRice
    var recipeIngredientFish
    var recipeIngredientGinger
    var recipeIngredientSeaweed
    var createRecipeIngredients = function(callback){

        recipeIngredientRice = {name:'Rice',
            quantity:2,
            quantityUnit:'pack',
            original:riceID
        }
        recipeIngredientFish = {name:'Salmon',
            quantity:1,
            quantityUnit:'kg',
            original:salmonID
        }
        recipeIngredientGinger = {name:'Ginger',
            quantity:10,
            quantityUnit:'slices',
            original:gingerID
        }
        recipeIngredientSeaweed = {name:'Sea weed',
            quantity:500,
            quantityUnit:'g',
            original:seaWeedID
        }

        callback()
    }

    var createRecipe = function () {
        var recipe = new models.Recipe({author:gordonID,
         title:'Sushi',
         description:'Famous japanese delicious food.',
         instructions:'Boil rice, cut fish, wrap fish around rice.',
         picture:'http://s.mijnreceptenboek.nl/i/lib/v/sushi-special.png',
         difficulty:4,
         calories:300,
         carbs:200,
         proteins:100,
         fat:234,
         ingredietns:[recipeIngredientRice, recipeIngredientFish, recipeIngredientGinger, recipeIngredientSeaweed]
         })
         recipe.save()
    }

    // Save it all
    async.series([
        /*userAdmin.save(),
        userGastronomist.save(),
        userCompany.save(),
        userCompany2.save(),
        userCompany3.save(),
        userCompany4.save(),
        userCompany5.save(),*/
        gastronomist.save(function (error, response){
            gordonID = response._id
        }),
        /*company.save(),
        company2.save(),
        company3.save(),
        company4.save(),
        company5.save(),
        ingredient.save(),
        ingredient2.save(),
        ingredient3.save(),
        ingredient4.save(),
        ingredient5.save(),
        ingredient6.save(),
        ingredient7.save(function (error, response){
            salmonID = response._id
        }),
        ingredient8.save(function (error, response){
            riceID = response._id
        }),
        ingredient9.save(function (error, response){
            gingerID = response._id
        }),
        ingredient10.save(function (error, response){
            seaWeedID = response._id
        }),*/
        createRecipeIngredients,
        createRecipe
    ])
}

var removeDummyData = function(){
    mongoose.connection.db.dropCollection('users')
    mongoose.connection.db.dropCollection('gastronomists')
    mongoose.connection.db.dropCollection('companies')
    mongoose.connection.db.dropCollection('ingredients')
    mongoose.connection.db.dropCollection('recipes')
}

startServer()