import IngredientController from '../controllers/ingredientController.js';
import LocationController from '../controllers/LocationController.js';

const ingredientController = new IngredientController();
LocationController.loadCityOptions();
