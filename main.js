import IngredientController from './controllers/ingredientController.js';
import PotController from './controllers/potController.js';
import LocationController from './controllers/locationController.js';
import HallController from './controllers/hallController.js';
import ColorTestController from './controllers/colorTestController.js';

const ingredientController = new IngredientController();
const potController = new PotController();
const colorTestController = new ColorTestController();
const hallController = new HallController(potController);

LocationController.loadCityOptions();
