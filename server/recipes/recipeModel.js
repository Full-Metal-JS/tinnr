var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
  imageUrlsBySize: {
    type: Object,
    required: true
  },
  sourceDisplayName: {
    type: String,
    require: true
  },
  ingredients: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  smallImageUrls: {
    type: String,
    required: true
  },
  recipeName: {
    type: String,
    required: true
  },
  totalTimeInSeconds: {
    type: Number,
    required: true
  },
  attributes: {
    type: Object,
    required: true
  },
  flavors: {
    type: Object,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('recipes', RecipeSchema);