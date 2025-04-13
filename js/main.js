import IngredientController from './controllers/IngredientController.js';
import PotController from './controllers/PotController.js';
import LocationController from './controllers/LocationController.js';
import HallController from './controllers/HallController.js';
import ColorTestController from './controllers/ColorTestController.js';

new IngredientController();
const potController = new PotController();
new ColorTestController();
new HallController(potController);

LocationController.loadCityOptions();
