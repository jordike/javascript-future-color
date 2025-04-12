import IngredientController from '../controllers/ingredientController.js';
import PotController from '../controllers/potController.js';
import LocationController from '../controllers/locationController.js';

const ingredientController = new IngredientController();
const potController = new PotController();

LocationController.loadCityOptions();
