import WeatherController from './WeatherController.js';
import MachineModel from '../models/MachineModel.js';
import ColorController from './ColorController.js';

export default class MachineController {
    startMachine(machine, onFinished) {
        const weatherData = WeatherController.getWeatherData();
        machine.startMix(
            ingredientColors => {
                const combinedColor = ColorController.combineColors(ingredientColors);
                return combinedColor;
            },
            weatherData,
            onFinished
        );
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
