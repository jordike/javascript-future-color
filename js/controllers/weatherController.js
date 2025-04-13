import WeatherModel from '../models/WeatherModel.js';
import LocationController from './LocationController.js';

export default class WeatherController {
    static async getWeatherData() {
        const city = LocationController.getCity();
        const weatherData = await WeatherModel.fetchWeather(city);
        return weatherData;
    }
}
