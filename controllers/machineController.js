import WeatherController from '../controllers/weatherController.js';

export default class MachineController {

    startMachine() {
        const weatherData = WeatherController.getWeatherData()
        this.machineModel.startMix((ingredientColors) => {
            const combinedColor = this.colorController.combineColors(ingredientColors);
            return combinedColor;
        }, weatherData);
    }

    addPot(pot) {
        return this.machineModel.addPot(pot);
    }

    removePot() {
        return this.machineModel.removePot();
    }
}

