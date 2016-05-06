// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var recipeController = require('./controllers/recipeController.js');

// Connect to the recipelocker MongoDB
mongoose.connect('mongodb://localhost:27017/recipes');


// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));


// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();


// Create endpoint handlers for /beers
router.route('/recipes')
  .post(recipeController.postRecipes)
  .get(recipeController.getRecipes);

// Create endpoint handlers for /beers/:beer_id
router.route('/recipes/:beer_id')
  .get(recipeController.getRecipe)
  .put(recipeController.putRecipe)
  .delete(recipeController.deleteRecipe);



// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Demoe port ' + port);
