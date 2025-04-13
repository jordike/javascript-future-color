import WeatherController from '../controllers/weatherController.js';
import MachineModel from '../models/machineModel.js';
import ColorController from './colorController.js';

export default class MachineController {

    startMachine(machine, onFinished) {
        const weatherData = WeatherController.getWeatherData()
        machine.startMix((ingredientColors) => {
            const combinedColor = ColorController.combineColors(ingredientColors);
            return combinedColor;
        }, weatherData,onFinished);
    }

    addPot(machine, pot) {
        return machine.addPot(pot);
    }

    removePot(machine) {
        return machine.removePot();
    }

    createMachine(mixSpeed, mixTime) {
        return new MachineModel(mixSpeed, mixTime);
    }
}

