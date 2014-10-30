/**
 * Created by niels on 10/30/14.
 * Mongoose data models for the platform
 */

var util = require('./data_model_middleware');

module.exports = function (mongoose) {

    // COMPANY
    var Company = mongoose.Schema({
        created: { type: Date, required: true },
        modified: { type: Date, required: true },
        username: { type: String, required: true},
        name: { type: String, validate: util.strLength(64), required: true },
        logo: { type: String, validate: util.strLength(512) },
        description: { type: String, validate: util.strLength(1024) },
        website: { type: String, validate: util.strLength(512) },
        phone: { type: String, validate: util.strLength(16) },
        email: { type: String, validate: util.strLength(128) }
    });
    Company.pre('validate', true, util.updateTimeStamps);

    // GASTRONOMIST
    var PartialRecipe = mongoose.Schema( {
        created: { type: Date, required: true },
        title: { type: String, validate: util.strLength(64) },
        picture: { type: String, validate: util.strLength(512) },
        description: { type: String, validate: util.strLength(512), required: true },
        original: { type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }
    });
    var Gastronomist = mongoose.Schema({
        created: { type: Date, required: true },
        modified: { type: Date, required: true },
        username: { type: String, required: true },
        email: { type: String, validate: util.strLength(128), required:true },
        name: { type: String, validate: util.strLength(64), required: true },
        picture: { type: String, validate: util.strLength(512) },
        bio: { type: String, validate: util.strLength(4096) },
        occupation: { type: String, validate: util.strLength(128) },
        website: { type: String, validate: util.strLength(512) },
        latestRecipes: [PartialRecipe]
    });
    Gastronomist.pre('validate', true, util.updateTimeStamps);

    // INGREDIENT
    var Ingredient = mongoose.Schema({
        created: { type: Date, required: true },
        modified: { type: Date, required: true },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
        name: { type: String, validate: util.strLength(64) },
        picture: { type: String, validate: util.strLength(512) },
        calories: Number,
        carbs: Number,
        proteins: Number,
        fat: Number,
        season: { type: String, validate: util.strLength(64) },
        origin: { type: String, validate: util.strLength(64) }
    });
    Ingredient.pre('validate', true, util.updateTimeStamps);

    // RECIPE
    var RecipeIngredient = mongoose.Schema( {
        name: { type: String, validate: util.strLength(64) },
        quantity: Number,
        quantityUnit: { type: String, validate: util.strLength(12) },
        original: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }
    });
    var Recipe = mongoose.Schema({
        created: { type: Date, required: true },
        modified: { type: Date, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "Gastronomist", required: true },
        title: { type: String, validate: util.strLength(64), required: true },
        description: { type: String, validate: util.strLength(512), required: true },
        instructions: { type: String, validate: util.strLength(8192) },
        picture: { type: String, validate: util.strLength(512) },
        calories: Number,
        carbs: Number,
        proteins: Number,
        fat: Number,
        difficulty: Number,
        ingredients: [RecipeIngredient]
    });
    Recipe.pre('validate', true, util.updateTimeStamps);


    // Bind to DB collection names and return on single object
    return {
        Company: mongoose.model("company", Company),
        Gastronomist: mongoose.model("gastronomist", Gastronomist),
        Ingredient: mongoose.model("ingredient", Ingredient),
        Recipe: mongoose.model("recipe", Recipe)
    };
};