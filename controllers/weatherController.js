import WeatherModel from '../models/weatherModel.js';
import LocationController from '../controllers/locationController.js';

export default class WeatherController {
    static async getWeatherData() {
        const city = LocationController.getCity();
        const weatherData = await WeatherModel.fetchWeather(city);
        return weatherData;
    }
}
